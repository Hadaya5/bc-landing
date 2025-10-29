"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Music,
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  Save,
  X,
  UserPlus,
} from "lucide-react";
import Loading from "@/components/Loading";
import {
  Course,
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from "@/lib/courses";
import { Course as CourseCard } from "@/components";

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: "",
    instructor: "",
    level: "Principiante",
    duration: "",
    price: 0,
    description: "",
    category: "",
  });

  const categories = ["Salsa", "Bachata", "Merengue"];
  const levels: ("Principiante" | "Intermedio" | "Avanzado")[] = [
    "Principiante",
    "Intermedio",
    "Avanzado",
  ];

  useEffect(() => {
    fetchCourses(setCourses, setLoading);
  }, []);

  const handleInputChange = (field: keyof Course, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = formData as Omit<Course, "id">;
    let success = false;

    if (courseToEdit && courseToEdit.id) {
      success = await updateCourse(
        courseToEdit.id,
        formData,
        setCourses,
        setLoading
      );
    } else {
      success = await createCourse(courseData, setCourses);
    }

    if (success) {
      setFormData({
        title: "",
        instructor: "",
        level: "Principiante",
        duration: "",
        price: 0,
        description: "",
        category: "",
      });
      setCourseToEdit(null);
      setIsDialogOpen(false);
    }
  };

  const handleEdit = (curso: Course) => {
    setCourseToEdit(curso);
    setFormData(curso);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      await deleteCourse(id, setCourses);
    }
  };

  const handleNewCourse = () => {
    setCourseToEdit(null);
    setFormData({
      title: "",
      instructor: "",
      level: "Principiante",
      duration: "",
      price: 0,
      description: "",
      category: "",
    });
    setIsDialogOpen(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
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

  if (loading) {
    return <Loading message="Cargando panel administrativo..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Panel Administrativo
              </h1>
              <p className="text-xl text-muted-foreground">
                Gestiona los cursos de baile de Baila Ciencias
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Button
                onClick={handleNewCourse}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Curso
              </Button>
              <Button
                onClick={() => (window.location.href = "/admin/usuarios")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registrar Usuario
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Management */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                mode="admin"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {courses.length === 0 && !loading && (
            <div className="text-center py-12 ">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No hay cursos creados
              </h3>
              <p className="text-muted-foreground mb-4">
                Comienza creando tu primer curso de baile.
              </p>
              <Button
                onClick={handleNewCourse}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Curso
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Course Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {courseToEdit ? "Editar Curso" : "Crear Nuevo Curso"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Nombre del Curso</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ej: Salsa Principiantes"
                  required
                />
              </div>

              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor || ""}
                  onChange={(e) =>
                    handleInputChange("instructor", e.target.value)
                  }
                  placeholder="Ej: María González"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category || ""}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Nivel</Label>
                <Select
                  value={formData.level || "Principiante"}
                  onValueChange={(value) => handleInputChange("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "price",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="150"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="duration">Duración</Label>
              <Input
                id="duration"
                value={formData.duration || ""}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="Ej: 8 semanas"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe el curso..."
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                {courseToEdit ? "Guardar Cambios" : "Crear Curso"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
