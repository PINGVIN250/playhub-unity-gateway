import { useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface GameCardProps {
  game: Game;
  variant?: "default" | "featured";
}

export function GameCard({ game, variant = "default" }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = variant === "featured";

  return (
    <Card
      className={`glass-card overflow-hidden transition-all duration-300 ${
        isHovered ? "transform scale-[1.02] shadow-md" : ""
      } ${isFeatured ? "h-full" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
            className={`object-cover w-full h-full transition-transform duration-700 ${
              isHovered ? "transform scale-105" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>
        
        <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
          {game.featured && (
            <Badge className="bg-primary text-white border-none">Featured</Badge>
          )}
          {game.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className={`pt-4 ${isFeatured ? "pb-0" : ""}`}>
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{game.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {game.description}
        </p>
      </CardContent>

      <CardFooter className={`flex justify-between gap-2 ${isFeatured ? "pt-0" : "pt-2"}`}>
        <a href={`/play/${game.id}`} className="flex-1">
          <Button className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
