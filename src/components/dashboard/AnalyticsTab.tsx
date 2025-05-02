
import { AnalyticsCard } from "./AnalyticsCard";
import { MonthlyViewsChart } from "./MonthlyViewsChart";
import { Activity, BarChart, Star } from "lucide-react";

interface AnalyticsTabProps {
  totalViews: number;
  userGameCount: number;
  percentile: number;
  averageRating: number;
  monthlyViews: number[];
}

export const AnalyticsTab = ({ 
  totalViews, 
  userGameCount, 
  percentile, 
  averageRating,
  monthlyViews 
}: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard 
          title="Всего просмотров"
          value={totalViews.toLocaleString()}
          description="За все время"
          icon={<Activity className="h-4 w-4" />}
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
      
      <MonthlyViewsChart monthlyViews={monthlyViews} />
    </div>
  );
};
