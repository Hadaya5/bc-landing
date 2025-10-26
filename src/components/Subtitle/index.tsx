import { cn } from "@/lib/utils";

interface SubtitleProps {
  text: string;
  className?: string;
}
export function Subtitle({ text, className }: SubtitleProps) {
  return (
    <p className={cn("text-xl text-pretty max-w-2xl mx-auto", className)}>
      {text}
    </p>
  );
}
