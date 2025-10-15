"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Clock, Users, Star, Filter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Loading from "@/components/Loading";

interface Curso {
  id: string;
  title: string;
  instructor: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

const categorias = ["Todos", "Salsa", "Bachata", "Kizomba"];
const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];

export default function CursosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCursos();
  }, []);

  const cursosFiltrados = cursos.filter((curso) => {
    const categoriaMatch =
      filtroCategoria === "Todos" || curso.category === filtroCategoria;
    const nivelMatch = filtroNivel === "Todos" || curso.level === filtroNivel;
    return categoriaMatch && nivelMatch;
  });

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
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={
                    filtroCategoria === categoria ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setFiltroCategoria(categoria)}
                  className={
                    filtroCategoria === categoria
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
              {niveles.map((nivel) => (
                <Button
                  key={nivel}
                  variant={filtroNivel === nivel ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFiltroNivel(nivel)}
                  className={
                    filtroNivel === nivel
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {cursosFiltrados.map((curso, index) => (
              <Card
                key={curso.id}
                className=" bg-card border-border hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={getNivelColor(curso.level)}>
                      {curso.level}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-accent text-accent mr-1" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {curso.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {curso.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Instructor: {curso.instructor}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {curso.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Categoría: {curso.category}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${curso.price}
                    </span>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Inscribirse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cursosFiltrados.length === 0 && !loading && (
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
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
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
