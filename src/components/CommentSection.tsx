import { useState, useRef, useEffect } from "react";
import { useComments } from "@/contexts/CommentContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MessageCircle, Trash2, Edit, Save } from "lucide-react";
import "@/types/unity";

interface CommentSectionProps {
  gameId: string;
}

export function CommentSection({ gameId }: CommentSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const { getGameComments, addComment, deleteComment, updateComment, isLoading } = useComments();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isInputActive, setIsInputActive] = useState(false);
  
  const comments = getGameComments(gameId);
  
  const disableUnityInput = () => {
    try {
      console.log("Отключение ввода Unity");
      if (window.unityInstance) {
        window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "false");
        window.unityInputDisabled = true;
      }
    } catch (error) {
      console.error("Ошибка при отключении ввода Unity:", error);
    }
  };
  
  const enableUnityInput = () => {
    try {
      console.log("Включение ввода Unity");
      if (window.unityInstance) {
        window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "true");
        window.unityInputDisabled = false;
      }
    } catch (error) {
      console.error("Ошибка при включении ввода Unity:", error);
    }
  };

  const handleTextareaFocus = () => {
    console.log("Текстовое поле получило фокус");
    setIsInputActive(true);
    disableUnityInput();
  };
  
  const handleTextareaBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const isStillInForm = 
      relatedTarget && 
      (relatedTarget.tagName === "TEXTAREA" || 
       relatedTarget.tagName === "INPUT" ||
       relatedTarget.tagName === "BUTTON" && relatedTarget.closest(".comment-textarea-container"));
    
    if (!isStillInForm) {
      console.log("Текстовое поле потеряло фокус");
      setIsInputActive(false);
      enableUnityInput();
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isInputActive) {
      e.stopPropagation();
    }
  };
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("keypress", handleKeyDown, { capture: true });
    document.addEventListener("keyup", handleKeyDown, { capture: true });
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("keypress", handleKeyDown, { capture: true });
      document.removeEventListener("keyup", handleKeyDown, { capture: true });
      enableUnityInput();
    };
  }, [isInputActive]);
  
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (isInputActive) {
        const target = e.target as HTMLElement;
        const isTextarea = target.tagName === "TEXTAREA" || target.tagName === "INPUT";
        const isTextareaParent = target.closest(".comment-textarea-container");
        
        if (!isTextarea && !isTextareaParent) {
          console.log("Клик вне формы комментариев");
          setIsInputActive(false);
          enableUnityInput();
        }
      }
    };
    
    document.addEventListener("click", handleMouseClick);
    
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, [isInputActive]);
  
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        handleTextareaFocus();
      }
    }, 200);
    
    return () => clearTimeout(focusTimer);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      setIsSubmitting(true);
      await addComment(gameId, content);
      setContent("");
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    } finally {
      setIsSubmitting(false);
      
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };
  
  const handleStartEdit = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
    
    setTimeout(() => {
      if (editTextareaRef.current) {
        editTextareaRef.current.focus();
        handleTextareaFocus();
      }
    }, 50);
  };
  
  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    
    try {
      await updateComment(commentId, editContent);
      setEditingCommentId(null);
    } catch (error) {
      console.error("Ошибка при обновлении комментария:", error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  
  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <span>Комментарии</span>
        {comments.length > 0 && (
          <span className="text-sm font-normal text-muted-foreground">
            ({comments.length})
          </span>
        )}
      </h2>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4 comment-textarea-container">
          <Textarea
            ref={textareaRef}
            placeholder="Напишите комментарий..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleTextareaFocus}
            onBlur={handleTextareaBlur}
            className="min-h-[100px]"
            onClick={(e) => {
              e.stopPropagation();
              handleTextareaFocus();
            }}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitting ? "Отправка..." : "Отправить комментарий"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-md bg-muted/50 p-4 text-center">
          <p className="text-muted-foreground">
            Пожалуйста, <a href="/login" className="text-primary hover:underline">войдите в систему</a>, чтобы оставить комментарий.
          </p>
        </div>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{comment.user ? getInitials(comment.user.username) : "??"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{comment.user?.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()} • 
                        {comment.updatedAt > comment.createdAt && " изменено"}
                      </p>
                    </div>
                    
                    {user && (user.id === comment.userId || user.isAdmin) && editingCommentId !== comment.id && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(comment.id, comment.content);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(comment.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2 comment-textarea-container">
                      <Textarea
                        ref={editTextareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onFocus={handleTextareaFocus}
                        onBlur={handleTextareaBlur}
                        className="min-h-[100px]"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                        >
                          Отмена
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit(comment.id);
                          }}
                          disabled={!editContent.trim()}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{comment.content}</p>
                  )}
                </div>
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Комментариев пока нет. Будьте первым, кто оставит комментарий!</p>
        </div>
      )}
      
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить комментарий</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить этот комментарий? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.stopPropagation();
                deleteConfirmId && handleDelete(deleteConfirmId);
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

declare global {
  interface Window {
    unityInstance: any;
  }
}
