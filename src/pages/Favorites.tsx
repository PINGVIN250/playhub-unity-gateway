
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { GameCard } from "@/components/GameCard";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { getFavoriteGames, isLoading } = useGames();
  const { user } = useAuth();
  const favoriteGames = getFavoriteGames();
  
  // Если пользователь не авторизован, предлагаем войти
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <Navbar />
        <main className="flex-1 py-24 container mx-auto px-4">
          <PageTitle 
            title="Избранные игры" 
            description="Войдите в систему, чтобы добавлять и просматривать избранные игры"
          />
          
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Войдите в систему</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Чтобы добавлять игры в избранное и сохранять их для быстрого доступа, 
              необходимо войти в свою учетную запись.
            </p>
            <div className="flex gap-4">
              <Link to="/login">
                <Button>Войти</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Зарегистрироваться</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24 container mx-auto px-4">
        <PageTitle 
          title="Избранные игры" 
          description="Ваша коллекция избранных игр"
        />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : favoriteGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ваш список избранного пуст</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Вы еще не добавили ни одной игры в избранное. Найдите интересные игры и 
              нажмите на иконку сердца, чтобы сохранить их здесь.
            </p>
            <Link to="/games">
              <Button>Просмотреть все игры</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
