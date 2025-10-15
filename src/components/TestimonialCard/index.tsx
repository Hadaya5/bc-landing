import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  initials: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  name,
  role,
  testimonial,
  initials,
  rating = 5,
  className = "",
}: TestimonialCardProps) {
  return (
    <Card
      className={`animate-on-scroll bg-card border-border md:w-[40%] lg:w-[30%] ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
            <span className="text-primary font-semibold">{initials}</span>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-pretty">"{testimonial}"</p>
        <div className="flex mt-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
