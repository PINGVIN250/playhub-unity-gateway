
import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageTitle({ title, description, children }: PageTitleProps) {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {children && <div className="mt-4 md:mt-0">{children}</div>}
      </div>
    </div>
  );
}
