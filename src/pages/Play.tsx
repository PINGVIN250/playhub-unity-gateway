
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
import { ChevronLeft, Clock, Maximize2, User } from "lucide-react";
import { CommentSection } from "@/components/CommentSection";
import { RatingComponent } from "@/components/RatingComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Play = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { getGameById, games } = useGames();
  const { user } = useAuth();
  const [relatedGames, setRelatedGames] = useState<typeof games>([]);
  const [activeTab, setActiveTab] = useState("about");
  const [fullscreenRef, setFullscreenRef] = useState<HTMLDivElement | null>(null);
  
  const game = getGameById(gameId || "");
  const isOwner = user && game && user.id === game.authorId;
  
  useEffect(() => {
    if (game && games.length > 0) {
      // Get games with similar tags or by the same author
      const similar = games.filter(g => 
        g.id !== game.id && (
          g.authorId === game.authorId ||
          g.tags?.some(tag => game.tags?.includes(tag))
        )
      ).slice(0, 3);
      
      setRelatedGames(similar);
    }
  }, [game, games]);
  
  const handleFullscreen = () => {
    if (!fullscreenRef) return;
    
    if (!document.fullscreenElement) {
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
  
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <Navbar />
        <main className="flex-1 py-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The game you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/games">
              <Button>Browse Games</Button>
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
                <span>Back to Games</span>
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <RatingComponent gameId={game.id} showCount={false} />
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">By {game.author?.username || "Unknown"}</span>
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
              <div className="glass-card overflow-hidden">
                <div className="relative" ref={setFullscreenRef}>
                  <UnityPlayer game={game} />
                  
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="absolute top-4 right-4 bg-background/50 backdrop-blur-md hover:bg-background/70 gap-2"
                    onClick={handleFullscreen}
                  >
                    <Maximize2 className="h-4 w-4" />
                    <span>Fullscreen</span>
                  </Button>
                </div>
                
                <div className="p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="pt-4">
                      <h2 className="text-xl font-bold mb-4">About This Game</h2>
                      <p className="text-muted-foreground">{game.description}</p>
                    </TabsContent>
                    
                    <TabsContent value="comments" className="pt-4">
                      <CommentSection gameId={game.id} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4">Game Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Developer</h3>
                    <p>{game.author?.username || "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
                    <p>{new Date(game.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                    <RatingComponent gameId={game.id} />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Platform</h3>
                    <p>Unity WebGL</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Controls</h3>
                    <p>Mouse and Keyboard</p>
                  </div>
                </div>
              </div>
              
              {isOwner && (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold mb-4">Manage Game</h2>
                  <div className="space-y-2">
                    <Link to={`/games/${game.id}`}>
                      <Button variant="outline" className="w-full justify-start">
                        Edit Game
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              
              {relatedGames.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold mb-4">Related Games</h2>
                  
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Play;
