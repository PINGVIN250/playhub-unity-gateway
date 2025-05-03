
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Play, User, Calendar } from "lucide-react";
import { RatingComponent } from "@/components/RatingComponent";
import { EditGameForm } from "@/components/EditGameForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentSection } from "@/components/CommentSection";

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { getGameById } = useGames();
  const { user } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Получаем информацию об игре по id
  const game = getGameById(gameId || "");
  const isOwner = user && game && user.id === game.authorId;
  
  // Сбрасываем состояние загрузки изображения при изменении игры
  useEffect(() => {
    setIsImageLoaded(false);
  }, [gameId]);
  
  // Если игра не найдена, показываем соответствующее сообщение
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <Navbar />
        <main className="flex-1 py-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Игра не найдена</h1>
            <p className="text-muted-foreground mb-6">
              Игра, которую вы ищете, не существует или была удалена.
            </p>
            <Link to="/games">
              <Button>Просмотр игр</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Получаем имя разработчика или используем "Неизвестно" с более надежной проверкой
  const developerName = game.author?.username || "Неизвестно";
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="relative h-96 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
          <div className={`absolute inset-0 bg-muted/50 ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}></div>
          <img 
            src={game.coverImage} 
            alt={game.title}
            className={`object-cover w-full h-full ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/games">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Назад к играм</span>
              </Button>
            </Link>
          </div>
          
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <RatingComponent gameId={game.id} />
                    
                    <div className="ml-1 flex flex-wrap gap-2">
                      {game.tags?.map(tag => (
                        <Badge key={tag} className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                      {game.featured && (
                        <Badge variant="secondary">Избранное</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {game.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={`/play/${game.id}`} className="flex-1">
                    <Button className="w-full gap-2">
                      <Play className="h-4 w-4" />
                      <span>Играть сейчас</span>
                    </Button>
                  </Link>
                </div>
                
                {isOwner && (
                  <div className="mt-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="details">Детали</TabsTrigger>
                        <TabsTrigger value="edit">Редактировать игру</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        {/* Контент отображается по умолчанию */}
                      </TabsContent>
                      <TabsContent value="edit">
                        <EditGameForm game={game} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                <div className="mt-8">
                  <CommentSection gameId={game.id} />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold mb-3">Информация об игре</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Разработчик: {developerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Выпущена: {new Date(game.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold mb-3">Как играть</h3>
                  <p className="text-sm text-muted-foreground">
                    Эта игра запускается прямо в вашем браузере с использованием Unity WebGL. Загрузка не требуется.
                    Нажмите "Играть сейчас", чтобы начать игру немедленно.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetails;
