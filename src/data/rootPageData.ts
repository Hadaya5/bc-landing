import {
    Music,
    Users,
    BookOpen,
    Star,
  } from "lucide-react";


export const featuresData = [
    {
      icon: Music,
      title: "Instructores Profesionales",
      description:
        "Aprende con bailarines profesionales con años de experiencia en diferentes estilos de baile.",
      iconColor: "primary" as const,
    },
    {
      icon: Users,
      title: "Clases Grupales",
      description:
        "Disfruta del ambiente grupal y conoce personas con tu misma pasión por el baile.",
      iconColor: "accent" as const,
    },
    {
      icon: BookOpen,
      title: "Múltiples Estilos",
      description:
        "Desde salsa y bachata hasta kizomba y merengue. Encuentra tu estilo favorito.",
      iconColor: "primary" as const,
    },
    {
      icon: Star,
      title: "Todos los Niveles",
      description:
        "Cursos diseñados para principiantes, intermedios y avanzados. Progresa a tu propio ritmo.",
      iconColor: "accent" as const,
    },
    {
      icon: Music,
      title: "Horarios Flexibles",
      description:
        "Adaptamos nuestros horarios a tu disponibilidad para que nunca pierdas una clase.",
      iconColor: "primary" as const,
    },
    {
      icon: Users,
      title: "Ambiente Inclusivo",
      description:
        "Un espacio seguro donde todos son bienvenidos, sin importar tu nivel o experiencia.",
      iconColor: "accent" as const,
    },
  ];


export const testimonialsData = [
    {
      name: "María González",
      role: "Estudiante de Salsa",
      testimonial: "Si me hubieran dicho hace un año que estaría bailando así, no lo creería. Nunca pensé que podría dominar la salsa con tanta confianza, y todo es gracias a ellos. Los instructores son increíbles: talentosos y cercanos. Desde el primer día, el ambiente acogedor te hace sentir en casa y te quita cualquier timidez.",
      initials: "MG",
      image: "images/avatar-testimony-1.jpg",
      rating: 5,
      styles: "bg-secondary/85 text-primary-foreground",
      quoteColor: "text-primary",

    },
    {
      name: "Carlos Rodríguez",
      role: "Estudiante de Kizomba",
      testimonial:
        "¡Las clases son, sin duda, el mejor momento de mi semana! No solo he mejorado mi técnica, postura y ritmo de una forma que no esperaba, sino que también he encontrado una segunda familia. La energía es increíble y he hecho grandes amigos con los que comparto esta pasión. Es mucho más que solo clases de baile.",
      initials: "CR",
      image: "images/avatar-testimony-2.jpg",
      rating: 5,
      styles: "bg-primary",
      quoteColor: "text-secondary",
    },
    {
      name: "Ana López",
      role: "Estudiante de Bachata",
      testimonial:
        "Los profesores son muy pacientes, se toman el tiempo necesario para explicarte cada paso hasta que te sientes cómodo y seguro. El ambiente es relajado, libre de juicios y lleno de apoyo, lo que lo convierte en el lugar perfecto para aprender a bailar desde cero y disfrutar del proceso.",
      initials: "AL",
      image: "images/avatar-testimony-3.jpg",
      rating: 5,
      styles: "bg-gray-300 text-primary",
      quoteColor: "text-primary",
    },
  ];