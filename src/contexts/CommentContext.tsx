
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

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('comments')
          .select(`
            *,
            profiles:user_id (
              id,
              username,
              email,
              created_at,
              is_banned
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedComments: Comment[] = data.map(comment => ({
            id: comment.id,
            gameId: comment.game_id,
            userId: comment.user_id,
            content: comment.content,
            createdAt: comment.created_at ? new Date(comment.created_at) : new Date(),
            updatedAt: comment.updated_at ? new Date(comment.updated_at) : new Date(),
            user: comment.profiles ? {
              id: comment.profiles.id,
              username: comment.profiles.username,
              email: comment.profiles.email || '',
              createdAt: comment.profiles.created_at ? new Date(comment.profiles.created_at) : new Date(),
              isBanned: comment.profiles.is_banned || false
            } : {
              id: comment.user_id,
              username: 'Пользователь удален',
              email: '',
              createdAt: new Date(),
              isBanned: false
            }
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

  const getGameComments = (gameId: string): Comment[] => {
    return comments.filter(comment => comment.gameId === gameId);
  };

  const addComment = async (gameId: string, content: string): Promise<Comment> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы добавить комментарий");
      }
      
      // Проверка на блокировку пользователя
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_banned')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        throw profileError;
      }
      
      if (profileData && profileData.is_banned) {
        throw new Error("Вы не можете оставлять комментарии, так как ваш аккаунт заблокирован");
      }

      const { data: userData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data, error } = await supabase
        .from('comments')
        .insert({
          game_id: gameId,
          user_id: user.id,
          content: content
        })
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            email,
            created_at
          )
        `)
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
          user: data.profiles ? {
            id: data.profiles.id,
            username: data.profiles.username,
            email: data.profiles.email || '',
            createdAt: data.profiles.created_at ? new Date(data.profiles.created_at) : new Date()
          } : {
            id: data.user_id,
            username: 'Пользователь удален',
            email: '',
            createdAt: new Date()
          }
        };

        setComments(prev => [newComment, ...prev]);
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

  const deleteComment = async (commentId: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы удалить комментарий");
      }

      const comment = comments.find(c => c.id === commentId);
      
      if (!comment) {
        throw new Error("Комментарий не найден");
      }

      // Администраторы могут удалять любые комментарии
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

  const updateComment = async (commentId: string, content: string): Promise<Comment> => {
    try {
      if (!user) {
        throw new Error("Вы должны войти в систему, чтобы обновить комментарий");
      }
      
      // Проверка на блокировку пользователя
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_banned')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        throw profileError;
      }
      
      if (profileData && profileData.is_banned) {
        throw new Error("Вы не можете редактировать комментарии, так как ваш аккаунт заблокирован");
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
