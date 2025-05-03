
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
import { PencilIcon, Trash2Icon } from "lucide-react";
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
    gameUrl: game.gameUrl,
    width: game.width,
    height: game.height,
    tags: game.tags ? game.tags.join(", ") : ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    setHasChanges(
      formData.title !== game.title ||
      formData.description !== game.description ||
      formData.gameUrl !== game.gameUrl ||
      formData.width !== game.width ||
      formData.height !== game.height ||
      formData.tags !== (game.tags ? game.tags.join(", ") : "")
    );
  }, [formData, game]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert width and height to numbers
    if (name === 'width' || name === 'height') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
      
      await updateGame(game.id, {
        ...formData,
        tags: tagsArray
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
      toast.success("Game deleted successfully");
      navigate("/games");
    } catch (error) {
      // Error is handled by the context
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <PencilIcon className="h-5 w-5" />
          <span>Edit Game</span>
        </h2>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2Icon className="h-4 w-4 mr-1" />
              Delete Game
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Game</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this game? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Game Title
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
            Description
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
          <label htmlFor="gameUrl" className="text-sm font-medium">
            Game URL
          </label>
          <Input
            id="gameUrl"
            name="gameUrl"
            value={formData.gameUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags (comma separated)
          </label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="adventure, puzzle, action"
          />
          <p className="text-xs text-muted-foreground">
            Separate tags with commas (e.g., action, puzzle, adventure)
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="width" className="text-sm font-medium">
              Width (px)
            </label>
            <Input
              id="width"
              name="width"
              type="number"
              value={formData.width}
              onChange={handleChange}
              min={300}
              max={1920}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="height" className="text-sm font-medium">
              Height (px)
            </label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              min={200}
              max={1080}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !hasChanges}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
