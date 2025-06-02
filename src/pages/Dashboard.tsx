
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRatings } from "@/contexts/RatingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusCircle, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesTab } from "@/components/dashboard/GamesTab";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";
import { AdminPanel } from "@/components/dashboard/AdminPanel";

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

  // Определяем доступные вкладки в зависимости от прав пользователя
  const tabsList = (
    <TabsList className={`grid w-full ${user?.isAdmin ? 'grid-cols-3' : 'grid-cols-2'} max-w-md`}>
      <TabsTrigger value="my-games">Мои игры</TabsTrigger>
      <TabsTrigger value="analytics">Аналитика</TabsTrigger>
      {user?.isAdmin && <TabsTrigger value="admin">Админ панель</TabsTrigger>}
    </TabsList>
  );

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title={`Добро пожаловать, ${user?.username}`}
            description="Управляйте своими играми и просматривайте статистику"
          >
            <div className="flex gap-2">
              <Link to="/upload">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Добавить новую игру</span>
                </Button>
              </Link>
              
              {user?.isAdmin && (
                <Button variant="outline" className="gap-2 border-red-500 text-red-500 hover:bg-red-50">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Режим администратора</span>
                </Button>
              )}
            </div>
          </PageTitle>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {tabsList}
            
            <TabsContent value="my-games" className="space-y-6">
              <GamesTab isLoading={isLoading} userGames={userGames} />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsTab 
                userGameCount={userGameCount}
                percentile={percentile}
                averageRating={averageRating}
              />
            </TabsContent>
            
            {user?.isAdmin && (
              <TabsContent value="admin" className="space-y-6">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
