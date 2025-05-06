
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UnityPlayer } from "@/components/UnityPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Clock, Heart, Maximize2, Minimize2, User } from "lucide-react";
import { CommentSection } from "@/components/CommentSection";
import { RatingComponent } from "@/components/RatingComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/**
 * Страница игры с возможностью её запуска
 * Отображает игру, её детали, комментарии и похожие игры
 */
const Play = () => {
  const { gameId } = useParams<{ gameId: string }>(); // Получение ID игры из URL
  const { getGameById, games, toggleFavorite, isFavorite } = useGames(); // Контекст игр
  const { user } = useAuth(); // Данные о пользователе
  const [relatedGames, setRelatedGames] = useState([]); // Состояние для похожих игр
  const [activeTab, setActiveTab] = useState("about"); // Активная вкладка
  const [fullscreenRef, setFullscreenRef] = useState(null); // Ссылка на элемент для полноэкранного режима
  const [isFullscreen, setIsFullscreen] = useState(false); // Состояние полноэкранного режима
  
  // Получаем данные об игре по её идентификатору
  const game = getGameById(gameId || "");
  const isOwner = user && game && user.id === game.authorId; // Проверка владельца игры
  const isFav = game ? isFavorite(game.id) : false; // Проверка на добавление в избранное
  
  /**
   * Записываем просмотр игры авторизованным пользователем
   */
  useEffect(() => {
    const recordGameView = async () => {
      // Проверяем, что пользователь авторизован и игра существует
      if (user && game && gameId) {
        try {
          // Добавляем запись о просмотре в базу данных
          // Благодаря UNIQUE(game_id, user_id) в таблице, каждый пользователь
          // будет учтен только один раз в статистике для каждой игры
          const { error } = await supabase
            .from('game_views')
            .upsert({
              game_id: gameId,
              user_id: user.id,
              viewed_at: new Date().toISOString() // Обновляем дату просмотра
            });

          if (error) {
            console.error("Ошибка при записи просмотра:", error);
          } else {
            console.log("Просмотр успешно записан для игры:", gameId);
          }
        } catch (error) {
          console.error("Ошибка при записи просмотра:", error);
        }
      }
    };

    recordGameView();
  }, [user, game, gameId]); // Зависимости для эффекта
  
  /**
   * Поиск похожих игр при загрузке игры
   * Теперь игры сортируются по приоритету:
   * 1. Сначала игры с наибольшим совпадением тегов
   * 2. Затем игры от того же автора
   */
  useEffect(() => {
    if (game && games.length > 0) {
      // Получаем все игры, исключая текущую
      const otherGames = games.filter(g => g.id !== game.id);
      
      // Добавляем счетчик совпадающих тегов к каждой игре
      const gamesWithTagMatches = otherGames.map(g => {
        // Подсчет количества совпадающих тегов
        const matchingTagsCount = game.tags?.filter(tag => g.tags?.includes(tag)).length || 0;
        // Определяем, является ли автор этой игры тем же, что и текущей
        const sameAuthor = g.authorId === game.authorId;
        
        return {
          ...g,
          matchingTagsCount,
          sameAuthor
        };
      });
      
      // Сортируем игры по количеству совпадающих тегов и тому же автору
      const sortedGames = gamesWithTagMatches.sort((a, b) => {
        // Сначала сортируем по количеству совпадающих тегов (в порядке убывания)
        if (b.matchingTagsCount !== a.matchingTagsCount) {
          return b.matchingTagsCount - a.matchingTagsCount;
        }
        // При равном количестве тегов сортируем по тому же автору
        if (a.sameAuthor !== b.sameAuthor) {
          return a.sameAuthor ? -1 : 1;
        }
        return 0;
      });
      
      // Фильтруем игры, которые имеют хотя бы один совпадающий тег или того же автора
      const similarGames = sortedGames.filter(g => g.matchingTagsCount > 0 || g.sameAuthor);
      
      // Берем первые 3 игры из отсортированного списка
      setRelatedGames(similarGames.slice(0, 3));
    }
  }, [game, games, gameId]); // Добавляем gameId в зависимости для обновления при смене игры
  
  /**
   * Отслеживание состояния полноэкранного режима
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    // Добавляем обработчики событий изменения полноэкранного режима для разных браузеров
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    
    // Очистка обработчиков при размонтировании компонента
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);
  
  /**
   * Управление полноэкранным режимом
   * Переключает игру между обычным и полноэкранным режимами
   */
  const handleFullscreen = () => {
    if (!fullscreenRef) return;
    
    if (!document.fullscreenElement) {
      // Запрос на переход в полноэкранный режим с учетом кросс-браузерности
      if (fullscreenRef.requestFullscreen) {
        fullscreenRef.requestFullscreen();
      } else if ((fullscreenRef as any).webkitRequestFullscreen) {
        (fullscreenRef as any).webkitRequestFullscreen();
      } else if ((fullscreenRef as any).mozRequestFullScreen) {
        (fullscreenRef as any).mozRequestFullScreen();
      } else if ((fullscreenRef as any).msRequestFullscreen) {
        (fullscreenRef as any).msRequestFullscreen();
      }
    } else {
      // Выход из полноэкранного режима с учетом кросс-браузерности
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };
  
  /**
   * Обработчик добавления/удаления игры из избранного
   */
  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Войдите в систему, чтобы добавить игру в избранное");
      return;
    }
    
    if (game) {
      await toggleFavorite(game.id);
    }
  };
  
  // Если игра не найдена, показываем сообщение об ошибке
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
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/games">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Назад к играм</span>
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">{game.title}</h1>
              <Button 
                variant={isFav ? "default" : "outline"}
                size="icon"
                className={`${isFav ? 'text-white bg-red-500 hover:bg-red-600' : 'text-red-500 hover:text-red-600'}`}
                onClick={handleToggleFavorite}
                title={isFav ? "Удалить из избранного" : "Добавить в избранное"}
              >
                <Heart className="h-5 w-5" fill={isFav ? "currentColor" : "none"} />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <RatingComponent gameId={game.id} showCount={false} />
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <Link to={`/user/${game.authorId}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Автор: {game.author?.username || "Неизвестно"}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{new Date(game.createdAt).toLocaleDateString()}</span>
              </div>
              {game.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div 
                className={`glass-card overflow-hidden border-0 ${
                  isFullscreen 
                    ? "fixed inset-0 z-50 p-0 m-0 bg-black flex items-center justify-center" 
                    : ""
                }`}
                ref={setFullscreenRef}
              >
                <div className={`relative ${isFullscreen ? "w-full h-full flex items-center justify-center" : ""}`}>
                  <div className={isFullscreen ? "w-full max-w-full mx-auto h-full flex items-center justify-center" : ""}>
                    <AspectRatio ratio={16 / 9} className={`w-full ${isFullscreen ? "h-full" : ""}`}>
                      <UnityPlayer game={game} />
                    </AspectRatio>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    <Button 
                      variant="secondary"
                      size="icon"
                      className="bg-background/50 backdrop-blur-md hover:bg-background/70 rounded-full"
                      onClick={handleFullscreen}
                      title={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {!isFullscreen && (
                  <div className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="about">Об игре</TabsTrigger>
                        <TabsTrigger value="comments">Комментарии</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="about" className="pt-4">
                        <h2 className="text-xl font-bold mb-4">Об этой игре</h2>
                        <p className="text-muted-foreground">{game.description}</p>
                      </TabsContent>
                      
                      <TabsContent value="comments" className="pt-4">
                        <CommentSection gameId={game.id} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
            
            {!isFullscreen && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold mb-4">Детали игры</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Разработчик</h3>
                      <p>
                        <Link to={`/user/${game.authorId}`} className="hover:text-primary transition-colors">
                          {game.author?.username || "Неизвестно"}
                        </Link>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Опубликовано</h3>
                      <p>{new Date(game.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Рейтинг</h3>
                      <RatingComponent gameId={game.id} />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Платформа</h3>
                      <p>Unity WebGL</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Управление</h3>
                      <p>Мышь и клавиатура</p>
                    </div>
                  </div>
                </div>
                
                {isOwner && (
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-4">Управление игрой</h2>
                    <div className="space-y-2">
                      <Link to={`/games/${game.id}`}>
                        <Button variant="outline" className="w-full justify-start">
                          Редактировать игру
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
                
                {relatedGames.length > 0 && (
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-4">Похожие игры</h2>
                    
                    <div className="space-y-4">
                      {relatedGames.map(relatedGame => (
                        <div key={relatedGame.id}>
                          <Link to={`/play/${relatedGame.id}`} className="group block">
                            <div className="flex gap-3">
                              <div className="w-20 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={relatedGame.coverImage} 
                                  alt={relatedGame.title}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                />
                              </div>
                              <div>
                                <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                                  {relatedGame.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {relatedGame.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {relatedGame !== relatedGames[relatedGames.length - 1] && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default Play;
