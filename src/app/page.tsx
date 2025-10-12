"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Music,
  Users,
  BookOpen,
  Star,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { useIntersect, useIntersectElements } from "@/hooks/useIntersect";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/VideoPlayer";

export const experimental_ppr = true;

const DynamicVideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
  loading: () => <Skeleton className="h-[560px] w-[320px] rounded-2xl" />,
});

export default function HomePage() {
  const [textColor, setTextColor] = useState<
    "text-foreground" | "text-secondary"
  >("text-foreground");

  //Observer hook for background setting
  const {
    intersectionRef: featuresRef,
    isVisible: isTestimoniesSectionVisible,
  } = useIntersect(0.2, (isIntersecting) => {
    setTextColor(isIntersecting ? "text-secondary" : "text-foreground");
  });

  //Observer hook for home section
  const {
    intersectionRef: discoverSectionTef,
    isVisible: isDiscoverSectionVisible,
  } = useIntersect(0.01);

  //Observer videos hook
  const { intersectionRef: video1Ref, isVisible: video1IsVisible } =
    useIntersect(0.6);
  const { intersectionRef: video2Ref, isVisible: video2IsVisible } =
    useIntersect(0.6);
  const { intersectionRef: video3Ref, isVisible: video3IsVisible } =
    useIntersect(0.6);

  useIntersectElements(0.1, ".animate-on-scroll");

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500 ease-in",
        textColor,
        isTestimoniesSectionVisible ? "bg-primary" : "bg-background"
      )}
    >
      <div>
        <section
          id="inicio"
          className={cn(
            "h-screen pb-16 grid lg:grid-cols-2 items-center sticky top-0 bg-custom-gradient",
            isDiscoverSectionVisible && "animate-opacity-on-scroll"
          )}
        >
          <div className="container mx-auto mb-5 px-10 md:pr-0 max-w-2xl mt-20 lg:mt-0">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance text-center">
              Aprende a <span className="text-primary">Bailar</span> con{" "}
              <span className="text-accent">Pasión</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-justify text-pretty max-w-2xl mx-auto">
              Desde principiantes hasta avanzados, ofrecemos clases de Bachata,
              Salsa y Kizomba con profesores especializados. Aprende técnica,
              ritmo y estilo mientras disfrutas de un ambiente divertido y
              social.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <a href="/cursos">Ver Cursos</a>
              </Button>
            </div>
          </div>
          <div className="h-screen mt-15 ml-10 hidden lg:flex ">
            <img src="hero-image.png" />
          </div>
        </section>
        <section
          ref={discoverSectionTef}
          className={cn(
            "pb-5 md:pb-15 px-4 pt-5 h-full relative  bg-gray-300  transition-colors duration-500 ease-in",
            isTestimoniesSectionVisible && "bg-primary"
          )}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col justify-center items-center  sticky top-1 h-screen">
                <h2 className="text-4xl font-bold text-center">
                  Descubre el arte del baile con nuestros cursos de
                </h2>
                <div className="mt-10 text-xl text-center">
                  <p
                    className={cn(
                      video1IsVisible && "transition-transform scale-150 ml-4"
                    )}
                  >
                    <span className="text-secondary font-semibold">
                      Bachata
                    </span>
                    , para los más románticos
                  </p>
                  <p
                    className={cn(
                      "my-3",
                      video2IsVisible && "transition-transform scale-150 ml-4"
                    )}
                  >
                    <span className="text-secondary font-semibold">Salsa</span>,
                    llena de sabor
                  </p>
                  <p
                    className={cn(
                      video3IsVisible && "transition-transform scale-150 ml-4"
                    )}
                  >
                    <span className="text-secondary font-semibold">
                      Kizomba
                    </span>
                    , conexión y flow
                  </p>
                </div>
                <div className="md:hidden h-fit z-[60] pt-5 flex justify-center items-start animate-scale-on-scroll">
                  <VideoPlayer
                    width={200}
                    className="rounded-2xl"
                    src="/bachataVideo.mp4"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div
                  ref={video1Ref}
                  className="h-fit z-[60] flex justify-center items-start  animate-scale-on-scroll"
                >
                  <DynamicVideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="/bachataVideo.mp4"
                  />
                </div>
                <div
                  ref={video2Ref}
                  className="h-fit my-5 flex justify-center items-center  animate-scale-on-scroll"
                >
                  <DynamicVideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="/bachataVideo.mp4"
                  />
                </div>
                <div
                  ref={video3Ref}
                  className="h-fit flex justify-center items-end  animate-scale-on-scroll"
                >
                  <DynamicVideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="/bachataVideo.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div ref={featuresRef}>
        <section
          id="caracteristicas"
          className="py-16 px-4 z-50 transition-colors duration-200 ease-in"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className={cn("text-4xl font-bold mb-4", textColor)}>
                ¿Por qué elegir Baila Ciencias?
              </h2>
              <p
                className={cn(
                  "text-xl max-w-2xl mx-auto text-pretty",
                  textColor
                )}
              >
                Ofrecemos una experiencia de aprendizaje única con instructores
                profesionales y metodologías innovadoras
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Instructores Profesionales
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Aprende con bailarines profesionales con años de experiencia
                    en diferentes estilos de baile.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Clases Grupales
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Disfruta del ambiente grupal y conoce personas con tu misma
                    pasión por el baile.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Múltiples Estilos
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Desde salsa y bachata hasta hip-hop y danza contemporánea.
                    Encuentra tu estilo favorito.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Todos los Niveles
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Cursos diseñados para principiantes, intermedios y
                    avanzados. Progresa a tu propio ritmo.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Horarios Flexibles
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Clases en diferentes horarios para que puedas encontrar el
                    que mejor se adapte a tu rutina.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    Ambiente Divertido
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Un espacio seguro y divertido donde puedes expresarte
                    libremente y disfrutar del baile.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 transition-colors duration-300 ease-in bg-muted/5">
          <div className="container mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className={cn("text-4xl font-bold mb-4r", textColor)}>
                Lo que dicen nuestros estudiantes
              </h2>
              <p
                className={cn(
                  "text-xl text-muted-foreground max-w-2xl mx-auto text-pretty",
                  textColor
                )}
              >
                Testimonios reales de estudiantes que han descubierto su pasión
                por el baile con nosotros
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <Card className="animate-on-scroll bg-card border-border md:w-[40%] lg:w-[30%]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">MG</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        María González
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Estudiante de Salsa
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pretty">
                    "Nunca pensé que podría bailar salsa tan bien. Los
                    instructores son increíbles y el ambiente es muy acogedor."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border md:w-[40%] lg:w-[30%]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-accent font-semibold">CR</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        Carlos Rodríguez
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Estudiante de Hip-Hop
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pretty">
                    "Las clases de hip-hop son geniales. He mejorado mucho mi
                    técnica y he hecho grandes amigos aquí."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll bg-card border-border md:w-[40%] lg:w-[30%]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">AL</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        Ana López
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Estudiante de Bachata
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pretty">
                    "Baila Ciencias me ayudó a ganar confianza en mí misma.
                    Ahora bailo bachata con mucha seguridad."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <section
        id="contacto"
        className={cn(
          "py-16 px-4",
          isTestimoniesSectionVisible
            ? "text-secondary"
            : "text-muted-foreground"
        )}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="relative top-3 text-4xl font-bold mb-4">
              ¿List@ para comenzar a bailar?
            </h2>
            <p className="text-xltext-pretty">
              Contáctanos para más información sobre nuestros cursos y horarios
              disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-secondary" />
                  <span>info@bailaciencias.com</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-3 text-secondary" />
                  <span>+58 (424) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Instagram className="w-5 h-5 mr-3 text-secondary" />@
                  <a
                    href="https://www.instagram.com/bailaciencias/?igsh=ZjY5ajJ6cXdlY3Nz#"
                    className="underline "
                  >
                    bailaciencias
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-secondary" />
                  <span>
                    UCV, Paseo Los Ilustres, Caracas 1040, Distrito Capital
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1147.7002013987344!2d-66.89352461613655!3d10.486030021729867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a58d07bc0a8bd%3A0xfc52a7184f332e86!2sUCV%20Facultad%20de%20Ciencias!5e0!3m2!1ses!2sve!4v1760228991472!5m2!1ses!2sve"
                className="rounded-xl h-72 w-11/12 md:w-96"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
