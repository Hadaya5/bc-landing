"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export const experimental_ppr = true;

export default function HomePage() {
  const [textColor, setTextColor] = useState<
    "text-foreground" | "text-secondary"
  >("text-foreground");

  //Observer hook for background setting
  const { intersectionRef: testimoniesRef, isVisible } = useIntersect(
    0.3,
    (isIntersecting) => {
      setTextColor(isIntersecting ? "text-secondary" : "text-foreground");
    }
  );

  //Observer hook for home section
  const { intersectionRef: homeRef, isVisible: isHomeVisible } =
    useIntersect(0.3);

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
        isVisible ? "bg-[#141c61]" : "bg-background"
      )}
    >
      <div>
        <section
          id="inicio"
          ref={homeRef}
          className="h-screen pb-16 grid grid-cols-2 items-center sticky top-0 animate-opacity-on-scroll"
        >
          <div className="container mx-auto mb-5 pl-10 text-center max-w-2xl ">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Aprende a <span className="text-primary">Bailar</span> con{" "}
              <span className="text-accent">Pasión</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
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
          <div className="h-screen mt-15 flex ml-10">
            {/* <picture> */}
            {/* <source srcSet="hero-image-1.avif" />
              <source srcSet="hero-image-2.webp" />
              <source srcSet="hero-image-3.jpg" /> */}
            <img src="hero-image-4.png" />
            {/* </picture> */}
          </div>
        </section>
        <section className="pb-15 px-4 mtop-20 h-full relative bg-gradient-to-b from-gray-300 to-white">
          <div className="container mx-auto">
            <div className=" grid grid-cols-2 gap-5">
              <div className="flex flex-col justify-center items-center  sticky top-1 h-screen">
                <h2 className="text-4xl font-bold text-center">
                  Descubre el arte del baile con nuestros cursos de
                </h2>
                <div className="mt-10 text-xl text-center">
                  <p
                    className={cn(
                      video1IsVisible
                        ? "transition-transform scale-160 ml-4"
                        : ""
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
                      video2IsVisible
                        ? "transition-transform scale-160 ml-4"
                        : ""
                    )}
                  >
                    <span className="text-secondary font-semibold">Salsa</span>,
                    llena de sabor
                  </p>
                  <p
                    className={cn(
                      video3IsVisible
                        ? "transition-transform scale-160 ml-4"
                        : ""
                    )}
                  >
                    <span className="text-secondary font-semibold">
                      Kizomba
                    </span>
                    , conexión y flow
                  </p>
                </div>
              </div>
              <div>
                <div
                  ref={video1Ref}
                  className="h-fit z-[60] flex justify-center items-start animate-on-scroll animate-scale-on-scroll"
                >
                  <Suspense fallback={<p>loading...</p>}>
                    <video
                      autoPlay
                      loop
                      muted
                      controls
                      width="320"
                      src="output.mp4"
                      className="rounded-2xl"
                    ></video>
                  </Suspense>
                </div>
                <div
                  ref={video2Ref}
                  className="h-fit my-5 flex justify-center items-center animate-on-scroll animate-scale-on-scroll"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    width="320"
                    src="output.mp4"
                    className="rounded-2xl"
                  ></video>
                </div>
                <div
                  ref={video3Ref}
                  className="h-fit flex justify-center items-end animate-on-scroll animate-scale-on-scroll"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    width="320"
                    src="output.mp4"
                    className="rounded-2xl"
                  ></video>
                </div>
              </div>
            </div>
            {/* <div className="w-full h-64 md:h-80 bg-muted rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground">Video de presentación</p>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div ref={testimoniesRef}>
        <section
          id="caracteristicas"
          className="py-16 px-4 transition-colors duration-200 ease-in"
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="animate-on-scroll bg-card border-border">
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

              <Card className="animate-on-scroll bg-card border-border">
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

              <Card className="animate-on-scroll bg-card border-border">
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
          "py-16 px-4 ",
          isVisible ? "text-secondary" : "text-muted-foreground"
        )}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-4xl font-bold  mb-4">
              ¿Listo para comenzar a bailar?
            </h2>
            <p className="text-xltext-pretty">
              Contáctanos para más información sobre nuestros cursos y horarios
              disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-semibold  mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5  mr-3" />
                  <span>info@bailaciencias.com</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5  mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Instagram className="w-5 h-5  mr-3" />
                  <span>@bailaciencias</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5  mr-3" />
                  <span>Ciudad de México, México</span>
                </div>
              </div>
            </div>

            <Card className="animate-on-scroll bg-card border-border">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <Input
                      placeholder="Nombre completo"
                      className="bg-input border-border "
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      className="bg-input border-border "
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Institución educativa"
                      className="bg-input border-border "
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={4}
                      className="bg-input border-border "
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
