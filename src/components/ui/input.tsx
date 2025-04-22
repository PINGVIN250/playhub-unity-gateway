
import * as React from "react"
import { cn } from "@/lib/utils"
import "@/types/unity" // Импортируем типы Unity

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onFocus, onBlur, onClick, ...props }, ref) => {
    
    // Обработчик фокуса с отключением ввода Unity
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      try {
        if (window.unityInstance) {
          window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "false");
        }
      } catch (error) {
        console.error("Error disabling Unity input:", error);
      }
      
      // Вызываем оригинальный обработчик
      onFocus?.(e);
    };
    
    // Обработчик потери фокуса с включением ввода Unity
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      try {
        if (window.unityInstance) {
          window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "true");
        }
      } catch (error) {
        console.error("Error enabling Unity input:", error);
      }
      
      // Вызываем оригинальный обработчик
      onBlur?.(e);
    };
    
    // Предотвращаем всплытие события клика
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onClick?.(e);
    };
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
