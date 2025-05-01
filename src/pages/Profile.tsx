
import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { User, Shield, Mail, Calendar, MessageSquare, Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { getUserGames } = useGames();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load initial user data
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      fetchCommentCount();
    }
  }, [user]);

  // Fetch comment count
  const fetchCommentCount = async () => {
    try {
      if (!user) return;
      
      const { count, error } = await supabase
        .from('comments')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
        
      if (error) {
        console.error("Error fetching comments count:", error);
        return;
      }
      
      setCommentCount(count || 0);
    } catch (error) {
      console.error("Failed to fetch comment count:", error);
    }
  };

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (username.trim() === "") {
        toast.error("Имя пользователя не может быть пустым");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success("Профиль успешно обновлен");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Не удалось обновить профиль");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Заполните все поля");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Новые пароли не совпадают");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Пароль успешно изменен");
    } catch (error: any) {
      toast.error(error.message || "Не удалось изменить пароль");
    }
  };

  const handleUpdatePrivacy = async (isPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_public: isPublic })
        .eq('id', user.id);

      if (error) throw error;
      
      setIsPublicProfile(isPublic);
      toast.success(`Профиль ${isPublic ? 'стал публичным' : 'стал приватным'}`);
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      toast.error("Не удалось обновить настройки приватности");
    }
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
                        <span className="font-medium">{commentCount}</span>
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
                            <Input 
                              id="username" 
                              value={username}
                              onChange={e => setUsername(e.target.value)} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email} disabled />
                            <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">О себе</Label>
                          <textarea
                            id="bio"
                            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Расскажите о себе..."
                            value={bio}
                            onChange={e => setBio(e.target.value)}
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
                              checked={isPublicProfile}
                              onChange={() => handleUpdatePrivacy(!isPublicProfile)}
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
                      <form className="space-y-4" onSubmit={handleChangePassword}>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Текущий пароль</Label>
                          <div className="relative">
                            <Input 
                              id="current-password" 
                              type={showPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={e => setCurrentPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Новый пароль</Label>
                          <Input 
                            id="new-password" 
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                          <Input 
                            id="confirm-password" 
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        
                        <Button type="submit">Изменить пароль</Button>
                      </form>
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
