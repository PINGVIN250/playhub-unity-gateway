
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyViewsChartProps {
  monthlyViews: number[];
}

export const MonthlyViewsChart = ({ monthlyViews }: MonthlyViewsChartProps) => {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
  
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
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary/80 hover:bg-primary transition-all rounded-t"
                style={{ 
                  height: `${Math.min(100, Math.max(5, views))}%`,
                }}
              ></div>
              <div className="text-xs mt-2 text-muted-foreground">{months[i]}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
