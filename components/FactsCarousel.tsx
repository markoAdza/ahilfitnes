"use client";

import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/motion/Counter";

export type Fact = { value: number; unit: string; detail: string };

/** Koliko časa ostane posamezno dejstvo na zaslonu, preden pride naslednje. */
const INTERVAL = 3500;
/** Najmanjši vodoravni poteg, ki šteje kot podrsljaj in ne kot dotik. */
const SWIPE = 40;

/**
 * Trak dejstev. Od lg naprej mreža štirih stolpcev, na telefonu pa eno dejstvo
 * naenkrat, ki se samo zamenja z naslednjim in na koncu začne znova.
 *
 * Vrtenje se vklopi šele, ko se JS naloži. Do takrat (in brez JavaScripta)
 * ostane vodoravna vrsta, ki se jo povleče s prstom — nobeno dejstvo ne izgine.
 *
 * Vsa dejstva so ves čas v dokumentu, naložena v isto celico mreže, zato je
 * višina traku višina najvišjega in se ob menjavi nič ne premakne. Pri
 * zmanjšanem gibanju se ne vrti samo, pike in poteg pa delujejo še naprej.
 */
export function FactsCarousel({ facts }: { facts: Fact[] }) {
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (index: number) => setActive((index + facts.length) % facts.length);

  useEffect(() => {
    setArmed(true);

    const desktop = window.matchMedia("(min-width: 64rem)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!desktop.matches && !reduced.matches);

    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Odvisno od `active`, da ročni premik (pika, poteg) šteje odmik od začetka.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % facts.length),
      INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, active, facts.length]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined) return;

    const distance = end - start;
    if (Math.abs(distance) < SWIPE) return;
    go(distance < 0 ? active + 1 : active - 1);
  };

  return (
    <div className="container-page">
      <dl
        onTouchStart={armed ? onTouchStart : undefined}
        onTouchEnd={armed ? onTouchEnd : undefined}
        className={[
          "lg:grid lg:grid-cols-4",
          armed ? "grid" : "snap-row flex overflow-x-auto lg:overflow-x-visible",
        ].join(" ")}
      >
        {facts.map((fact, index) => {
          const hidden = armed && index !== active;

          return (
            <div
              key={fact.unit + fact.value}
              className={[
                "py-7 pr-8 lg:w-auto lg:py-9 lg:pr-6",
                armed
                  ? "max-lg:[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out"
                  : "snap-item w-[14rem] shrink-0",
                hidden ? "max-lg:pointer-events-none max-lg:translate-x-4 max-lg:opacity-0" : "",
                index > 0 ? "lg:border-l lg:border-line-soft lg:pl-8" : "",
              ].join(" ")}
            >
              <dt className="flex items-baseline gap-2.5">
                <Counter value={fact.value} className="type-stat text-chalk" />
                <span className="type-label text-accent">{fact.unit}</span>
              </dt>
              <dd className="mt-2.5 text-sm text-muted">{fact.detail}</dd>
            </div>
          );
        })}
      </dl>

      {armed ? (
        <div className="-mt-2 flex gap-2 pb-6 lg:hidden">
          {facts.map((fact, index) => (
            <button
              key={fact.unit + fact.value}
              type="button"
              onClick={() => go(index)}
              aria-label={`Prikaži: ${fact.value} ${fact.unit}`}
              aria-current={index === active ? "true" : undefined}
              className="group flex h-6 items-center"
            >
              <span
                className={[
                  "block h-0.5 transition-all duration-500",
                  index === active ? "w-8 bg-accent" : "w-4 bg-line group-hover:bg-muted",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
