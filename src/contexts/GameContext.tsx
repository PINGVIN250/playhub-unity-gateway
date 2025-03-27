
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Game } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface GameContextType {
  games: Game[];
  isLoading: boolean;
  addGame: (
    title: string,
    description: string,
    coverImage: File,
    gameUrl: string,
    width?: number,
    height?: number,
    tags?: string[]
  ) => Promise<Game>;
  getUserGames: () => Game[];
  getFeaturedGames: () => Game[];
  getGameById: (id: string) => Game | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Mock data
const mockGames: Game[] = [
  {
    id: "1",
    title: "Space Adventure",
    description: "Explore the vastness of space in this exciting adventure game.",
    coverImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1074&auto=format&fit=crop",
    gameUrl: "https://v6p9d9t4.ssl.hwcdn.net/html/4772356/WebGL/index.html",
    authorId: "1",
    width: 960,
    height: 600,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["adventure", "space", "exploration"],
    featured: true
  },
  {
    id: "2",
    title: "Dungeon Crawler",
    description: "Navigate through dark dungeons and defeat monsters to find treasure.",
    coverImage: "https://images.unsplash.com/photo-1594035442286-673c9fc986c8?q=80&w=870&auto=format&fit=crop",
    gameUrl: "https://v6p9d9t4.ssl.hwcdn.net/html/6332008/index.html",
    authorId: "1",
    width: 800,
    height: 600,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["rpg", "dungeon", "adventure"],
    featured: false
  }
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading games from API
    const loadGames = async () => {
      try {
        // Simulating API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGames(mockGames);
      } catch (error) {
        console.error("Failed to load games:", error);
        toast.error("Failed to load games");
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const addGame = async (
    title: string,
    description: string,
    coverImage: File,
    gameUrl: string,
    width: number = 960,
    height: number = 600,
    tags: string[] = []
  ): Promise<Game> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!user) {
        throw new Error("You must be logged in to add a game");
      }

      // Create a URL for the uploaded cover image (in a real app, this would be uploaded to cloud storage)
      const coverImageUrl = URL.createObjectURL(coverImage);

      const newGame: Game = {
        id: String(games.length + 1),
        title,
        description,
        coverImage: coverImageUrl,
        gameUrl,
        authorId: user.id,
        width,
        height,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags,
        featured: false
      };

      setGames(prevGames => [...prevGames, newGame]);
      toast.success("Game added successfully!");
      return newGame;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add game";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserGames = (): Game[] => {
    if (!user) return [];
    return games.filter(game => game.authorId === user.id);
  };

  const getFeaturedGames = (): Game[] => {
    return games.filter(game => game.featured);
  };

  const getGameById = (id: string): Game | undefined => {
    return games.find(game => game.id === id);
  };

  const value = {
    games,
    isLoading,
    addGame,
    getUserGames,
    getFeaturedGames,
    getGameById
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGames() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a GameProvider");
  }
  return context;
}
