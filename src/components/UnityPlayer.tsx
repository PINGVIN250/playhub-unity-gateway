
import { useEffect, useRef, useState } from "react";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize, Minimize, RefreshCw } from "lucide-react";

interface UnityPlayerProps {
  game: Game;
}

export function UnityPlayer({ game }: UnityPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating Unity WebGL loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [game.id]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);

    // Simulate reloading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={`unity-container glass-card relative overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50" : ""
        }`}
        style={{ 
          width: "100%", 
          aspectRatio: game.width && game.height 
            ? `${game.width}/${game.height}` 
            : "16/9" 
        }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Loading game... {Math.round(loadingProgress)}%
            </p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <p className="text-destructive mb-4">Error loading game: {error}</p>
            <Button onClick={handleReload} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <iframe
              src={game.gameUrl}
              className="absolute inset-0 w-full h-full border-0"
              title={game.title}
              allow="autoplay; fullscreen; microphone; gamepad; accelerometer; gyroscope; camera"
            />
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-background/50 backdrop-blur-md hover:bg-background/70"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-background/50 backdrop-blur-md hover:bg-background/70"
                onClick={handleReload}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
