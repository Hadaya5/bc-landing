import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  className?: string;
  type?: "h1" | "h2";
}
export function Title({ children, className, type = "h2" }: TitleProps) {
  if (type === "h2") {
    return (
      <h2 className={cn("text-4xl font-bold mb-4", className)}>{children}</h2>
    );
  }

  return (
    <h1
      className={cn(
        "text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance text-center",
        className
      )}
    >
      {children}
    </h1>
  );
}
