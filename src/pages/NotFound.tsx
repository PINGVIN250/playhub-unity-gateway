
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 sm:p-12 max-w-md text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-muted/50 mb-6">
          <Gamepad className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
