import { useEffect, useRef, useState } from "react";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, Minimize2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UnityPlayerProps {
  game: Game;
}

export function UnityPlayer({ game }: UnityPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const unityInstanceRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const clearContainer = () => {
    if (!containerRef.current) return;
    
    const children = Array.from(containerRef.current.children);
    
    children.forEach(child => {
      try {
        if (containerRef.current?.contains(child)) {
          containerRef.current.removeChild(child);
        }
      } catch (e) {
        console.error("Error removing child:", e);
      }
    });
  };

  const destroyUnityInstance = () => {
    if (unityInstanceRef.current) {
      try {
        console.log("Attempting to quit Unity instance");
        unityInstanceRef.current.Quit();
      } catch (error) {
        console.error("Error quitting Unity instance:", error);
      } finally {
        unityInstanceRef.current = null;
        console.log("Unity instance reference cleared");
      }
    }
  };

  const loadUnityGame = async () => {
    try {
      destroyUnityInstance();
      clearContainer();
      
      if (game.gameFiles && (
        game.gameFiles.wasmPath || 
        game.gameFiles.dataPath || 
        game.gameFiles.frameworkPath || 
        game.gameFiles.loaderPath
      )) {
        console.log("Loading Unity game from files:", game.gameFiles);
        
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.body.appendChild(script);
          });
        };
        
        if (game.gameFiles.loaderPath) {
          try {
            await loadScript(game.gameFiles.loaderPath);
            console.log("Unity loader script loaded");
            
            if (typeof window.createUnityInstance === 'function') {
              const config = {
                dataUrl: game.gameFiles.dataPath,
                frameworkUrl: game.gameFiles.frameworkPath,
                codeUrl: game.gameFiles.wasmPath,
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Unity Developer",
                productName: game.title,
                productVersion: "1.0",
              };
              
              const canvas = document.createElement('canvas');
              canvas.style.width = '100%';
              canvas.style.height = '100%';
              canvas.id = 'unity-canvas';
              canvasRef.current = canvas;
              
              if (containerRef.current) {
                clearContainer();
                containerRef.current.appendChild(canvas);
                
                try {
                  window.createUnityInstance(canvas, config, (progress: number) => {
                    setLoadingProgress(progress * 100);
                  }).then((unityInstance: any) => {
                    unityInstanceRef.current = unityInstance;
                    setIsLoading(false);
                  }).catch((error: Error) => {
                    console.error("Unity instance creation error:", error);
                    setError(`Failed to create Unity instance: ${error.message}`);
                    setIsLoading(false);
                  });
                } catch (error) {
                  console.error("Error during Unity initialization:", error);
                  setError(`Error initializing Unity: ${error instanceof Error ? error.message : String(error)}`);
                  setIsLoading(false);
                }
              }
            } else {
              console.error("createUnityInstance function not found");
              setError("Unity loader is missing or incorrect");
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error loading Unity loader script:", error);
            setError(`Failed to load Unity engine: ${error instanceof Error ? error.message : String(error)}`);
            setIsLoading(false);
          }
        } else {
          console.error("No Unity loader script provided");
          setError("Missing Unity loader script");
          setIsLoading(false);
        }
      } else if (game.gameUrl) {
        console.log("Using direct game URL:", game.gameUrl);
        
        if (containerRef.current) {
          clearContainer();
          
          const iframe = document.createElement('iframe');
          iframe.src = game.gameUrl;
          iframe.className = "absolute inset-0 w-full h-full border-0";
          iframe.title = game.title;
          iframe.allow = "autoplay; fullscreen; microphone; gamepad; accelerometer; gyroscope; camera";
          
          const sandboxValues = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
          iframe.setAttribute("sandbox", sandboxValues);
          
          iframeRef.current = iframe;
          
          containerRef.current.appendChild(iframe);
          
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      } else {
        console.error("No game files or URL provided");
        setError("No game files or URL provided");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error loading game:", error);
      setError(`Error loading game: ${error instanceof Error ? error.message : String(error)}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);
    
    loadUnityGame();
    
    return () => {
      console.log("Cleanup running for game ID:", game.id);
      destroyUnityInstance();
      
      canvasRef.current = null;
      
      iframeRef.current = null;
    };
  }, [game.id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).mozRequestFullScreen) {
        (containerRef.current as any).mozRequestFullScreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        (containerRef.current as any).msRequestFullscreen();
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

  const handleReload = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);
    
    toast({
      title: "Reloading game",
      description: "Please wait while the game reloads...",
      duration: 3000,
    });
    
    setTimeout(() => {
      loadUnityGame();
    }, 100);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={`unity-container relative overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 border-0 m-0 p-0 bg-black" : "glass-card"
        }`}
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
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-background/50 backdrop-blur-md hover:bg-background/70"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-background/50 backdrop-blur-md hover:bg-background/70"
              onClick={handleReload}
              title="Reload Game"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: any,
      onProgress?: (progress: number) => void
    ) => Promise<any>;
  }
}
