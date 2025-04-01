import { useState } from "react";
import { useRatings } from "@/contexts/RatingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Star } from "lucide-react";

interface RatingComponentProps {
  gameId: string;
  showCount?: boolean;
}

export function RatingComponent({ gameId, showCount = true }: RatingComponentProps) {
  const { isAuthenticated } = useAuth();
  const { getGameRatings, getUserRating, getAverageRating, rateGame, deleteRating } = useRatings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  
  const userRating = getUserRating(gameId);
  const gameRatings = getGameRatings(gameId);
  const averageRating = getAverageRating(gameId);
  
  const handleRate = async (score: number) => {
    if (!isAuthenticated) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (userRating && userRating.score === score) {
        // If clicking the same rating, remove it
        await deleteRating(gameId);
      } else {
        // Otherwise set the new rating
        await rateGame(gameId, score);
      }
    } catch (error) {
      // Error is handled by the context
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = userRating ? userRating.score >= star : false;
          const isHovered = hoverRating >= star;
          
          return (
            <button
              key={star}
              type="button"
              disabled={isSubmitting || !isAuthenticated}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`transition-colors ${
                !isAuthenticated ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <Star
                className={`h-6 w-6 ${
                  isHovered || isActive
                    ? 'fill-yellow-400 text-yellow-400'
                    : averageRating >= star
                    ? 'fill-yellow-400/40 text-yellow-400/40'
                    : 'fill-none text-muted-foreground'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      
      {showCount && (
        <div className="text-sm text-muted-foreground">
          {gameRatings.length > 0 ? (
            <span>
              {averageRating.toFixed(1)} ({gameRatings.length} {gameRatings.length === 1 ? 'rating' : 'ratings'})
            </span>
          ) : (
            <span>No ratings yet</span>
          )}
        </div>
      )}
      
      {!isAuthenticated && showCount && (
        <div className="text-xs text-muted-foreground">
          <a href="/login" className="text-primary hover:underline">Sign in</a> to rate
        </div>
      )}
    </div>
  );
}
