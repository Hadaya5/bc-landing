import { Music } from "lucide-react";
import React from "react";

export function Footer() {
  const currentDate = new Date();
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            Baila Ciencias
          </span>
        </div>
        <p className="text-muted-foreground">
          © {currentDate.getFullYear()} Baila Ciencias. Transformando la
          educación a través del movimiento y la creatividad.
        </p>
      </div>
    </footer>
  );
}
