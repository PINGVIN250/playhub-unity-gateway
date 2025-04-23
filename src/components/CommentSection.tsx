
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

interface CommentSectionProps {
  gameId: string;
}

export function CommentSection({ gameId }: CommentSectionProps) {
  // Получение пользователя и статуса авторизации
  const { user, isAuthenticated } = useAuth();
  // Доступ к функциям работы с комментариями
  const { getGameComments, addComment, deleteComment, updateComment, isLoading } = useComments();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Массив комментариев для выбранной игры
  const comments = getGameComments(gameId);

  // Безопасная отправка сообщений в Unity
  const sendMessageToUnity = (objectName: string, methodName: string, value: string) => {
    if (window.unityInstance) {
      try {
        // Проверяем существование объекта через вызов GetInstanceID
        // Если объект не существует, будет выброшено исключение
        window.unityInstance.SendMessage(objectName, "GetInstanceID");
        
        // Если мы дошли до этой строки, значит объект существует
        window.unityInstance.SendMessage(objectName, methodName, value);
        return true;
      } catch (error) {
        console.log(`Объект ${objectName} не найден в Unity или ошибка при отправке сообщения:`, error);
        return false;
      }
    }
    return false;
  };

  // При фокусе на textarea отключаем ввод для Unity
  const handleTextareaFocus = () => {
    // Пробуем отправить сообщение в Unity более безопасным способом
    const objectsToTry = ["GameManager", "InputManager", "UIManager", "GameController"];
    let messageDelivered = false;
    
    // Пробуем разные объекты, которые могут существовать в сцене Unity
    for (const objectName of objectsToTry) {
      if (sendMessageToUnity(objectName, "SetInputEnabled", "false")) {
        messageDelivered = true;
        break;
      }
    }
    
    if (!messageDelivered && window.unityInstance) {
      console.log("Не удалось найти подходящий объект в Unity для отключения ввода");
    }
    
    // Добавляем обработчик для возврата ввода после потери фокуса
    document.addEventListener("click", handleDocumentClick);
  };
  
  // При клике вне поля комментария возвращаем ввод в Unity
  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isTextarea = target.tagName === "TEXTAREA";
    const isTextareaParent = target.closest(".comment-textarea-container");
    
    if (!isTextarea && !isTextareaParent) {
      const objectsToTry = ["GameManager", "InputManager", "UIManager", "GameController"];
      let messageDelivered = false;
      
      // Пробуем разные объекты, которые могут существовать в сцене Unity
      for (const objectName of objectsToTry) {
        if (sendMessageToUnity(objectName, "SetInputEnabled", "true")) {
          messageDelivered = true;
          break;
        }
      }
      
      if (!messageDelivered && window.unityInstance) {
        console.log("Не удалось найти подходящий объект в Unity для включения ввода");
      }
      
      document.removeEventListener("click", handleDocumentClick);
    }
  };
  
  // Отправка нового комментария
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      setIsSubmitting(true);
      await addComment(gameId, content);
      setContent("");
    } catch (error) {
      console.error("Ошибка добавления комментария:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Запуск редактирования: устанавливаем id и текст редактируемого комментария, фокусируем поле
  const handleStartEdit = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
    setTimeout(() => {
      if (editTextareaRef.current) {
        editTextareaRef.current.focus();
      }
    }, 50);
  };
  
  // Сохраняем отредактированный комментарий
  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    try {
      await updateComment(commentId, editContent);
      setEditingCommentId(null);
    } catch (error) {
      console.error("Ошибка обновления комментария:", error);
    }
  };
  
  // Отмена редактирования комментария — очищаем состояние
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  
  // Удаление комментария с подтверждением
  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Ошибка удаления комментария:", error);
    }
  };
  
  // Возвращает инициалы пользователя (например, "ИМ" из "Иван Михайлов")
  const getInitials = (name: string) => {
    if (!name) return "??";
    
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  // Получение безопасного имени пользователя с запасным вариантом
  const getUserName = (comment: any) => {
    if (comment.user?.username) {
      return comment.user.username;
    }
    return "Пользователь удален";
  };

  // При размонтировании компонента убираем обработчики и возвращаем ввод Unity
  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      
      const objectsToTry = ["GameManager", "InputManager", "UIManager", "GameController"];
      for (const objectName of objectsToTry) {
        sendMessageToUnity(objectName, "SetInputEnabled", "true");
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Заголовок и количество комментариев */}
      <h2 className="text-xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <span>Комментарии</span>
        {comments.length > 0 && (
          <span className="text-sm font-normal text-muted-foreground">
            ({comments.length})
          </span>
        )}
      </h2>
      
      {/* Форма для создания комментария доступна только авторизованным пользователям */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4 comment-textarea-container">
          <Textarea
            ref={textareaRef}
            placeholder="Напишите комментарий..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleTextareaFocus}
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
        // Сообщение для неавторизованных пользователей
        <div className="rounded-md bg-muted/50 p-4 text-center">
          <p className="text-muted-foreground">
            Пожалуйста, <a href="/login" className="text-primary hover:underline">войдите в систему</a>, чтобы оставить комментарий.
          </p>
        </div>
      )}
      
      {/* Список комментариев или сообщение об отсутствии */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(comment.user?.username || "")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{getUserName(comment)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()} • 
                        {comment.updatedAt > comment.createdAt && " изменено"}
                      </p>
                    </div>
                    {/* Кнопки редактирования и удаления — доступны автору или админу */}
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
                  {/* Блок редактирования или отображение текста комментария */}
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2 comment-textarea-container">
                      <Textarea
                        ref={editTextareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onFocus={handleTextareaFocus}
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
        // Сообщение при отсутствии комментариев
        <div className="text-center py-8">
          <p className="text-muted-foreground">Комментариев пока нет. Будьте первым, кто оставит комментарий!</p>
        </div>
      )}
      
      {/* Диалог подтверждения удаления */}
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

// Обновляем тип Window, чтобы добавить unityInstance для взаимодействия с игрой
declare global {
  interface Window {
    unityInstance: any;
  }
}
