
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [authUserViews, setAuthUserViews] = useState(0);
  
  // Загрузка данных аналитики из базы данных
  useEffect(() => {
    const loadAnalytics = async () => {
      if (user) {
        try {
          // Получаем список игр пользователя
          const userGames = getUserGames();
          
          if (userGames.length === 0) {
            setAuthUserViews(0);
            return;
          }
          
          // Получаем ID всех игр пользователя
          const gameIds = userGames.map(game => game.id);
          
          // Запрашиваем количество просмотров авторизованными пользователями для игр автора
          const { count, error: countError } = await supabase
            .from('game_views')
            .select('*', { count: 'exact', head: true })
            .in('game_id', gameIds);
            
          if (countError) {
            console.error("Ошибка получения просмотров:", countError);
            toast.error("Не удалось загрузить данные о просмотрах");
          } else {
            // Устанавливаем точное количество просмотров авторизованными пользователями
            setAuthUserViews(count || 0);
          }
        } catch (error) {
          console.error("Ошибка при загрузке аналитических данных:", error);
          toast.error("Не удалось загрузить аналитические данные");
        }
      }
    };
    
    loadAnalytics();
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
                authUserViews={authUserViews}
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
