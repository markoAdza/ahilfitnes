"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
} from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/lib/site";

/** Razporeditev bento mreže — dve večji polji razbijeta ritem šestih enakih. */
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

/**
 * Galerija s svetlobno škatlo.
 *
 * Fotografije so nadomestne (Unsplash), zato sekcija ne trdi, da prikazujejo
 * fitnese Ahil — ko stranka dostavi prave, se zamenjajo v lib/site.ts.
 *
 * Škatla stoji na domačem `<dialog>`, ne na ročno sestavljenem prekritju: past
 * za fokus, Escape in vračilo fokusa na sprožilni gumb so vgrajeni v brskalnik
 * in jih ni treba (in ni pametno) pisati na novo. Dodane so le puščice,
 * poteg s prstom in klik na ozadje.
 */
export function Gallery({ sectionIndex }: { sectionIndex?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const step = useCallback((delta: number) => {
    setIndex((current) => (current + delta + gallery.length) % gallery.length);
  }, []);

  const open = (next: number) => {
    setIndex(next);
    dialog.current?.showModal();
  };

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!element.open) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  const current = gallery[index];

  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <SectionHeading index={sectionIndex} title="Galerija" />

        <ul
          className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-12 lg:grid-rows-[repeat(3,12rem)]"
          data-reveal
        >
          {gallery.map((photo, position) => (
            <li
              key={photo.src}
              className={[
                /* Razmerje drži višino na telefonu; od lg jo dajo vrstice mreže. */
                "aspect-4/3 lg:aspect-auto",
                spans[position] ?? "lg:col-span-4",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => open(position)}
                className="group relative block size-full overflow-hidden rounded-[2px] bg-ink-2"
              >
                <span className="relative block size-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 50vw"
                    style={"focus" in photo ? { objectPosition: photo.focus } : undefined}
                    className="object-cover opacity-85 grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent-deep opacity-20 mix-blend-color"
                  />
                </span>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-[2px] bg-ink/70 text-chalk opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ExpandIcon className="size-4" />
                </span>
                <span className="sr-only">Povečaj: {photo.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-label="Galerija fotografij"
        onClick={(event) => {
          // Klik na ozadje zapre; klik na sliko ali gumbe ne.
          if (event.target === dialog.current) dialog.current?.close();
        }}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const end = event.changedTouches[0]?.clientX;
          touchStart.current = null;
          if (start === null || end === undefined) return;
          const delta = end - start;
          if (Math.abs(delta) < 48) return;
          step(delta < 0 ? 1 : -1);
        }}
        className="m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90 open:fixed open:inset-0 open:flex open:size-full open:items-center open:justify-center"
      >
        <div className="relative flex w-full max-w-6xl flex-col gap-4 px-4 py-4">
          <div className="relative h-[62vh] w-full md:h-[74vh]">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain grayscale"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="max-w-md text-sm text-chalk/70">
              <span className="nums mr-2 text-chalk">
                {index + 1} / {gallery.length}
              </span>
              {current.alt}
            </p>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Prejšnja fotografija"
                className="inline-flex size-11 items-center justify-center rounded-[2px] border border-chalk/35 text-chalk transition-colors hover:border-accent-bright hover:text-accent-bright"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Naslednja fotografija"
                className="inline-flex size-11 items-center justify-center rounded-[2px] border border-chalk/35 text-chalk transition-colors hover:border-accent-bright hover:text-accent-bright"
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Zapri galerijo"
                className="ml-2 inline-flex size-11 items-center justify-center rounded-[2px] bg-accent-bright text-ink transition-[filter] hover:brightness-110"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
