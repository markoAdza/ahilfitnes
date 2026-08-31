import Image from "next/image";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { listSl } from "@/lib/i18n";
import { locations } from "@/lib/site";

/**
 * Hero.
 *
 * Naslov je besedna znamka in nič drugega. Prejšnja različica je tu nosila
 * slogan; ta prostor zdaj nosi ime fitnesa v velikosti, ki jo logotip v
 * navigaciji ne more dati, opisno vrstico pa prevzame uvod pod njim.
 *
 * Brez `data-reveal`: to je nad pregibom, in dokler se hidracija ne zgodi, bi
 * bil tak element skrit.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[36rem] items-end overflow-hidden md:min-h-[42rem] lg:min-h-[46rem]">
      {/* Plast je višja od sekcije, da parallax ne odkrije roba fotografije. */}
      <ParallaxLayer className="absolute inset-x-0 -top-[12%] -z-20 h-[124%]">
        <Image
          src="/images/hero.jpg"
          alt="Prostor s prostimi utežmi v fitnesu Ahil, osvetljen rdeče"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </ParallaxLayer>

      {/* Utežen proti spodnjemu levemu kotu, kjer stoji besedilo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-black/90 via-black/60 to-black/25"
      />
      {/* Zlitje v podlago strani, da se hero ne odreže z ravno črto. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="container-page pt-32 pb-14 md:pt-40 md:pb-20">
        <Label tone="light" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full bg-accent"
          />
          Odprto 24 ur, 365 dni na leto
        </Label>

        {/*
         * Velike črke nastavi CSS, ne besedilo — bralnik zaslona tako prebere
         * "Ahil Fitnes" in ne črkuje "A-H-I-L". Na najožjih zaslonih zložena, od
         * sm naprej v eni vrsti.
         */}
        <h1 className="type-mega mt-6 text-white">
          <span className="block sm:inline">Ahil</span>
          <span className="hidden sm:inline"> </span>
          <span className="block sm:inline">Fitnes</span>
        </h1>

        <p className="type-lede mt-7 max-w-xl text-white/85">
          Trije fitnesi — {listSl(locations.map((location) => location.name))}. Ena
          članarina odpre vse tri, in nobeden se nikoli ne zapre.
        </p>

        {/* Enako široka zložena gumba na telefonu, od sm naprej drug ob drugem. */}
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/cenik" variant="primary" size="lg">
            Poglej cenik
          </ButtonLink>
          <ButtonLink href="/oprema" variant="outlineLight" size="lg">
            Poglej opremo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
