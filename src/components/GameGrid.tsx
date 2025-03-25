
import { Game } from "@/types";
import { GameCard } from "./GameCard";

interface GameGridProps {
  games: Game[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

export function GameGrid({ 
  games, 
  columns = 3, 
  emptyMessage = "No games found" 
}: GameGridProps) {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
