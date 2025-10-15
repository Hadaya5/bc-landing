"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
  Star,
  Save,
  X,
  UserPlus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Curso {
  id?: string;
  title: string;
  instructor: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
}

const categorias = [
  "Salsa",
  "Bachata",
  "Hip-Hop",
  "Contemporáneo",
  "Reggaeton",
  "Tango",
];
const niveles: ("Principiante" | "Intermedio" | "Avanzado")[] = [
  "Principiante",
  "Intermedio",
  "Avanzado",
];

export default function AdminPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [formData, setFormData] = useState<Partial<Curso>>({
    title: "",
    instructor: "",
    level: "Principiante",
    duration: "",
    price: 0,
    description: "",
    category: "",
  });

  const fetchCursos = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }
      console.log(data);
      setCursos(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData: Omit<Curso, "id">) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .insert([courseData])
        .select();

      if (error) {
        console.error("Error creating course:", error);
        return false;
      }

      if (data) {
        setCursos((prev) => [data[0], ...prev]);
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const updateCourse = async (id: string, courseData: Partial<Curso>) => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating course:", error);
        return false;
      }

      if (data) {
        setCursos((prev) =>
          prev.map((curso) => (curso.id === id ? data[0] : curso))
        );
      }
      setLoading(false);

      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) {
        console.error("Error deleting course:", error);
        return false;
      }

      setCursos((prev) => prev.filter((curso) => curso.id !== id));
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleInputChange = (field: keyof Curso, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = formData as Omit<Curso, "id">;
    let success = false;

    if (cursoEditando && cursoEditando.id) {
      success = await updateCourse(cursoEditando.id, formData);
    } else {
      success = await createCourse(courseData);
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
      setCursoEditando(null);
      setIsDialogOpen(false);
    }
  };

  const handleEdit = (curso: Curso) => {
    setCursoEditando(curso);
    setFormData(curso);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      await deleteCourse(id);
    }
  };

  const handleNewCourse = () => {
    setCursoEditando(null);
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

  const getNivelColor = (nivel: string) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">
            Cargando panel administrativo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

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

      {/* Stats Section */}
      <section className="pb-8 px-4 ">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Cursos
                    </p>
                    <p className="text-3xl font-bold text-card-foreground">
                      {cursos.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Precio Promedio
                    </p>
                    <p className="text-3xl font-bold text-card-foreground">
                      $
                      {cursos.length > 0
                        ? Math.round(
                            cursos.reduce((total, curso) => total + 1.1, 0) /
                              cursos.length
                          )
                        : 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Categorías
                    </p>
                    <p className="text-3xl font-bold text-card-foreground">
                      {new Set(cursos.map((curso) => curso.category)).size}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Management */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6">
            {cursos.map((curso) => (
              <Card key={curso.id} className=" bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-card-foreground">
                          {curso.title}
                        </h3>
                        <Badge className={getNivelColor(curso.level)}>
                          {curso.level}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-3">
                        {curso.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-primary" />
                          Instructor: {curso.instructor}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          {curso.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-primary" />
                          Categoría: {curso.category}
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-primary">
                            ${curso.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(curso)}
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => curso.id && handleDelete(curso.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cursos.length === 0 && !loading && (
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
              {cursoEditando ? "Editar Curso" : "Crear Nuevo Curso"}
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
                    {categorias.map((categoria) => (
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
                    {niveles.map((nivel) => (
                      <SelectItem key={nivel} value={nivel}>
                        {nivel}
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
                {cursoEditando ? "Guardar Cambios" : "Crear Curso"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
