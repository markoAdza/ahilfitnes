"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { JoinButton } from "@/components/JoinButton";
import { site } from "@/lib/site";

/**
 * Lepljiva vrstica "Pridruži se" na dnu zaslona, samo na mobilnem.
 *
 * Pojavi se, ko obiskovalec prevozi prvi zaslon, in izgine, ko pride do noge —
 * tam je kontaktni blok že na strani, dve isti stvari drugo nad drugo pa je le
 * hrup. Gumb odpre isti dialog kot vsi ostali pozivi.
 *
 * Oba prehoda zaznava IntersectionObserver, ne poslušalec drsenja: en dogodek
 * na prehod namesto enega na piksel.
 */
export function StickyJoinBar() {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [pastFirstScreen, setPastFirstScreen] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const element = sentinel.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => setPastFirstScreen(!entries[0]?.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => setAtFooter(Boolean(entries[0]?.isIntersecting)),
      // Umakni se, še preden noga pride do roba zaslona.
      { rootMargin: "0px 0px 120px 0px", threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
    // Ob menjavi poti se noga izriše na novo.
  }, [pathname]);

  // Ob menjavi poti smo znova na vrhu.
  useEffect(() => {
    setPastFirstScreen(false);
    setAtFooter(false);
  }, [pathname]);

  const visible = pastFirstScreen && !atFooter;

  return (
    <>
      {/* Prvi zaslon: dokler je to sidro vidno, vrstice ni. */}
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[85vh] w-px"
      />

      <div
        inert={!visible}
        aria-hidden={!visible}
        className={[
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
          visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        ].join(" ")}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <p className="text-sm text-muted">{site.access}</p>
          <JoinButton size="md" className="shrink-0">
            Pridruži se
          </JoinButton>
        </div>
      </div>
    </>
  );
}
