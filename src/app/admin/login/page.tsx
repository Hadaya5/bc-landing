"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  // Show loading while checking auth state

  if (loading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // Don't show login form if user is authenticated
  if (user) {
    return null;
  }

  const handleAuthSuccess = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}
