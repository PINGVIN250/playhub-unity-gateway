
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Gamepad, ChevronRight } from "lucide-react";

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1597343256239-a7bf47132ef8?q=80&w=1469&auto=format&fit=crop"
          alt="Game development background"
          className="object-cover w-full h-full opacity-20"
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad className="text-primary h-6 w-6" />
              <h2 className="text-sm uppercase tracking-wider font-semibold">
                Платформа Unity Игр
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Покажите свои <span className="text-primary">Unity игры</span> миру
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Создавайте, делитесь и играйте в удивительные игры Unity WebGL. Присоединяйтесь к нашей 
              платформе, чтобы показать свои творения и открыть для себя игры талантливых разработчиков.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg" className="gap-2">
                      Ваша панель
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/games">
                    <Button variant="outline" size="lg">
                      Смотреть игры
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="gap-2">
                      Начать
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Войти
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
