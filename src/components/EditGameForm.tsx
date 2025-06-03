
import React, { useState, useEffect } from 'react';
import { useGames } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Game } from '@/types';

interface EditGameFormProps {
  game: Game;
  onSuccess?: () => void;
}

export const EditGameForm = ({ game, onSuccess }: EditGameFormProps) => {
  const [title, setTitle] = useState(game.title);
  const [description, setDescription] = useState(game.description);
  const [tags, setTags] = useState(game.tags.join(', '));
  const { updateGame } = useGames();
  const { toast } = useToast();

  useEffect(() => {
    if (game) {
      setTitle(game.title);
      setDescription(game.description);
      setTags(game.tags.join(', '));
    }
  }, [game]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const gameData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      await updateGame(game.id, gameData);
      toast({
        title: "Успех",
        description: "Игра успешно обновлена",
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error updating game:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить игру",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редактировать игру</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button type="submit">Обновить игру</Button>
        </form>
      </CardContent>
    </Card>
  );
};
