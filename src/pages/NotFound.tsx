
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  // Логирование ошибки 404 при попытке доступа к несуществующему маршруту
  useEffect(() => {
    console.error(
      "Ошибка 404: Пользователь попытался получить доступ к несуществующему маршруту:",
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
        <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            <span>Вернуться на главную</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
