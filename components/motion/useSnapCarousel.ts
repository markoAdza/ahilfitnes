"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Vodoravni karusel z zaskokom, ki ga poganja domače drsenje.
 *
 * Deljen med preklopnikom lokacij in preklopnikom članarin, da imata na
 * telefonu enak občutek — poteg s prstom je nosilna interakcija, gumbi zgoraj
 * pa le krmilje, ki do plošče zadrsa.
 *
 * Ključna posledica te izbire: vse plošče so vedno v dokumentu in vidne, zato
 * brez JavaScripta ne izgine nobena vsebina. Vzorec tablist/tabpanel bi dve od
 * treh skril in jih brez JS pustil skrite.
 *
 * Položaj se meri po `offsetLeft` otrok in ne kot `scrollLeft / širina`, da
 * deluje tudi, kadar plošča ni široka natanko cel zaslon (na telefonu kuka rob
 * naslednje) ali kadar se od `lg` naprej vrsta prelevi v mrežo in drsenja ni.
 */
export function useSnapCarousel<Controls extends HTMLElement = HTMLUListElement>(
  count: number,
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<Controls>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, count - 1));

      // Postavi takoj, da krmilje odgovori tudi tam, kjer drsenja ni (mreža).
      setActive(clamped);

      const track = trackRef.current;
      const target = track?.children[clamped];
      if (!track || !(target instanceof HTMLElement)) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [count],
  );

  // Poteg s prstom in krmilje ostaneta usklajena. Ena meritev na okvir.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      // Ni vodoravnega drsenja (mreža od lg naprej) — pusti izbiro pri miru.
      if (track.scrollWidth <= track.clientWidth + 1) return;

      let nearest = 0;
      let smallest = Infinity;

      Array.from(track.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        const distance = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (distance < smallest) {
          smallest = distance;
          nearest = index;
        }
      });

      setActive(nearest);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /** Puščice, Home in End premikajo izbiro, kot pri vsaki skupini gumbov. */
  const onControlKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const moves: Record<string, number> = {
        ArrowRight: index + 1,
        ArrowDown: index + 1,
        ArrowLeft: index - 1,
        ArrowUp: index - 1,
        Home: 0,
        End: count - 1,
      };

      const next = moves[event.key];
      if (next === undefined) return;

      event.preventDefault();
      const clamped = Math.max(0, Math.min(next, count - 1));
      scrollTo(clamped);

      controlsRef.current
        ?.querySelectorAll<HTMLButtonElement>("button")[clamped]
        ?.focus();
    },
    [count, scrollTo],
  );

  return { trackRef, controlsRef, active, scrollTo, onControlKeyDown };
}
