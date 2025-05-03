
import { useState, useEffect } from "react";
import { useGames } from "@/contexts/GameContext";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { PencilIcon, Trash2Icon, Upload, X, FileIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditGameFormProps {
  game: Game;
}

export function EditGameForm({ game }: EditGameFormProps) {
  const { updateGame, deleteGame } = useGames();
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
      // Преобразуем строку тегов в массив
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      
      // Исправляем ошибку типа, сохраняя только gameFiles без добавления свойств wasmPath и т.д.
      await updateGame(game.id, {
        ...formData,
        tags: tagsArray,
        gameFiles: gameFiles
      });
    } catch (error) {
      // Error is handled by the context
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
      // Error is handled by the context
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
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <PencilIcon className="h-5 w-5" />
          <span>Редактировать игру</span>
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
    </div>
  );
}
