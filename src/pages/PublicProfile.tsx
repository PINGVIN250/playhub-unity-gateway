
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GameGrid } from "@/components/GameGrid";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, GamepadIcon, MessageSquare, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as UserType, Game } from "@/types";
import { useGames } from "@/contexts/GameContext";

interface PublicUserProfile {
  id: string;
  username: string;
  created_at: string;
  is_public: boolean;
  bio?: string;
}

const PublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const { games } = useGames();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        
        if (!userId) return;
        
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (profileError) throw profileError;
        
        // Check if profile is public
        if (profileData && !profileData.is_public) {
          setProfile({ ...profileData, is_public: false });
          setIsLoading(false);
          return;
        }
        
        // Count user's comments
        const { count: commentCount, error: commentError } = await supabase
          .from('comments')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId);
          
        if (commentError) throw commentError;
        
        // Set profile data
        setProfile(profileData);
        setCommentCount(commentCount || 0);
        
        // Filter games by this user
        const userGames = games.filter(game => game.authorId === userId);
        setUserGames(userGames);
        
      } catch (error) {
        console.error("Error fetching public profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId, games]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Загрузка профиля...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Профиль не найден</h1>
            <p className="text-muted-foreground mb-6">
              Пользователь не существует или профиль был удален
            </p>
            <Link to="/">
              <Button>Вернуться на главную</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!profile.is_public) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Профиль скрыт</h1>
            <p className="text-muted-foreground mb-6">
              Этот пользователь установил свой профиль как приватный
            </p>
            <Link to="/">
              <Button>Вернуться на главную</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => window.history.back()} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Назад</span>
            </Button>
          </div>
          
          <PageTitle 
            title={profile.username} 
            description={`Профиль пользователя и игры`}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                      {profile.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{profile.username}</CardTitle>
                      <CardDescription>Разработчик игр</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Участник с {new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                      <span>Игр создано: {userGames.length}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Комментариев: {commentCount}</span>
                    </div>
                    
                    {profile.bio && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">О разработчике</h3>
                          <p className="text-muted-foreground text-sm">{profile.bio}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Игры пользователя</CardTitle>
                  <CardDescription>
                    Игры, созданные разработчиком {profile.username}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userGames.length > 0 ? (
                    <GameGrid games={userGames} columns={2} />
                  ) : (
                    <div className="text-center py-8">
                      <GamepadIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium mb-1">Нет созданных игр</h3>
                      <p className="text-muted-foreground text-sm">
                        {profile.username} пока не создал ни одной игры
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicProfile;
