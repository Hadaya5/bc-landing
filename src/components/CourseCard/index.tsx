import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Edit, Trash2 } from "lucide-react";
import { Course as CourseProps } from "@/lib/courses";
import Link from "next/link";

type CourseMode = "public" | "admin";

interface CourseCardProps {
  course: CourseProps;
  mode?: CourseMode;
  onEdit?: (course: CourseProps) => void;
  onDelete?: (id: string) => void;
}

export function CourseCard({
  course,
  mode = "public",
  onEdit,
  onDelete,
}: CourseCardProps) {
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

          {mode === "public" ? (
            <Link href="/#contacto">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contáctanos
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit && onEdit(course)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => course.id && onDelete && onDelete(course.id)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
