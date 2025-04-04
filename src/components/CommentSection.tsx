
import { useState } from "react";
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

interface CommentSectionProps {
  gameId: string;
}

export function CommentSection({ gameId }: CommentSectionProps) {
  // Получаем данные о пользователе и статус аутентификации
  const { user, isAuthenticated } = useAuth();
  // Получаем функции для работы с комментариями
  const { getGameComments, addComment, deleteComment, updateComment, isLoading } = useComments();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Получаем комментарии для конкретной игры
  const comments = getGameComments(gameId);
  
  // Обработчик отправки комментария
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
    }
  };
  
  // Начало редактирования комментария
  const handleStartEdit = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };
  
  // Сохранение отредактированного комментария
  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    
    try {
      await updateComment(commentId, editContent);
      setEditingCommentId(null);
    } catch (error) {
      console.error("Ошибка при обновлении комментария:", error);
    }
  };
  
  // Отмена редактирования комментария
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  
  // Удаление комментария
  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };
  
  // Получение инициалов имени пользователя
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Напишите комментарий..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
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
                          onClick={() => handleStartEdit(comment.id, comment.content)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => setDeleteConfirmId(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Отмена
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(comment.id)}
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
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
