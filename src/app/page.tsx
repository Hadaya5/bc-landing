"use client";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIntersect, useIntersectElements } from "@/hooks/useIntersect";

import {
  VideoPlayer,
  FeatureCard,
  TestimonialPanel,
  Title,
  Subtitle,
  TestimonialCard,
} from "@/components";
import { featuresData, testimonialsData } from "@/data/rootPageData";
import { SplitText } from "gsap-trial/SplitText";
import "./globals.css";
import "./animations.css";

gsap.registerPlugin(SplitText);

export default function HomePage() {
  const [textColor, setTextColor] = useState<
    "text-foreground" | "text-secondary"
  >("text-foreground");

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const introPanelRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  //Observer hook for background setting
  const {
    intersectionRef: featuresRef,
    isVisible: isTestimoniesSectionVisible,
  } = useIntersect(0.06, (isIntersecting) => {
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

  useGSAP(
    () => {
      // Horizontal scroll animation for testimonial panels
      const track = trackRef.current;
      if (!track) return;
      const totalWidth = (track as HTMLElement).scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=3000",
        },
      });

      // Split the text into words and characters
      let split = new SplitText(introPanelRef.current, {
        type: "words, chars",
      });

      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: introPanelRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.03,
        ease: "power1.out",
      });

      return () => {
        split.revert(); // Reverts the text back to its original state
      };
    },
    { scope: containerRef }
  );

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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance text-center"></h1>
            <Title type="h1">
              Aprende a Bailar con <span className="text-accent">Pasión</span>
            </Title>
            <p className="text-xl text-muted-foreground mb-8 text-center md:text-justify text-pretty max-w-2xl mx-auto">
              Desde principiantes hasta avanzados, ofrecemos clases de Bachata,
              Salsa y Kizomba. Aprende técnica, ritmo y estilo mientras
              disfrutas de un ambiente divertido y social.
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
          <div className="h-screen mt-15 ml-15 hidden lg:flex">
            <img src="images/hero-image.png" />
          </div>
        </section>
        <section
          ref={discoverSectionTef}
          className={cn(
            "pb-5 md:pb-15 px-4 pt-5 h-full relative bg-gray-300 transition-colors duration-500 ease-in",
            isTestimoniesSectionVisible && "bg-primary"
          )}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col justify-center items-center sticky top-1 h-screen">
                <Title className="text-center">
                  Descubre el arte del baile con nuestros cursos de
                </Title>
                <div className="mt-7 text-xl text-center">
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
                <div className="md:hidden h-fit z-60 pt-5 flex justify-center items-start animate-scale-on-scroll">
                  <VideoPlayer
                    width={270}
                    className="rounded-2xl"
                    src="videos/salsaVideo.mp4"
                    posterSrc="images/salsaPoster.jpg"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div
                  ref={video1Ref}
                  className="h-fit z-60 flex justify-center items-start animate-scale-on-scroll"
                >
                  <VideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="videos/bachataVideo.mp4"
                    posterSrc="images/bachataPoster.jpg"
                  />
                </div>
                <div
                  ref={video2Ref}
                  className="h-fit my-5 flex justify-center items-center animate-scale-on-scroll"
                >
                  <VideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="videos/salsaVideo.mp4"
                    posterSrc="images/salsaPoster.jpg"
                  />
                </div>
                <div
                  ref={video3Ref}
                  className="h-fit flex justify-center items-end animate-scale-on-scroll"
                >
                  <VideoPlayer
                    width={320}
                    className="rounded-2xl"
                    src="videos/kizombaVideo.mp4"
                    posterSrc="images/kizombaPoster.jpg"
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
              <Title className={`mb-4 ${textColor}`}>
                ¿Por qué elegir Baila Ciencias?
              </Title>
              <p
                className={cn(
                  "text-xl max-w-2xl mx-auto text-pretty",
                  textColor
                )}
              >
                Ofrecemos una experiencia de aprendizaje única con instructores
                profesionales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          ref={containerRef}
          className="hidden md:block fit-content h-screen"
        >
          {/* Testimonial Panels */}
          <div ref={trackRef} className="flex h-full w-fit">
            {/* Paneles (Cards) - render a panel per testimonial to enable horizontal scroll */}
            <div className="w-screen h-full flex flex-col justify-center items-center shrink-0 px-10">
              <div
                id="testimonial-title"
                ref={introPanelRef}
                className="text-center border-2 border-secondary rounded-2xl p-20"
              >
                {" "}
                <Title
                  className={`mb-4 ${textColor} text-4xl sm:text-5xl md:text-7xl`}
                >
                  Testimonios
                </Title>
                <Subtitle text="Lo que dicen nuestros estudiantes sobre su ritmo y pasión." />
                <p className="mt-4 animate-bounce text-2xl">↓ Desliza ↓</p>
              </div>
            </div>
            {testimonialsData.map((t, i) => (
              <TestimonialPanel key={i} data={t} />
            ))}
          </div>
        </section>
        <section className="block md:hidden py-16 px-4 transition-colors duration-300 ease-in bg-muted/5">
          <div className="container mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className={cn("text-4xl font-bold mb-4", textColor)}>
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
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                  initials={testimonial.initials}
                  rating={testimonial.rating}
                />
              ))}
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
            <Title className="relative top-3">
              ¿List@ para comenzar a bailar?
            </Title>
            <Subtitle
              text="Contáctanos para más información sobre nuestros cursos y horarios
              disponibles"
            />
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
