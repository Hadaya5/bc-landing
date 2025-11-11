"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, usePathname } from "next/navigation";
import { Logo } from "../../Logo";

export function Navbar() {
  const { user, signOut } = useAuth();
  const currentPathname = usePathname();

  if (user && currentPathname.startsWith("/admin")) {
    return (
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al sitio
            </Link>
            <Button
              onClick={() => {
                signOut();
                redirect("/");
              }}
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
        <div className="container mx-auto px-4 py-4 flex items-center relative">
          <Logo />
          <div className="flex justify-end sm:justify-center w-full sm:w-[calc(100%-140px)] space-x-3 sm:space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/cursos"
              className="text-foreground hover:text-primary transition-colors"
            >
              Cursos
            </Link>
            <Link
              href="/#contacto"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
