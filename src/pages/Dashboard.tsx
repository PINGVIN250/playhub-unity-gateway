
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { GameGrid } from "@/components/GameGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Upload, Settings, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { getUserGames, isLoading } = useGames();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-games");

  // Перенаправление на логин, если пользователь не авторизован
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const userGames = getUserGames();

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title={`Добро пожаловать, ${user?.username}`}
            description="Управляйте своими играми и настройками аккаунта"
          >
            <Link to="/upload">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Добавить новую игру</span>
              </Button>
            </Link>
          </PageTitle>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="my-games">Мои игры</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
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
              <div className="glass-card p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="54" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      strokeDasharray="339.3" 
                      strokeDashoffset="135.7" 
                      className="text-primary" 
                    />
                  </svg>
                  <div className="absolute">
                    <p className="text-3xl font-bold">60%</p>
                    <p className="text-xs text-muted-foreground">Вовлеченность</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Аналитика скоро появится</h3>
                <p className="text-muted-foreground">
                  Статистика вовлеченности пользователей и игрового процесса будет доступна в ближайшее время.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user?.username}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Участник с {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Настройки профиля</h4>
                      <p className="text-sm text-muted-foreground">
                        Обновите информацию вашего профиля
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Изменить</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Безопасность аккаунта</h4>
                      <p className="text-sm text-muted-foreground">
                        Изменить пароль и настройки безопасности
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Управление</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Настройки уведомлений</h4>
                      <p className="text-sm text-muted-foreground">
                        Управление способами связи с вами
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Настроить</span>
                    </Button>
                  </div>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-start gap-2 p-4 rounded-md bg-muted/50">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Режим разработчика</h4>
                      <p className="text-sm text-muted-foreground">
                        Это демонстрационное приложение. В реальном приложении эти настройки были бы полностью функциональными.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
