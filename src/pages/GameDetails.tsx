
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGames } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTitle } from '@/components/PageTitle';
import { CommentSection } from '@/components/CommentSection';
import { RatingComponent } from '@/components/RatingComponent';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Heart, Play, Calendar, Clock } from 'lucide-react';

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { getGameById, toggleFavorite, isFavorite } = useGames();
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(false);
  
  const game = gameId ? getGameById(gameId) : undefined;
  
  useEffect(() => {
    if (gameId && user) {
      setFavorite(isFavorite(gameId));
    }
  }, [gameId, isFavorite, user]);
  
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
                
                <RatingComponent gameId={gameId} />
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
