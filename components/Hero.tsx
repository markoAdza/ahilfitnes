import Image from "next/image";

import { JoinButton } from "@/components/JoinButton";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ButtonLink } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { HelmetMark } from "@/components/ui/HelmetMark";
import { Label } from "@/components/ui/Label";
import { listSl } from "@/lib/i18n";
import { locations } from "@/lib/site";

/**
 * Hero — čelada kot spomenik.
 *
 * Naslov je besedna znamka in nič drugega: "AHIL" v kondenzirani Archivo in
 * "fitnes" v kurzivi Cormoranta, kot v logotipu. Brez slogana. Razpoloženje
 * nosita bronasta čelada iz logotipa — velika, odrezana čez desni rob, na
 * počasnem parallaxu — in zatemnjena, razbarvana fotografija za njo.
 *
 * Fotografija je nadomestna (Unsplash) in ni posneta v fitnesu Ahil, zato je
 * zgolj okras (`alt=""`) in ne trdi, da prikazuje naše prostore.
 *
 * Brez `data-reveal`: to je nad pregibom, in dokler se hidracija ne zgodi, bi
 * bil tak element skrit.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* Plast je višja od sekcije, da parallax ne odkrije roba fotografije. */}
      <ParallaxLayer
        strength={0.14}
        className="absolute inset-x-0 -top-[10%] -z-30 h-[120%]"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_center] opacity-40 contrast-125 grayscale"
        />
      </ParallaxLayer>

      {/* Bronast ton čez razbarvano fotografijo — barvo vzame od akcenta, svetlost od slike. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-accent-deep opacity-35 mix-blend-color"
      />
      {/* Vinjeta: svetloba pade na čelado, robovi utonejo v podlago. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(110%_80%_at_72%_38%,transparent_0%,rgb(11_11_10/0.55)_55%,var(--color-ink)_100%)]"
      />

      {/*
       * Čelada. Na namizju stoji desno in sega čez rob zaslona; na telefonu
       * se umakne za besedno znamko in zbledi, da besedilo ostane berljivo.
       * Parallax je počasnejši od fotografije, zato se zdi bližje.
       */}
      <ParallaxLayer
        strength={0.06}
        className="pointer-events-none absolute top-[9svh] -right-[38vw] -z-10 h-[64svh] opacity-55 sm:-right-[22vw] md:top-[5svh] md:-right-[9vw] md:h-[100svh] md:opacity-100 lg:-right-[4vw] lg:h-[108svh]"
      >
        <HelmetMark idPrefix="hero-helmet" className="h-full w-auto" />
      </ParallaxLayer>

      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-page relative pt-32 pb-[12svh] md:pb-[18svh]">
        <Label tone="light" className="flex items-center gap-3">
          <span aria-hidden="true" className="inline-block size-1.5 bg-accent-bright" />
          Odprto 24/7 · vse dni v letu
        </Label>

        {/*
         * Velike črke nastavi CSS, ne besedilo — bralnik zaslona tako prebere
         * "Ahil fitnes" in ne črkuje "A-H-I-L". Presledek med deloma je
         * skrit, ker ga flex ne izriše, bralnik pa ga potrebuje.
         */}
        <h1 className="mt-5 flex flex-col items-start text-chalk sm:flex-row sm:items-end">
          <span className="type-mega">Ahil</span>
          <span className="sr-only"> </span>
          <span className="type-serif -mt-[0.12em] ml-[0.6em] text-[clamp(3.25rem,15vw,9rem)] leading-[0.72] text-accent-bright sm:mt-0 sm:mb-[0.04em] sm:ml-[0.14em]">
            fitnes
          </span>
        </h1>

        <p className="type-lede mt-8 max-w-md text-chalk/80">
          Fitnes, odprt 24 ur na dan, v{" "}
          {listSl(locations.map((location) => location.locative))}. Vsaka karta
          velja na vseh lokacijah.
        </p>

        {/* Enako široka zložena gumba na telefonu, od sm naprej drug ob drugem. */}
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <JoinButton>Pridruži se zdaj</JoinButton>
          <ButtonLink href="#lokacije" variant="outlineLight" size="lg">
            Razišči lokacije
          </ButtonLink>
        </div>
      </div>

      <Divider />
    </section>
  );
}
