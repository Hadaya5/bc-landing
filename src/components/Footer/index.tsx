import { Music } from "lucide-react";
import React from "react";
import { Logo } from "../Logo";

export function Footer() {
  const currentDate = new Date();
  return (
    <footer className="py-4 px-4 border-t border-border">
      <div className="container mx-auto text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="text-muted-foreground mt-1">
          © {currentDate.getFullYear()} Baila Ciencias. Transformando la
          educación a través del movimiento y la creatividad.
        </p>
      </div>
    </footer>
  );
}
