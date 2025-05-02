
import { AnalyticsCard } from "./AnalyticsCard";
import { Activity, BarChart, Star, Users } from "lucide-react";

interface AnalyticsTabProps {
  totalViews: number;
  userGameCount: number;
  percentile: number;
  averageRating: number;
  authUserViews: number;
}

export const AnalyticsTab = ({ 
  totalViews, 
  userGameCount, 
  percentile, 
  averageRating,
  authUserViews
}: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Всего просмотров"
          value={totalViews.toLocaleString()}
          description="За все время"
          icon={<Activity className="h-4 w-4" />}
        />
        
        <AnalyticsCard 
          title="Авторизованные просмотры"
          value={authUserViews.toLocaleString()}
          description="Просмотры авторизованными пользователями"
          icon={<Users className="h-4 w-4" />}
        />
        
        <AnalyticsCard 
          title="Ваши игры"
          value={userGameCount}
          description={`Больше чем у ${100 - percentile}% разработчиков`}
          icon={<BarChart className="h-4 w-4" />}
        />
        
        <AnalyticsCard 
          title="Средний рейтинг"
          value={averageRating}
          description="На основе всех игр"
          icon={<Star className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};
