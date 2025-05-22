import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGames } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRatings } from '@/contexts/RatingContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTitle } from '@/components/PageTitle';
import { CommentSection } from '@/components/CommentSection';
import { RatingComponent } from '@/components/RatingComponent';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Heart, Play, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { getGameById, toggleFavorite, isFavorite } = useGames();
  const { user } = useAuth();
  const { getAverageRating } = useRatings();
  const [averageRating, setAverageRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  
  const game = gameId ? getGameById(gameId) : undefined;
  
  useEffect(() => {
    if (gameId) {
      setAverageRating(getAverageRating(gameId));
      
      if (user) {
        setFavorite(isFavorite(gameId));
      }
      
      // Запись просмотра игры
      const recordGameView = async () => {
        try {
          // Если пользователь авторизован, записываем просмотр
          if (user) {
            console.log("Регистрация просмотра для авторизованного пользователя", user.id);
            
            // Проверяем, просматривал ли пользователь игру ранее
            const { data: existingView } = await supabase
              .from('game_views')
              .select('id')
              .eq('user_id', user.id)
              .eq('game_id', gameId)
              .single();
              
            // Если пользователь не просматривал игру раньше, добавляем запись
            if (!existingView) {
              console.log("Новый просмотр, добавление записи");
              const { error } = await supabase
                .from('game_views')
                .insert({
                  user_id: user.id,
                  game_id: gameId,
                  viewed_at: new Date().toISOString()
                });
                
              if (error) {
                console.error("Ошибка при записи просмотра:", error);
              }
            } else {
              console.log("Повторный просмотр, обновление времени");
              // Обновляем время просмотра
              const { error } = await supabase
                .from('game_views')
                .update({ viewed_at: new Date().toISOString() })
                .eq('id', existingView.id);
                
              if (error) {
                console.error("Ошибка при обновлении просмотра:", error);
              }
            }
          } else {
            console.log("Анонимный просмотр, статистика не сохраняется");
            // Для анонимных пользователей не записываем просмотр
          }
        } catch (error) {
          console.error("Ошибка при записи просмотра:", error);
        }
      };
      
      recordGameView();
    }
  }, [gameId, getAverageRating, isFavorite, user]);
  
  const handleFavoriteToggle = async () => {
    if (!gameId) return;
    try {
      await toggleFavorite(gameId);
      setFavorite(!favorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      toast.error("Failed to update favorites");
    }
  };
  
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4">
            <PageTitle title="Игра не найдена" description="Запрашиваемая игра не существует или была удалена." />
            <Button onClick={() => navigate('/games')}>Вернуться к списку игр</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <PageTitle title={game.title} description={game.description} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Game Cover Image */}
            <div className="md:order-1">
              <img 
                src={game.coverImage} 
                alt={game.title} 
                className="w-full rounded-md shadow-md" 
              />
            </div>
            
            {/* Game Details */}
            <div className="md:order-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(game.createdAt).toLocaleDateString()}
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    Обновлено {new Date(game.updatedAt).toLocaleDateString()}
                  </Badge>
                </div>
                
                <RatingComponent rating={averageRating} />
              </div>
              
              <div className="space-y-4">
                <Button onClick={() => navigate(`/play/${gameId}`)} className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Играть сейчас
                </Button>
                
                <Button 
                  variant={favorite ? "destructive" : "outline"}
                  onClick={handleFavoriteToggle}
                  className="w-full gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                </Button>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p>{game.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <CommentSection gameId={gameId} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetails;
