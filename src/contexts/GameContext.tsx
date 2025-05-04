
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
  getFavoriteGames: () => Game[];
  getGameById: (id: string) => Game | undefined;
  deleteGame: (id: string) => Promise<void>;
  toggleFavorite: (gameId: string) => Promise<void>;
  isFavorite: (gameId: string) => boolean;
  updateGame: (id: string, data: Partial<Omit<Game, "id" | "author" | "authorId" | "createdAt" | "updatedAt">> & {
    gameFiles?: {
      wasm: File | null;
      data: File | null;
      framework: File | null;
      loader: File | null;
      index: File | null;
    }
  }) => Promise<Game>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
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
    
    // Load favorites from database when user is logged in
    if (user) {
      loadUserFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Function to load user favorites from the database
  const loadUserFavorites = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('favorites')
        .select('game_id')
        .eq('user_id', user.id);
        
      if (error) {
        console.error("Ошибка при загрузке избранного:", error);
        toast.error("Не удалось загрузить избранное");
        return;
      }
      
      if (data) {
        const favoriteGameIds = data.map(fav => fav.game_id);
        setFavorites(favoriteGameIds);
      }
    } catch (error) {
      console.error("Ошибка при загрузке избранного:", error);
    }
  };

  // Function to add/remove game from favorites
  const toggleFavorite = async (gameId: string): Promise<void> => {
    try {
      if (!user) {
        toast.error("Вы должны войти в систему, чтобы добавить игру в избранное");
        return;
      }

      const isFav = favorites.includes(gameId);
      let newFavorites: string[] = [...favorites];
      
      if (isFav) {
        // Remove from favorites in database
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('game_id', gameId);
          
        if (error) {
          console.error("Ошибка при удалении из избранного:", error);
          toast.error("Не удалось удалить из избранного");
          return;
        }
        
        // Update local state
        newFavorites = favorites.filter(id => id !== gameId);
        toast.success("Игра удалена из избранного");
      } else {
        // Add to favorites in database
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            game_id: gameId
          });
          
        if (error) {
          console.error("Ошибка при добавлении в избранное:", error);
          toast.error("Не удалось добавить в избранное");
          return;
        }
        
        // Update local state
        newFavorites = [...favorites, gameId];
        toast.success("Игра добавлена в избранное");
      }
      
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Ошибка при изменении избранного:", error);
      toast.error("Не удалось изменить избранное");
    }
  };

  // Function to check if a game is in favorites
  const isFavorite = (gameId: string): boolean => {
    return favorites.includes(gameId);
  };
  
  // Function to get favorite games
  const getFavoriteGames = (): Game[] => {
    return games.filter(game => favorites.includes(game.id));
  };

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
        throw new Error("Вы должны войти в систему, чтобы добавить игру");
      }

      console.log("Начало процесса загрузки игры");
      let coverImageUrl = '';
      let wasmPath = '';
      let dataPath = '';
      let frameworkPath = '';
      let loaderPath = '';
      let indexPath = '';

      if (coverImage) {
        console.log("Загрузка обложки игры");
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
          console.error("Ошибка загрузки обложки игры:", uploadError);
          throw uploadError;
        }

        console.log("Обложка игры загружена успешно");

        const { data: urlData } = supabase.storage
          .from('game_images')
          .getPublicUrl(filePath);

        coverImageUrl = urlData.publicUrl;
        console.log("URL обложки игры:", coverImageUrl);
      }

      if (gameFiles) {
        console.log("Начало загрузки файлов игры");
        
        const uploadFile = async (file: File | null, prefix: string) => {
          if (!file) return null;
          
          console.log(`Загрузка файла ${prefix}: ${file.name}`);
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${file.name}`;
          
          const { error, data } = await supabase.storage
            .from('game_files')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (error) {
            console.error(`Ошибка загрузки файла ${prefix}:`, error);
            throw error;
          }
          
          const { data: urlData } = supabase.storage
            .from('game_files')
            .getPublicUrl(filePath);
            
          console.log(`Файл ${prefix} успешно загружен: ${urlData.publicUrl}`);
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

      console.log("Все файлы загружены, создание записи об игре");
      
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
          width: 960,
          height: 600
        })
        .select()
        .single();

      if (error) {
        console.error("Ошибка создания записи об игре:", error);
        throw error;
      }

      if (data?.id && tags && tags.length > 0) {
        console.log("Обработка тегов:", tags);
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
        console.warn(`Дублирующийся ID игры обнаружен: ${newGame.id}`);
        return prevGames;
      }
      return [newGame, ...prevGames];
    });

    toast.success("Игра успешно добавлена!");
    return newGame;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось добавить игру";
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
      
      console.log(`Обработка тега: ${sanitizedTagName}`);
      
      const { data: existingTag, error: tagQueryError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', sanitizedTagName)
        .maybeSingle();

      if (tagQueryError) {
        console.error("Ошибка проверки существующего тега:", tagQueryError);
        return null;
      }

      let tagId = existingTag?.id;

      if (!tagId) {
        console.log(`Создание нового тега: ${sanitizedTagName}`);
        const { data: newTag, error: createTagError } = await supabase
          .from('tags')
          .insert({ name: sanitizedTagName })
          .select('id')
          .single();
        
        if (createTagError) {
          console.error("Ошибка создания нового тега:", createTagError);
          return null;
        }
        
        tagId = newTag?.id;
      }

      if (tagId) {
        console.log(`Создание связи между игрой ${gameId} и тегом ${tagId}`);
        const { error: relationshipError } = await supabase
          .from('game_tags')
          .insert({
            game_id: gameId,
            tag_id: tagId
          });
          
        if (relationshipError) {
          console.error("Ошибка создания связи между игрой и тегом:", relationshipError);
        }
      }

      return tagId;
    } catch (error) {
      console.error("Ошибка в обработке тега:", error);
      return null;
    }
  };

  const deleteGame = async (id: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы удалить игру");
      }

      const game = games.find(g => g.id === id);
      
      if (!game) {
        throw new Error("Игра не найдена");
      }

      if (game.authorId !== user.id && !user.isAdmin) {
        throw new Error("У вас нет прав для удаления этой игры");
      }

      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setGames(prevGames => prevGames.filter(g => g.id !== id));
      
      // Удаляем игру из избранного при удалении
      if (favorites.includes(id)) {
        const newFavorites = favorites.filter(gameId => gameId !== id);
        setFavorites(newFavorites);
        localStorage.setItem('favGames', JSON.stringify(newFavorites));
      }
      
      toast.success("Игра успешно удалена");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось удалить игру";
      toast.error(message);
      throw error;
    }
  };

  const updateGame = async (
    id: string, 
    data: Partial<Omit<Game, "id" | "author" | "authorId" | "createdAt" | "updatedAt">> & {
      gameFiles?: {
        wasm: File | null;
        data: File | null;
        framework: File | null;
        loader: File | null;
        index: File | null;
      }
    }
  ): Promise<Game> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы обновить игру");
      }

      const game = games.find(g => g.id === id);
      
      if (!game) {
        throw new Error("Игра не найдена");
      }

      if (game.authorId !== user.id && !user.isAdmin) {
        throw new Error("У вас нет прав для обновления этой игры");
      }

      const updateData: any = {};
      
      if (data.title) updateData.title = data.title;
      if (data.description) updateData.description = data.description;
      if (data.gameUrl !== undefined) updateData.game_url = data.gameUrl;
      
      // Обрабатываем загрузку новых файлов
      if (data.gameFiles) {
        const gameFiles = data.gameFiles;
        let updateGameFiles = false;
        
        // Функция для загрузки файла
        const uploadFile = async (file: File | null, prefix: string) => {
          if (!file) return null;
          
          console.log(`Загрузка файла ${prefix}: ${file.name}`);
          const filePath = `${user.id}/${Math.random().toString(36).substring(2, 10)}_${file.name}`;
          
          const { error, data } = await supabase.storage
            .from('game_files')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (error) {
            console.error(`Ошибка загрузки файла ${prefix}:`, error);
            throw error;
          }
          
          const { data: urlData } = supabase.storage
            .from('game_files')
            .getPublicUrl(filePath);
            
          console.log(`Файл ${prefix} успешно загружен: ${urlData.publicUrl}`);
          return urlData.publicUrl;
        };

        // Загружаем только те файлы, которые были предоставлены
        if (gameFiles.wasm) {
          updateGameFiles = true;
          const wasmPath = await uploadFile(gameFiles.wasm, 'wasm');
          if (wasmPath) updateData.wasm_path = wasmPath;
        }
        
        if (gameFiles.data) {
          updateGameFiles = true;
          const dataPath = await uploadFile(gameFiles.data, 'data');
          if (dataPath) updateData.data_path = dataPath;
        }
        
        if (gameFiles.framework) {
          updateGameFiles = true;
          const frameworkPath = await uploadFile(gameFiles.framework, 'framework');
          if (frameworkPath) updateData.framework_path = frameworkPath;
        }
        
        if (gameFiles.loader) {
          updateGameFiles = true;
          const loaderPath = await uploadFile(gameFiles.loader, 'loader');
          if (loaderPath) updateData.loader_path = loaderPath;
        }
        
        if (gameFiles.index) {
          updateGameFiles = true;
          const indexPath = await uploadFile(gameFiles.index, 'index');
          if (indexPath) {
            updateData.index_path = indexPath;
            // Обновляем URL игры на новый индексный файл только если не указан явно gameUrl
            if (!data.gameUrl) {
              updateData.game_url = indexPath;
            }
          }
        }
      }

      const { data: updatedGameData, error } = await supabase
        .from('games')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Если есть теги для обновления
      if (data.tags) {
        // 1. Удаляем все текущие связи между игрой и тегами
        await supabase
          .from('game_tags')
          .delete()
          .eq('game_id', id);
        
        // 2. Добавляем новые теги
        for (const tagName of data.tags) {
          await handleTagCreation(id, tagName);
        }
      }

      // Обновляем объект игры в локальном состоянии
      const updatedGame: Game = {
        ...game,
        title: data.title !== undefined ? data.title : game.title,
        description: data.description !== undefined ? data.description : game.description,
        gameUrl: data.gameUrl !== undefined ? data.gameUrl : game.gameUrl,
        tags: data.tags !== undefined ? data.tags : game.tags,
        gameFiles: {
          wasmPath: updateData.wasm_path || game.gameFiles.wasmPath,
          dataPath: updateData.data_path || game.gameFiles.dataPath,
          frameworkPath: updateData.framework_path || game.gameFiles.frameworkPath,
          loaderPath: updateData.loader_path || game.gameFiles.loaderPath,
          indexPath: updateData.index_path || game.gameFiles.indexPath
        },
        updatedAt: new Date()
      };

      setGames(prevGames => 
        prevGames.map(g => g.id === id ? updatedGame : g)
      );

      toast.success("Игра успешно обновлена");
      return updatedGame;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось обновить игру";
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
    getFavoriteGames,
    getGameById,
    deleteGame,
    updateGame,
    toggleFavorite,
    isFavorite
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGames() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGames должен использоваться внутри GameProvider");
  }
  return context;
}
