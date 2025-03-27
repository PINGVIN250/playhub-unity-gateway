
import { useEffect, useRef, useState } from "react";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize, Minimize, RefreshCw } from "lucide-react";

interface UnityPlayerProps {
  game: Game;
}

export function UnityPlayer({ game }: UnityPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const unityInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading state when game changes
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);
    
    const loadUnityGame = async () => {
      try {
        // Check if we have game files to load
        if (game.gameFiles && (
          game.gameFiles.wasmPath || 
          game.gameFiles.dataPath || 
          game.gameFiles.frameworkPath || 
          game.gameFiles.loaderPath
        )) {
          console.log("Loading Unity game from files:", game.gameFiles);
          
          // We need a script loader function
          const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = src;
              script.onload = () => resolve();
              script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
              document.body.appendChild(script);
            });
          };
          
          // Create a Unity loader script if needed
          if (game.gameFiles.loaderPath) {
            try {
              await loadScript(game.gameFiles.loaderPath);
              console.log("Unity loader script loaded");
              
              // Create a Unity config for the container
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
                
                // Clear the container and add the canvas
                if (containerRef.current) {
                  containerRef.current.innerHTML = '';
                  containerRef.current.appendChild(canvas);
                  
                  // Load Unity game
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
          // If we have a direct URL to the game, use iframe (fallback)
          console.log("Using direct game URL:", game.gameUrl);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
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

    // Load the game
    loadUnityGame();
    
    // Cleanup function
    return () => {
      // Destroy Unity instance if it exists
      if (unityInstanceRef.current) {
        try {
          unityInstanceRef.current.Quit();
          unityInstanceRef.current = null;
        } catch (error) {
          console.error("Error destroying Unity instance:", error);
        }
      }
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
    // Reset loading state
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);
    
    // Destroy current Unity instance if it exists
    if (unityInstanceRef.current) {
      try {
        unityInstanceRef.current.Quit();
        unityInstanceRef.current = null;
      } catch (error) {
        console.error("Error destroying Unity instance:", error);
      }
    }
    
    // Reload the iframe if using direct URL
    if (iframeRef.current && game.gameUrl) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    } else {
      // Re-trigger the useEffect to reload the Unity game
      const gameId = game.id;
      setTimeout(() => {
        setIsLoading(true);
      }, 0);
    }
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
            {game.gameUrl && !game.gameFiles?.indexPath && (
              <iframe
                ref={iframeRef}
                src={game.gameUrl}
                className="absolute inset-0 w-full h-full border-0"
                title={game.title}
                allow="autoplay; fullscreen; microphone; gamepad; accelerometer; gyroscope; camera"
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
              />
            )}
            
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

// Add type declaration for Unity functions
declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: any,
      onProgress?: (progress: number) => void
    ) => Promise<any>;
  }
}
