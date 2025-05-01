
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Game } from "@/types";
import { GameCard } from "./GameCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FeaturedGamesProps {
  games: Game[];
  title?: string;
  subtitle?: string;
}

export function FeaturedGames({ 
  games,
  title = "Featured Games", 
  subtitle = "Discover the best Unity games created by our community"
}: FeaturedGamesProps) {
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Сбрасываем видимые игры при изменении списка игр или статуса аутентификации
    setVisibleGames([]);
    
    if (games.length === 0) return;
    
    // Animate the games appearing one after another
    const timer = setTimeout(() => {
      const showGames = async () => {
        const gamesArray = [...games];
        const newVisibleGames: Game[] = [];
        
        for (let i = 0; i < gamesArray.length; i++) {
          newVisibleGames.push(gamesArray[i]);
          setVisibleGames([...newVisibleGames]);
          if (i < gamesArray.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
      };
      
      showGames();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [games, isAuthenticated]); // Добавляем isAuthenticated в зависимости
  
  if (games.length === 0) return null;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleGames.map((game, index) => (
            <div 
              key={`${game.id}-${index}`} 
              className={`transition-all duration-500 transform ${
                visibleGames.includes(game) 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GameCard game={game} variant="featured" />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/games">
            <Button variant="outline" size="lg" className="gap-2">
              View All Games
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
