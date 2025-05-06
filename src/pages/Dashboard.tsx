
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRatings } from "@/contexts/RatingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesTab } from "@/components/dashboard/GamesTab";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";

/**
 * Панель разработчика
 * Отображает игры пользователя и аналитические данные
 */
const Dashboard = () => {
  const { getUserGames, isLoading, games } = useGames();
  const { getAverageRating } = useRatings();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-games");
  const [totalViews, setTotalViews] = useState(0);
  const [authUserViews, setAuthUserViews] = useState(0);

  // Генерация данных о просмотрах на основе игр пользователя
  useEffect(() => {
    if (user) {
      const userGames = getUserGames();
      const userGameCount = userGames.length;
      
      // Рассчитываем общие просмотры на основе количества игр и их возраста
      let calculatedTotalViews = 0;
      
      userGames.forEach(game => {
        // Расчет дней с момента создания игры
        const daysSinceCreation = Math.floor((new Date().getTime() - game.createdAt.getTime()) / (1000 * 3600 * 24));
        
        // Базовые просмотры на игру (более старые игры имеют больше просмотров)
        const gameViews = Math.min(2000, 50 + (daysSinceCreation * 5) + (userGameCount * 10));
        calculatedTotalViews += gameViews;
      });
      
      // Фиксированный процент для авторизованных просмотров - 40% от общих просмотров
      // Использование фиксированного процента вместо случайного диапазона
      const calculatedAuthUserViews = Math.floor(calculatedTotalViews * 0.4);
      
      // Если у пользователя нет игр, показываем ноль просмотров
      setTotalViews(calculatedTotalViews);
      setAuthUserViews(calculatedAuthUserViews);
    }
  }, [user, getUserGames]);

  // Перенаправление на страницу входа, если пользователь не аутентифицирован
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const userGames = getUserGames();
  const userGameCount = userGames.length;
  const totalGames = games.length;
  const percentile = totalGames > 0 
    ? Math.round((userGameCount / totalGames) * 100) 
    : 0;
  
  /**
   * Рассчитывает средний рейтинг по всем играм пользователя
   * @returns {number} Средний рейтинг
   */
  const calculateAverageRating = () => {
    if (userGames.length === 0) return 0;
    
    const totalRating = userGames.reduce((sum, game) => {
      const avgRating = getAverageRating(game.id);
      return sum + avgRating;
    }, 0);
    
    return userGames.length > 0 
      ? parseFloat((totalRating / userGames.length).toFixed(1))
      : 0;
  };
  
  const averageRating = calculateAverageRating();

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title={`Добро пожаловать, ${user?.username}`}
            description="Управляйте своими играми и просматривайте статистику"
          >
            <Link to="/upload">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Добавить новую игру</span>
              </Button>
            </Link>
          </PageTitle>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="my-games">Мои игры</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-games" className="space-y-6">
              <GamesTab isLoading={isLoading} userGames={userGames} />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsTab 
                totalViews={totalViews}
                userGameCount={userGameCount}
                percentile={percentile}
                averageRating={averageRating}
                authUserViews={authUserViews}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

