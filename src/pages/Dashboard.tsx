
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

  // Generate consistent view data based on user's games
  useEffect(() => {
    if (user) {
      const userGames = getUserGames();
      const userGameCount = userGames.length;
      
      // Calculate total views based on games count and game age
      let calculatedTotalViews = 0;
      
      userGames.forEach(game => {
        // Calculate days since game creation
        const daysSinceCreation = Math.floor((new Date().getTime() - game.createdAt.getTime()) / (1000 * 3600 * 24));
        
        // Base views per game (older games have more views)
        const gameViews = Math.min(2000, 50 + (daysSinceCreation * 5) + (userGameCount * 10));
        calculatedTotalViews += gameViews;
      });
      
      // If user has no games, show zero views
      setTotalViews(calculatedTotalViews);
      
      // Generate monthly view data with a growth trend
      const monthData = Array(6).fill(0).map((_, index) => {
        // More recent months have more views (upward trend)
        const monthFactor = (index + 1) / 6; // 0.17 to 1.0
        const baseMonthlyViews = calculatedTotalViews / 6; // Average views per month
        
        // Apply a growth factor for recent months
        return Math.round(baseMonthlyViews * (0.5 + monthFactor));
      });
      
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
