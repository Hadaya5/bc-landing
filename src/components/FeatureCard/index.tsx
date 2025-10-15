import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: "primary" | "accent";
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "primary",
  className = "",
}: FeatureCardProps) {
  const iconBgColor =
    iconColor === "primary" ? "bg-primary/10" : "bg-accent/10";
  const iconTextColor =
    iconColor === "primary" ? "text-primary" : "text-accent";

  return (
    <Card
      className={`animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <CardContent className="p-6 text-center">
        <div
          className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-8 h-8 ${iconTextColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-pretty">{description}</p>
      </CardContent>
    </Card>
  );
}
