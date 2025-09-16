"use client";

import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { user, signOut } = useAuth();
  const currentPathname = usePathname();
  console.log(currentPathname);

  if (user && currentPathname.startsWith("/admin")) {
    return (
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Baila Ciencias - Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al sitio
            </Link>
            <Button
              onClick={signOut}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Baila Ciencias
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#inicio"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </a>
            <a
              href="/cursos"
              className="text-foreground hover:text-primary transition-colors"
            >
              Cursos
            </a>
            <a
              href="#caracteristicas"
              className="text-foreground hover:text-primary transition-colors"
            >
              Características
            </a>
            <a
              href="#testimonios"
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonios
            </a>
            <a
              href="#contacto"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </a>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Comenzar
          </Button>
        </div>
      </nav>
    );
  }
}
