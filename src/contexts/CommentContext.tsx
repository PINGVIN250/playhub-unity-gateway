
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
            profiles:user_id(id, username, email, created_at)
          `);

        if (error) {
          throw error;
        }

        if (data) {
          const formattedComments: Comment[] = data.map(comment => ({
            id: comment.id,
            gameId: comment.game_id,
            userId: comment.user_id,
            content: comment.content,
            createdAt: new Date(comment.created_at || ''),
            updatedAt: new Date(comment.updated_at || ''),
            user: comment.profiles ? {
              id: comment.profiles.id,
              username: comment.profiles.username || '',
              email: comment.profiles.email || '',
              createdAt: new Date(comment.profiles.created_at || '')
            } : undefined
          }));

          setComments(formattedComments);
        }
      } catch (error) {
        console.error("Failed to load comments:", error);
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
        throw new Error("You must be logged in to add a comment");
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
          createdAt: new Date(data.created_at || ''),
          updatedAt: new Date(data.updated_at || ''),
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
          }
        };

        setComments(prev => [...prev, newComment]);
        toast.success("Comment added successfully");
        return newComment;
      } else {
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add comment";
      toast.error(message);
      throw error;
    }
  };

  const deleteComment = async (commentId: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to delete a comment");
      }

      const comment = comments.find(c => c.id === commentId);
      
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.userId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to delete this comment");
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        throw error;
      }

      setComments(prev => prev.filter(c => c.id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete comment";
      toast.error(message);
      throw error;
    }
  };

  const updateComment = async (commentId: string, content: string): Promise<Comment> => {
    try {
      if (!user) {
        throw new Error("You must be logged in to update a comment");
      }

      const comment = comments.find(c => c.id === commentId);
      
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.userId !== user.id && !user.isAdmin) {
        throw new Error("You don't have permission to update this comment");
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

      toast.success("Comment updated successfully");
      return updatedComment;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update comment";
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
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
}
