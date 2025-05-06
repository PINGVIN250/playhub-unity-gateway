
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

/**
 * Свойства компонента карточки аналитики
 * @property {string} title - Заголовок карточки
 * @property {string|number} value - Значение для отображения
 * @property {string} description - Дополнительное описание (опционально)
 * @property {ReactNode} icon - Иконка для карточки (опционально)
 */
interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

/**
 * Компонент карточки для отображения аналитической информации
 * Используется на вкладке аналитики в панели разработчика
 * 
 * @param {AnalyticsCardProps} props - Свойства компонента
 * @returns {JSX.Element} - Карточка с аналитическими данными
 */
export const AnalyticsCard = ({ title, value, description, icon }: AnalyticsCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
