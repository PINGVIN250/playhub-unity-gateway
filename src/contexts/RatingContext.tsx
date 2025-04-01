
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Rating } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface RatingContextType {
  ratings: Rating[];
  isLoading: boolean;
  getGameRatings: (gameId: string) => Rating[];
  getUserRating: (gameId: string) => Rating | undefined;
  getAverageRating: (gameId: string) => number;
  rateGame: (gameId: string, score: number) => Promise<Rating>;
  deleteRating: (gameId: string) => Promise<void>;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadRatings = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('ratings')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          const formattedRatings: Rating[] = data.map(rating => ({
            id: rating.id,
            gameId: rating.game_id,
            userId: rating.user_id,
            score: rating.score,
            createdAt: new Date(rating.created_at || '')
          }));

          setRatings(formattedRatings);
        }
      } catch (error) {
        console.error("Failed to load ratings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRatings();
  }, []);

  const getGameRatings = (gameId: string): Rating[] => {
    return ratings.filter(rating => rating.gameId === gameId);
  };

  const getUserRating = (gameId: string): Rating | undefined => {
    if (!user) return undefined;
    return ratings.find(rating => rating.gameId === gameId && rating.userId === user.id);
  };

  const getAverageRating = (gameId: string): number => {
    const gameRatings = getGameRatings(gameId);
    if (gameRatings.length === 0) return 0;
    
    const sum = gameRatings.reduce((total, rating) => total + rating.score, 0);
    return sum / gameRatings.length;
  };

  const rateGame = async (gameId: string, score: number): Promise<Rating> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to rate a game");
      }

      // Check if user has already rated this game
      const existingRating = getUserRating(gameId);
      
      if (existingRating) {
        // Update existing rating
        const { data, error } = await supabase
          .from('ratings')
          .update({ score })
          .eq('id', existingRating.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        const updatedRating: Rating = {
          ...existingRating,
          score
        };

        setRatings(prev => 
          prev.map(r => r.id === existingRating.id ? updatedRating : r)
        );

        toast.success("Rating updated successfully");
        return updatedRating;
      } else {
        // Create new rating
        const { data, error } = await supabase
          .from('ratings')
          .insert({
            game_id: gameId,
            user_id: user.id,
            score
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          const newRating: Rating = {
            id: data.id,
            gameId: data.game_id,
            userId: data.user_id,
            score: data.score,
            createdAt: new Date(data.created_at || '')
          };

          setRatings(prev => [...prev, newRating]);
          toast.success("Game rated successfully");
          return newRating;
        } else {
          throw new Error("Failed to create rating");
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to rate game";
      toast.error(message);
      throw error;
    }
  };

  const deleteRating = async (gameId: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to remove a rating");
      }

      const rating = ratings.find(r => r.gameId === gameId && r.userId === user.id);
      
      if (!rating) {
        throw new Error("Rating not found");
      }

      const { error } = await supabase
        .from('ratings')
        .delete()
        .eq('id', rating.id);

      if (error) {
        throw error;
      }

      // Remove rating from local state
      setRatings(prev => prev.filter(r => r.id !== rating.id));
      toast.success("Rating removed successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove rating";
      toast.error(message);
      throw error;
    }
  };

  const value = {
    ratings,
    isLoading,
    getGameRatings,
    getUserRating,
    getAverageRating,
    rateGame,
    deleteRating
  };

  return <RatingContext.Provider value={value}>{children}</RatingContext.Provider>;
}

export function useRatings() {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error("useRatings must be used within a RatingProvider");
  }
  return context;
}
