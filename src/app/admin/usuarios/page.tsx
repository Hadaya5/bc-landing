"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { ArrowLeft } from "lucide-react";

export default function AdminUsersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  // Show loading while checking auth state
  if (loading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // Don't show content if user is not authenticated
  if (!user) {
    return null;
  }

  const handleUserCreated = () => {
    // Usuario creado exitosamente, redirigir al panel admin
    router.push("/admin");
  };

  const handleBackToAdmin = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToAdmin}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Panel
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Registrar Nuevo Usuario
              </h1>
              <p className="text-xl text-muted-foreground">
                Crear un nuevo administrador para el sistema
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <RegisterForm onSuccess={handleUserCreated} />
          </div>
        </div>
      </section>
    </div>
  );
}
