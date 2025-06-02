
import { useState, useEffect } from "react";
import { useGames } from "@/contexts/GameContext";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PencilIcon, Trash2Icon, Upload, X, FileIcon, Eye, User, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRatings } from "@/contexts/RatingContext";

interface EditGameFormProps {
  game: Game;
}

export function EditGameForm({ game }: EditGameFormProps) {
  const { updateGame, deleteGame } = useGames();
  const { getAverageRating, getGameRatings } = useRatings();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: game.title,
    description: game.description,
    tags: game.tags ? game.tags.join(", ") : ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [gameFiles, setGameFiles] = useState<{
    wasm: File | null;
    data: File | null;
    framework: File | null;
    loader: File | null;
    index: File | null;
  }>({
    wasm: null,
    data: null,
    framework: null,
    loader: null,
    index: null
  });
  
  useEffect(() => {
    setHasChanges(
      formData.title !== game.title ||
      formData.description !== game.description ||
      formData.tags !== (game.tags ? game.tags.join(", ") : "") ||
      gameFiles.wasm !== null ||
      gameFiles.data !== null ||
      gameFiles.framework !== null ||
      gameFiles.loader !== null ||
      gameFiles.index !== null
    );
  }, [formData, game, gameFiles]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGameFileChange = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGameFiles(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const clearGameFile = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index') => {
    setGameFiles(prev => ({ ...prev, [fileType]: null }));
    const fileInput = document.getElementById(`edit-gameFile-${fileType}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      
      const updateData: Partial<Game> & {
        gameFiles?: {
          wasm: File | null;
          data: File | null;
          framework: File | null;
          loader: File | null;
          index: File | null;
        }
      } = {
        title: formData.title,
        description: formData.description,
        tags: tagsArray
      };
      
      // Проверяем, есть ли новые файлы для загрузки
      const hasNewFiles = Object.values(gameFiles).some(file => file !== null);
      if (hasNewFiles) {
        updateData.gameFiles = gameFiles;
      }
      
      await updateGame(game.id, updateData);
      
      toast.success("Игра успешно обновлена");
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка при обновлении игры:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteGame(game.id);
      toast.success("Игра успешно удалена");
      navigate("/games");
    } catch (error) {
      console.error("Ошибка при удалении игры:", error);
    }
  };

  const renderFileUpload = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index', label: string, extension: string) => {
    const file = gameFiles[fileType];
    const id = `edit-gameFile-${fileType}`;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{label}</p>
          {file && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => clearGameFile(fileType)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {file ? (
          <div className="flex items-center gap-2 border rounded px-3 py-2 text-sm">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{file.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              id={id}
              type="file"
              accept={`.${extension}`}
              className="hidden"
              onChange={handleGameFileChange(fileType)}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={() => document.getElementById(id)?.click()}
            >
              Выбрать {label}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const averageRating = getAverageRating(game.id);
  const ratings = getGameRatings(game.id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Управление игрой: {game.title}
        </h2>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2Icon className="h-4 w-4 mr-1" />
              Удалить игру
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить игру</AlertDialogTitle>
              <AlertDialogDescription>
                Вы уверены, что хотите удалить эту игру? Это действие нельзя отменить.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="details">
            <Eye className="h-4 w-4 mr-2" />
            Детали
          </TabsTrigger>
          <TabsTrigger value="edit">
            <PencilIcon className="h-4 w-4 mr-2" />
            Редактировать
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Основная информация</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Название:</span>
                      <p className="font-medium">{game.title}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Описание:</span>
                      <p className="text-sm">{game.description || "Описание отсутствует"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Автор: {game.author?.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Создано: {game.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {game.tags && game.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Теги</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {game.coverImage && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Обложка</h4>
                    <img 
                      src={game.coverImage} 
                      alt={game.title}
                      className="w-full max-w-sm rounded-lg border"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 glass-card">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Средний рейтинг</p>
                  </div>
                  <div className="text-center p-3 glass-card">
                    <p className="font-semibold">{ratings.length}</p>
                    <p className="text-xs text-muted-foreground">Оценок</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="edit" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Название игры
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Теги (через запятую)
              </label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="приключения, головоломка, экшен"
              />
              <p className="text-xs text-muted-foreground">
                Разделяйте теги запятыми (например: экшен, головоломка, приключения)
              </p>
            </div>
            
            <div className="space-y-4 border rounded-md p-4">
              <h3 className="font-medium">Обновить файлы игры</h3>
              <p className="text-sm text-muted-foreground">
                Выберите файлы, которые хотите обновить. Оставьте поля пустыми, чтобы сохранить текущие файлы.
              </p>
              
              <div className="grid gap-3">
                {renderFileUpload('wasm', 'WebAssembly (.wasm)', 'wasm')}
                {renderFileUpload('data', 'Data File (.data)', 'data')}
                {renderFileUpload('framework', 'Framework JS', 'js')}
                {renderFileUpload('loader', 'Loader JS', 'js')}
                {renderFileUpload('index', 'Index HTML (опционально)', 'html')}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || !hasChanges}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
