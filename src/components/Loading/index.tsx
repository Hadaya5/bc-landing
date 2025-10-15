import { Logo } from "../Logo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Logo />
        </div>
        <p className="text-muted-foreground">Cargando cursos...</p>
      </div>
    </div>
  );
}
