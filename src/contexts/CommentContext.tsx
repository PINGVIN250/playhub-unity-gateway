
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Comment } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CommentContextType {
  comments: Comment[];
  isLoading: boolean;
  getGameComments: (gameId: string) => Comment[];
  addComment: (gameId: string, content: string) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<Comment>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Загрузка комментариев из Supabase при инициализации
  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('comments')
          .select(`
            *,
            profiles:user_id(id, username, email, created_at)
          `);

        if (error) {
          throw error;
        }

        if (data) {
          // Форматируем данные комментариев из БД в формат, понятный фронтенду
          const formattedComments: Comment[] = data.map(comment => ({
            id: comment.id,
            gameId: comment.game_id,
            userId: comment.user_id,
            content: comment.content,
            createdAt: comment.created_at ? new Date(comment.created_at) : new Date(),
            updatedAt: comment.updated_at ? new Date(comment.updated_at) : new Date(),
            user: comment.profiles ? {
              id: comment.profiles.id,
              username: comment.profiles.username || "Пользователь удален",
              email: comment.profiles.email || '',
              createdAt: comment.profiles.created_at ? new Date(comment.profiles.created_at) : new Date()
            } : undefined
          }));

          setComments(formattedComments);
        }
      } catch (error) {
        console.error("Не удалось загрузить комментарии:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, []);

  // Получение комментариев для конкретной игры
  const getGameComments = (gameId: string): Comment[] => {
    return comments.filter(comment => comment.gameId === gameId);
  };

  // Добавление нового комментария
  const addComment = async (gameId: string, content: string): Promise<Comment> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы добавить комментарий");
      }

      const { data, error } = await supabase
        .from('comments')
        .insert({
          game_id: gameId,
          user_id: user.id,
          content: content
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const newComment: Comment = {
          id: data.id,
          gameId: data.game_id,
          userId: data.user_id,
          content: data.content,
          createdAt: data.created_at ? new Date(data.created_at) : new Date(),
          updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
          user: {
            id: user.id,
            username: user.username || "Пользователь удален",
            email: user.email,
            createdAt: user.createdAt
          }
        };

        setComments(prev => [...prev, newComment]);
        toast.success("Комментарий успешно добавлен");
        return newComment;
      } else {
        throw new Error("Не удалось создать комментарий");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось добавить комментарий";
      toast.error(message);
      throw error;
    }
  };

  // Удаление комментария
  const deleteComment = async (commentId: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы удалить комментарий");
      }

      const comment = comments.find(c => c.id === commentId);
      
      if (!comment) {
        throw new Error("Комментарий не найден");
      }

      if (comment.userId !== user.id && !user.isAdmin) {
        throw new Error("У вас нет прав для удаления этого комментария");
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        throw error;
      }

      setComments(prev => prev.filter(c => c.id !== commentId));
      toast.success("Комментарий успешно удален");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось удалить комментарий";
      toast.error(message);
      throw error;
    }
  };

  // Обновление комментария
  const updateComment = async (commentId: string, content: string): Promise<Comment> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы обновить комментарий");
      }

      const comment = comments.find(c => c.id === commentId);
      
      if (!comment) {
        throw new Error("Комментарий не найден");
      }

      if (comment.userId !== user.id && !user.isAdmin) {
        throw new Error("У вас нет прав для обновления этого комментария");
      }

      const { data, error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', commentId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const updatedComment: Comment = {
        ...comment,
        content,
        updatedAt: new Date()
      };

      setComments(prev => 
        prev.map(c => c.id === commentId ? updatedComment : c)
      );

      toast.success("Комментарий успешно обновлен");
      return updatedComment;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось обновить комментарий";
      toast.error(message);
      throw error;
    }
  };

  const value = {
    comments,
    isLoading,
    getGameComments,
    addComment,
    deleteComment,
    updateComment
  };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export function useComments() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComments должен использоваться внутри CommentProvider");
  }
  return context;
}
