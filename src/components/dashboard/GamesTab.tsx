
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { GameGrid } from "@/components/GameGrid";
import { Game } from "@/types";

interface GamesTabProps {
  isLoading: boolean;
  userGames: Game[];
}

export const GamesTab = ({ isLoading, userGames }: GamesTabProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card animate-pulse">
            <div className="aspect-video bg-muted/50 rounded-t-md"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-muted/50 rounded w-3/4"></div>
              <div className="h-4 bg-muted/50 rounded w-full"></div>
              <div className="h-4 bg-muted/50 rounded w-5/6"></div>
              <div className="pt-2 flex justify-between gap-2">
                <div className="h-9 bg-muted/50 rounded w-full"></div>
                <div className="h-9 bg-muted/50 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (userGames.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Upload className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Пока нет игр</h3>
        <p className="text-muted-foreground mb-6">
          Вы еще не загрузили ни одной игры. Начните демонстрировать свои творения на Unity!
        </p>
        <Link to="/upload">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Добавить вашу первую игру</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <GameGrid games={userGames} columns={3} emptyMessage="Вы еще не загрузили ни одной игры." />;
};
