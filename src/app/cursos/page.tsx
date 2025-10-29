"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Filter } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/Loading";
import { Course } from "@/components";
import { Course as CourseType, fetchCourses } from "@/lib/courses";

export default function CoursesPage() {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [levelFilter, setLevelFilter] = useState("Todos");
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Todos", "Salsa", "Bachata", "Kizomba"];
  const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"];

  useEffect(() => {
    fetchCourses(setCourses, setLoading);
  }, []);

  const filteredCourses = courses.filter((course) => {
    const categoriaMatch =
      categoryFilter === "Todos" || course.category === categoryFilter;
    const nivelMatch = levelFilter === "Todos" || course.level === levelFilter;
    return categoriaMatch && nivelMatch;
  });

  if (loading) {
    return <Loading message="Cargando cursos..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mt-24 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Nuestros <span className="text-primary">Cursos</span> de Baile
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Descubre la variedad de estilos de baile que ofrecemos. Desde
              principiantes hasta avanzados.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Filtrar por:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Categoría:</span>
              {categories.map((categoria) => (
                <Button
                  key={categoria}
                  variant={categoryFilter === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(categoria)}
                  className={
                    categoryFilter === categoria
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {categoria}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Nivel:</span>
              {levels.map((nivel) => (
                <Button
                  key={nivel}
                  variant={levelFilter === nivel ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLevelFilter(nivel)}
                  className={
                    levelFilter === nivel
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {nivel}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="cursos" className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Course key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && !loading && (
            <div className="text-center py-12 ">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron cursos
              </h3>
              <p className="text-muted-foreground">
                Intenta cambiar los filtros para ver más opciones disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center ">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            ¿No encuentras el curso que buscas?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Contáctanos y cuéntanos qué estilo de baile te interesa. Estamos
            siempre agregando nuevos cursos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contacto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                Contactar
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 bg-transparent"
              >
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
