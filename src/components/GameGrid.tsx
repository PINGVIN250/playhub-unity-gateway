
import { Game } from "@/types";
import { GameCard } from "./GameCard";

/**
 * Компонент для отображения сетки игр
 * Представляет игры в виде сетки с адаптивным дизайном
 * 
 * @param {object} props - Свойства компонента
 * @param {Game[]} props.games - Массив игр для отображения
 * @param {2|3|4} [props.columns=3] - Количество колонок в сетке
 * @param {string} [props.emptyMessage="No games found"] - Сообщение при отсутствии игр
 */
export function GameGrid({ 
  games, 
  columns = 3, 
  emptyMessage = "No games found" 
}: GameGridProps) {
  /**
   * Определяет классы для сетки в зависимости от количества колонок
   * @returns {string} Классы CSS для элемента сетки
   */
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

  // Если нет игр для отображения, показываем сообщение
  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-center">{emptyMessage}</p>
      </div>
    );
  }

  // Отображаем сетку игр
  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

/**
 * Типы свойств компонента GameGrid
 */
interface GameGridProps {
  games: Game[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}
