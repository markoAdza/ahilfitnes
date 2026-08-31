"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Števec, ki prešteje navzgor, ko pride v vidno polje.
 *
 * Strežnik izriše končno vrednost, zato je pravo število v HTML-ju za iskalnike
 * in bralnike zaslona tudi brez JavaScripta.
 *
 * Animira se le, če je element ob priklopu še POD zaslonom. Če je že viden
 * (visok namizni zaslon, kjer trak dejstev pade nad pregib), ostane pri končni
 * vrednosti — sicer bi število za en okvir poskočilo s 24 na 0 in nazaj.
 */
export function Counter({
  value,
  suffix,
  duration = 1000,
  className,
}: {
  value: number;
  /** Pripis takoj za številko, npr. `€` ali `%`. */
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Že v vidnem polju ob priklopu — brez animacije, brez poskoka.
    if (element.getBoundingClientRect().top <= window.innerHeight) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // Hitro na začetku, mehko na koncu — ease-out cubic.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    /*
     * Nič se ne postavi na 0, dokler se animacija zares ne zažene — in prag je
     * 0, ne delež elementa. Sicer števec obvisi na ničli, kadar opazovalec ne
     * sproži: element, ki je višji od preostanka zaslona, deleža nikoli ne
     * doseže, in obiskovalec bi obstrmel v "0 lokacij".
     */
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        setDisplay(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}
