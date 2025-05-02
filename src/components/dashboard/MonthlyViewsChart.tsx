
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface MonthlyViewsChartProps {
  monthlyViews: number[];
}

export const MonthlyViewsChart = ({ monthlyViews }: MonthlyViewsChartProps) => {
  const [maxViews, setMaxViews] = useState(100);
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
  
  // Calculate the max value for proper scaling
  useEffect(() => {
    if (monthlyViews.length > 0) {
      const max = Math.max(...monthlyViews);
      setMaxViews(max > 0 ? max : 100);
    }
  }, [monthlyViews]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Просмотры по месяцам</CardTitle>
        <CardDescription>
          Тенденции просмотров за последние 6 месяцев
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end gap-2">
          {monthlyViews.map((views, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div 
                className="w-full bg-primary/80 hover:bg-primary transition-all rounded-t"
                style={{ 
                  height: `${(views / maxViews) * 100}%`,
                }}
              />
              <div className="text-xs mt-2 text-muted-foreground">{months[i]}</div>
              
              {/* Tooltip showing exact number */}
              <div className="absolute bottom-full mb-2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {views} просмотров
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
