import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { Course as CourseProps } from "@/app/cursos/page";
import Link from "next/link";

export function Course({ course }: { course: CourseProps }) {
  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <Card
      key={course.id}
      className=" bg-card border-border hover:shadow-lg transition-all duration-300"
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
        </div>

        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 text-pretty">
          {course.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Instructor: {course.instructor}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Categoría: {course.category}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${course.price}
          </span>
          <Link href="/#contacto">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contáctanos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
