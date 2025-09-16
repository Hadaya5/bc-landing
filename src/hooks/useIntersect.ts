import { useEffect, useRef, useState } from "react";

// Hook to observe a specific element and manage visibiliy state
export function useIntersect(
  threshold: number = 0.2,
  callback?: (isIntersecting: boolean) => void
) {
  const intersectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        callback?.(isIntersecting);
      },
      { threshold }
    );

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
      observer.disconnect();
    };
  }, [threshold, callback]);

  return { intersectionRef, isVisible };
}

// Hook to observe multiple elements with animations
export function useIntersectElements(threshold: number = 0.1, selection: string = ".animate-on-scroll") {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(selection);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold]);

  return observerRef;
}