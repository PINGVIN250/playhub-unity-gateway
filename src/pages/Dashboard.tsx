
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRatings } from "@/contexts/RatingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { GameGrid } from "@/components/GameGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card animate-pulse">
                      <div className="aspect-video bg-muted/50 rounded-t-md"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted/50 rounded w-3/4"></div>
                        <div className="h-4 bg-muted/50 rounded w-full"></div>
                        <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                        <div className="pt-2 flex justify-between gap-2">
                          <div className="h-9 bg-muted/50 rounded w-full"></div>
                          <div className="h-9 bg-muted/50 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {userGames.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <Upload className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Пока нет игр</h3>
                      <p className="text-muted-foreground mb-6">
                        Вы еще не загрузили ни одной игры. Начните демонстрировать свои творения на Unity!
                      </p>
                      <Link to="/upload">
                        <Button className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          <span>Добавить вашу первую игру</span>
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <GameGrid 
                      games={userGames} 
                      columns={3}
                      emptyMessage="Вы еще не загрузили ни одной игры."
                    />
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Всего просмотров</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">За все время</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Ваши игры</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userGameCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Больше чем у {100 - percentile}% разработчиков
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Средний рейтинг</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{averageRating}</div>
                    <p className="text-xs text-muted-foreground mt-1">На основе всех игр</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Просмотры по месяцам</CardTitle>
                  <CardDescription>
                    Тенденции просмотров за последние 6 месяцев
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end gap-2">
                    {monthlyViews.map((views, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary/80 hover:bg-primary transition-all rounded-t"
                          style={{ 
                            height: `${Math.min(100, Math.max(5, views))}%`,
                          }}
                        ></div>
                        <div className="text-xs mt-2 text-muted-foreground">{['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'][i]}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
