
import { GameGrid } from "@/components/GameGrid";
import { EmptyGameState } from "./EmptyGameState";
import { Game } from "@/types";

interface GamesTabProps {
  userGames: Game[];
  isLoading: boolean;
}

export function GamesTab({ userGames, isLoading }: GamesTabProps) {
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
    return <EmptyGameState />;
  }

  return (
    <GameGrid 
      games={userGames} 
      columns={3}
      emptyMessage="You haven't uploaded any games yet."
    />
  );
}
