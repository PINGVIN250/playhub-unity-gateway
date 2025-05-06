
import { AnalyticsCard } from "./AnalyticsCard";
import { Activity, BarChart, Star, Users } from "lucide-react";

/**
 * Свойства компонента вкладки аналитики
 * @property {number} totalViews - Общее количество просмотров
 * @property {number} userGameCount - Количество игр пользователя
 * @property {number} percentile - Процентиль по количеству игр
 * @property {number} averageRating - Средний рейтинг игр
 * @property {number} authUserViews - Количество просмотров авторизованными пользователями
 */
interface AnalyticsTabProps {
  totalViews: number;
  userGameCount: number;
  percentile: number;
  averageRating: number;
  authUserViews: number;
}

/**
 * Компонент вкладки с аналитикой для панели разработчика
 * Отображает карточки с различными аналитическими показателями
 * 
 * @param {AnalyticsTabProps} props - Свойства компонента
 * @returns {JSX.Element} - Вкладка с аналитическими данными
 */
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
