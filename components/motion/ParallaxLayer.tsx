"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Rahel parallax za hero fotografijo.
 *
 * To je edino mesto na strani s poslušalcem drsenja — parallax po definiciji
 * potrebuje zvezno vrednost, ne prehoda, in IntersectionObserver je zato ne
 * more dati. Premika se izključno `transform`, brez `top` in brez
 * `background-position`, da brskalnik ne prerisuje postavitve.
 *
 * Ustavi se, ko hero zapusti zaslon, in se ne zažene, če je vklopljeno
 * zmanjšano gibanje.
 */
export function ParallaxLayer({
  /** Kolikšen del prevožene razdalje naredi plast. 0.18 = 18 %. */
  strength = 0.18,
  className,
  children,
}: {
  strength?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let active = true;

    const update = () => {
      frame = 0;
      if (!active) return;
      const offset = window.scrollY * strength;
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    // Nehaj računati, ko hero ni več na zaslonu.
    const observer = new IntersectionObserver(
      (entries) => {
        active = Boolean(entries[0]?.isIntersecting);
        if (active) onScroll();
      },
      { threshold: 0 },
    );

    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      element.style.transform = "";
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
