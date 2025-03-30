
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Game } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    tags?: string[],
    gameFiles?: {
      wasm: File | null;
      data: File | null;
      framework: File | null;
      loader: File | null;
      index: File | null;
    }
  ) => Promise<Game>;
  getUserGames: () => Game[];
  getFeaturedGames: () => Game[];
  getGameById: (id: string) => Game | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        // Fix the query by using proper join syntax instead of relying on foreign key relationship
        const { data, error } = await supabase
          .from('games')
          .select(`
            *,
            profiles(*)
          `)
          .eq('profiles.id', supabase.auth.getSession() ? 'games.author_id' : null);

        if (error) {
          throw error;
        }

        if (data) {
          const formattedGames: Game[] = data.map(game => ({
            id: game.id,
            title: game.title,
            description: game.description,
            coverImage: game.cover_image_url || '',
            gameUrl: game.game_url || '',
            gameFiles: {
              wasmPath: game.wasm_path,
              dataPath: game.data_path,
              frameworkPath: game.framework_path,
              loaderPath: game.loader_path,
              indexPath: game.index_path
            },
            authorId: game.author_id,
            author: game.profiles ? {
              id: game.author_id,
              username: game.profiles.username,
              email: '',
              createdAt: new Date(game.profiles.created_at)
            } : undefined,
            width: game.width || 960,
            height: game.height || 600,
            createdAt: new Date(game.created_at),
            updatedAt: new Date(game.updated_at),
            tags: [],
            featured: game.featured || false
          }));

          setGames(formattedGames);
        }
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
    tags: string[] = [],
    gameFiles?: {
      wasm: File | null;
      data: File | null;
      framework: File | null;
      loader: File | null;
      index: File | null;
    }
  ): Promise<Game> => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("You must be logged in to add a game");
      }

      let coverImageUrl = '';
      let wasmPath = '';
      let dataPath = '';
      let frameworkPath = '';
      let loaderPath = '';
      let indexPath = '';

      // Upload cover image to storage
      if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('game_images')
          .upload(filePath, coverImage);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('game_images')
          .getPublicUrl(filePath);

        coverImageUrl = urlData.publicUrl;
      }

      // Upload game files if they exist
      if (gameFiles) {
        if (gameFiles.wasm) {
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${gameFiles.wasm.name}`;
          await supabase.storage.from('game_files').upload(filePath, gameFiles.wasm);
          const { data } = supabase.storage.from('game_files').getPublicUrl(filePath);
          wasmPath = data.publicUrl;
        }

        if (gameFiles.data) {
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${gameFiles.data.name}`;
          await supabase.storage.from('game_files').upload(filePath, gameFiles.data);
          const { data } = supabase.storage.from('game_files').getPublicUrl(filePath);
          dataPath = data.publicUrl;
        }

        if (gameFiles.framework) {
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${gameFiles.framework.name}`;
          await supabase.storage.from('game_files').upload(filePath, gameFiles.framework);
          const { data } = supabase.storage.from('game_files').getPublicUrl(filePath);
          frameworkPath = data.publicUrl;
        }

        if (gameFiles.loader) {
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${gameFiles.loader.name}`;
          await supabase.storage.from('game_files').upload(filePath, gameFiles.loader);
          const { data } = supabase.storage.from('game_files').getPublicUrl(filePath);
          loaderPath = data.publicUrl;
        }

        if (gameFiles.index) {
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${gameFiles.index.name}`;
          await supabase.storage.from('game_files').upload(filePath, gameFiles.index);
          const { data } = supabase.storage.from('game_files').getPublicUrl(filePath);
          indexPath = data.publicUrl;
        }
      }

      // Insert game record
      const { data, error } = await supabase
        .from('games')
        .insert({
          title,
          description,
          cover_image_url: coverImageUrl,
          game_url: gameUrl || indexPath, // Use index.html URL as game URL if no explicit URL provided
          wasm_path: wasmPath,
          data_path: dataPath,
          framework_path: frameworkPath,
          loader_path: loaderPath,
          index_path: indexPath,
          author_id: user.id,
          width,
          height
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Insert tags if provided
      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          // First check if tag exists
          let { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName.trim().toLowerCase())
            .single();

          let tagId;

          if (!existingTag) {
            // Create tag if it doesn't exist
            const { data: newTag } = await supabase
              .from('tags')
              .insert({ name: tagName.trim().toLowerCase() })
              .select('id')
              .single();
            
            tagId = newTag?.id;
          } else {
            tagId = existingTag.id;
          }

          if (tagId) {
            // Create relationship between game and tag
            await supabase
              .from('game_tags')
              .insert({
                game_id: data.id,
                tag_id: tagId
              });
          }
        }
      }

      // Format the new game for the UI
      const newGame: Game = {
        id: data.id,
        title: data.title,
        description: data.description,
        coverImage: data.cover_image_url || '',
        gameUrl: data.game_url || '',
        gameFiles: {
          wasmPath: data.wasm_path,
          dataPath: data.data_path,
          frameworkPath: data.framework_path,
          loaderPath: data.loader_path,
          indexPath: data.index_path
        },
        authorId: data.author_id,
        author: user ? {
          id: user.id,
          username: user.username,
          email: '',
          createdAt: new Date()
        } : undefined,
        width: data.width || 960,
        height: data.height || 600,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        tags: tags || [],
        featured: data.featured || false
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
