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
  deleteGame: (id: string) => Promise<void>;
  updateGame: (id: string, data: Partial<Omit<Game, "id" | "author" | "authorId" | "createdAt" | "updatedAt">>) => Promise<Game>;
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
        

        const { data, error } = await supabase
          .from('games')
          .select(`
            *,
            profiles!author_id (id, username, email, created_at, is_admin)
          `);

        if (data) {
          // Fetch tags for all games
          const gameIds = data.map(game => game.id);
          
          // Get all game-tag relationships for these games
          const { data: gameTagsData, error: gameTagsError } = await supabase
            .from('game_tags')
            .select(`
              game_id,
              tags!tag_id (name)
            `)
            .in('game_id', gameIds);
            
          // Group tags by game_id
          const tagsByGameId: Record<string, string[]> = {};
          
          if (gameTagsData) {
            gameTagsData.forEach(item => {
              if (!tagsByGameId[item.game_id]) {
                tagsByGameId[item.game_id] = [];
              }
              
              if (item.tags && item.tags.name) {
                tagsByGameId[item.game_id].push(item.tags.name);
              }
            });
          }
          
          const formattedGames: Game[] = data.map(game => ({
            id: game.id,
            title: game.title,
            description: game.description || '',
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
              id: game.profiles.id,
              username: game.profiles.username,
              email: game.profiles.email || '',
              createdAt: new Date(game.profiles.created_at),
              isAdmin: game.profiles.is_admin || false
            } : undefined,
            width: game.width || 960,
            height: game.height || 600,
            createdAt: new Date(game.created_at),
            updatedAt: new Date(game.updated_at),
            tags: tagsByGameId[game.id] || [],
            featured: game.featured || false
          }));
  
          setGames(formattedGames);
        }
      } catch (error) {
        console.error("Ошибка загрузки игр:", error);
        toast.error("Не удалось загрузить игры");
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

      console.log("Starting game upload process");
      let coverImageUrl = '';
      let wasmPath = '';
      let dataPath = '';
      let frameworkPath = '';
      let loaderPath = '';
      let indexPath = '';

      if (coverImage) {
        console.log("Uploading cover image");
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('game_images')
          .upload(filePath, coverImage, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Cover image upload error:", uploadError);
          throw uploadError;
        }

        console.log("Cover image uploaded successfully");

        const { data: urlData } = supabase.storage
          .from('game_images')
          .getPublicUrl(filePath);

        coverImageUrl = urlData.publicUrl;
        console.log("Cover image URL:", coverImageUrl);
      }

      if (gameFiles) {
        console.log("Starting game files upload");
        
        const uploadFile = async (file: File | null, prefix: string) => {
          if (!file) return '';
          
          console.log(`Uploading ${prefix} file: ${file.name}`);
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${file.name}`;
          
          const { error, data } = await supabase.storage
            .from('game_files')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (error) {
            console.error(`${prefix} file upload error:`, error);
            throw error;
          }
          
          const { data: urlData } = supabase.storage
            .from('game_files')
            .getPublicUrl(filePath);
            
          console.log(`${prefix} file uploaded successfully: ${urlData.publicUrl}`);
          return urlData.publicUrl;
        };

        const [wasmResult, dataResult, frameworkResult, loaderResult, indexResult] = await Promise.all([
          uploadFile(gameFiles.wasm, 'wasm'),
          uploadFile(gameFiles.data, 'data'),
          uploadFile(gameFiles.framework, 'framework'),
          uploadFile(gameFiles.loader, 'loader'),
          uploadFile(gameFiles.index, 'index')
        ]);
        
        wasmPath = wasmResult;
        dataPath = dataResult;
        frameworkPath = frameworkResult;
        loaderPath = loaderResult;
        indexPath = indexResult;
      }

      console.log("All files uploaded, creating game record");
      
      const { data, error } = await supabase
        .from('games')
        .insert({
          title,
          description,
          cover_image_url: coverImageUrl,
          game_url: gameUrl || indexPath,
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
        console.error("Game record creation error:", error);
        throw error;
      }

      if (data?.id && tags && tags.length > 0) {
        console.log("Processing tags:", tags);
        for (const tagName of tags) {
          await handleTagCreation(data.id, tagName);
        }
      }

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

    setGames(prevGames => {
      if (prevGames.some(g => g.id === newGame.id)) {
        console.warn(`Duplicate game ID detected: ${newGame.id}`);
        return prevGames;
      }
      return [newGame, ...prevGames];
    });

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

  const handleTagCreation = async (gameId: string, tagName: string) => {
    try {
      const sanitizedTagName = tagName.trim().toLowerCase();
      if (!sanitizedTagName) return null;
      
      console.log(`Processing tag: ${sanitizedTagName}`);
      
      const { data: existingTag, error: tagQueryError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', sanitizedTagName)
        .maybeSingle();

      if (tagQueryError) {
        console.error("Error checking for existing tag:", tagQueryError);
        return null;
      }

      let tagId = existingTag?.id;

      if (!tagId) {
        console.log(`Creating new tag: ${sanitizedTagName}`);
        const { data: newTag, error: createTagError } = await supabase
          .from('tags')
          .insert({ name: sanitizedTagName })
          .select('id')
          .single();
        
        if (createTagError) {
          console.error("Error creating new tag:", createTagError);
          return null;
        }
        
        tagId = newTag?.id;
      }

      if (tagId) {
        console.log(`Creating game-tag relationship for game ${gameId} and tag ${tagId}`);
        const { error: relationshipError } = await supabase
          .from('game_tags')
          .insert({
            game_id: gameId,
            tag_id: tagId
          });
          
        if (relationshipError) {
          console.error("Error creating game-tag relationship:", relationshipError);
        }
      }

      return tagId;
    } catch (error) {
      console.error("Error in tag processing:", error);
      return null;
    }
  };

  const deleteGame = async (id: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to delete a game");
      }

      const game = games.find(g => g.id === id);
      
      if (!game) {
        throw new Error("Game not found");
      }

      if (game.authorId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to delete this game");
      }

      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setGames(prevGames => prevGames.filter(g => g.id !== id));
      toast.success("Game deleted successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete game";
      toast.error(message);
      throw error;
    }
  };

  const updateGame = async (
    id: string, 
    data: Partial<Omit<Game, "id" | "author" | "authorId" | "createdAt" | "updatedAt">>
  ): Promise<Game> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to update a game");
      }

      const game = games.find(g => g.id === id);
      
      if (!game) {
        throw new Error("Game not found");
      }

      if (game.authorId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to update this game");
      }

      const updateData: any = {};
      
      if (data.title) updateData.title = data.title;
      if (data.description) updateData.description = data.description;
      if (data.gameUrl) updateData.game_url = data.gameUrl;
      if (data.width) updateData.width = data.width;
      if (data.height) updateData.height = data.height;
      
      const { data: updatedGameData, error } = await supabase
        .from('games')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const updatedGame: Game = {
        ...game,
        ...data,
        updatedAt: new Date()
      };

      setGames(prevGames => 
        prevGames.map(g => g.id === id ? updatedGame : g)
      );

      toast.success("Game updated successfully");
      return updatedGame;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update game";
      toast.error(message);
      throw error;
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
    getGameById,
    deleteGame,
    updateGame
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
