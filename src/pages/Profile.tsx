
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGames } from "@/contexts/GameContext";
import { toast } from "sonner";
import { 
  User, 
  Shield, 
  Mail, 
  Calendar,
  CreditCard,
  Settings,
} from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { getUserGames } = useGames();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const userGames = getUserGames();
  const joinedDate = user ? new Date(user.createdAt).toLocaleDateString() : '';
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Загрузка профиля...</div>
      </div>
    );
  }
  
  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Профиль успешно обновлен");
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title="Профиль пользователя"
            description="Управляйте персональными данными и настройками аккаунта"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle>{user.username}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Пользователь</span>
                      {user.isAdmin && (
                        <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Админ
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Участник с {joinedDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    ID: {user.id.substring(0, 8)}...
                  </div>
                </CardFooter>
              </Card>
              
              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Игры:</span>
                        <span className="font-medium">{userGames.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Комментарии:</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Подписчики:</span>
                        <span className="font-medium">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="security">Безопасность</TabsTrigger>
                  <TabsTrigger value="payments">Платежи</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Личная информация</CardTitle>
                      <CardDescription>
                        Обновите свои персональные данные и публичную информацию
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Имя пользователя</Label>
                            <Input id="username" defaultValue={user.username} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} disabled />
                            <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">О себе</Label>
                          <textarea
                            id="bio"
                            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Расскажите о себе..."
                          />
                        </div>
                        
                        <Button type="submit">Сохранить изменения</Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Настройки профиля</CardTitle>
                      <CardDescription>
                        Управляйте настройками вашего профиля
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Публичный профиль</Label>
                            <p className="text-sm text-muted-foreground">
                              Разрешить другим пользователям видеть ваш профиль
                            </p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="public-profile"
                              className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Уведомления по email</Label>
                            <p className="text-sm text-muted-foreground">
                              Получать уведомления о комментариях и рейтингах
                            </p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="email-notifications"
                              className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Изменение пароля</CardTitle>
                      <CardDescription>
                        Обновите ваш пароль для повышения безопасности
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Пароль успешно изменен");
                      }}>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Текущий пароль</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Новый пароль</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        
                        <Button type="submit">Изменить пароль</Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Сеансы</CardTitle>
                      <CardDescription>
                        Управляйте активными сеансами на разных устройствах
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Текущий сеанс</p>
                              <p className="text-sm text-muted-foreground">
                                Последняя активность: сейчас
                              </p>
                            </div>
                            <Button variant="outline" size="sm">Текущее устройство</Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="destructive">Завершить все другие сеансы</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Способы оплаты</CardTitle>
                          <CardDescription>
                            Управляйте вашими способами оплаты
                          </CardDescription>
                        </div>
                        <Button size="sm" className="gap-1">
                          <CreditCard className="h-4 w-4" />
                          <span>Добавить</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center p-10 text-muted-foreground text-center">
                        <div>
                          <CreditCard className="mx-auto h-10 w-10 mb-2 opacity-30" />
                          <p>У вас пока нет способов оплаты</p>
                          <p className="text-sm">Добавьте метод оплаты для премиум функций</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">История платежей</CardTitle>
                      <CardDescription>
                        Просмотр истории платежей и счетов
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center p-10 text-muted-foreground text-center">
                        <div>
                          <p>У вас пока нет платежей</p>
                          <p className="text-sm">История будет отображаться здесь</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
