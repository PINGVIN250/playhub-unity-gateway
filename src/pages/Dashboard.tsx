
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

const Dashboard = () => {
  const { getUserGames, isLoading, games } = useGames();
  const { getAverageRating } = useRatings();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-games");
  const [totalViews, setTotalViews] = useState(0);
  const [monthlyViews, setMonthlyViews] = useState<number[]>([]);

  // Generate test data for analytics
  useEffect(() => {
    if (user) {
      const userGamesCount = getUserGames().length;
      // Generate view count based on number of games
      const baseViews = userGamesCount > 0 ? 120 * userGamesCount : 0;
      setTotalViews(baseViews + Math.floor(Math.random() * 500));
      
      // Generate monthly view data (last 6 months)
      const monthData = Array(6).fill(0).map(() => 
        Math.floor(Math.random() * 80) + 20
      );
      setMonthlyViews(monthData);
    }
  }, [user, getUserGames]);

  // Redirect to login if not authenticated
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
  
  // Calculate average rating across all user games
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
                monthlyViews={monthlyViews}
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
