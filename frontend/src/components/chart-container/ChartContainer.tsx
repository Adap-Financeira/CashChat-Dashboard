import React from "react";

interface ChartContainerProps {
  title: string;
  isDataEmpty: boolean;
  children: React.ReactNode;
}

export function ChartContainer({ title, isDataEmpty, children }: ChartContainerProps) {
  return (
    // Here is our single source of truth for styling
    <div className="w-full lg:w-1/2 border p-4 flex items-center justify-center relative aspect-video min-h-[300px]">
      {isDataEmpty ? (
        // Centralized empty state message
        <div className="text-center">
          <p className="font-semibold text-muted-foreground absolute top-4 left-1/2 -translate-x-1/2">
            {title}
          </p>
          <p className="text-muted-foreground">Você ainda não tem dados para mostrar aqui.</p>
        </div>
      ) : (
        // If not empty, render the actual chart
        children
      )}
    </div>
  );
}