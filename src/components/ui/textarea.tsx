
import * as React from "react"
import { cn } from "@/lib/utils"
import "@/types/unity" // Импортируем типы Unity

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onFocus, onBlur, onClick, onKeyDown, ...props }, ref) => {
    
    // Обработчик фокуса с отключением ввода Unity
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        console.log("Textarea получила фокус, отключаем ввод Unity");
        if (window.unityInstance) {
          window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "false");
          window.unityInputDisabled = true;
        }
      } catch (error) {
        console.error("Error disabling Unity input:", error);
      }
      
      // Вызываем оригинальный обработчик
      onFocus?.(e);
    };
    
    // Обработчик потери фокуса с включением ввода Unity
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      // Если перешли на другой элемент формы, не включаем ввод Unity
      const relatedTarget = e.relatedTarget as HTMLElement;
      const isStillInForm = 
        relatedTarget && 
        (relatedTarget.tagName === "TEXTAREA" ||
         relatedTarget.tagName === "INPUT" || 
         relatedTarget.tagName === "BUTTON" && 
         relatedTarget.closest(".comment-textarea-container"));
      
      if (!isStillInForm) {
        try {
          console.log("Textarea потеряла фокус, включаем ввод Unity");
          if (window.unityInstance) {
            window.unityInstance.SendMessage("GameManager", "SetInputEnabled", "true");
            window.unityInputDisabled = false;
          }
        } catch (error) {
          console.error("Error enabling Unity input:", error);
        }
      }
      
      // Вызываем оригинальный обработчик
      onBlur?.(e);
    };
    
    // Предотвращаем всплытие события клика
    const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
      e.stopPropagation();
      onClick?.(e);
    };
    
    // Обработчик нажатия клавиш
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Предотвращаем всплытие события нажатия клавиш в Unity
      e.stopPropagation();
      
      // Вызываем оригинальный обработчик
      onKeyDown?.(e);
    };
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
