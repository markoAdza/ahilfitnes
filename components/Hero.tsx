import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[34rem] items-end overflow-hidden md:min-h-[40rem]">
      <Image
        src="/images/hero.jpg"
        alt="The weights floor at Ahil Fitness, lit in red"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Weighted towards the bottom-left, where the copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-black/85 via-black/55 to-black/20"
      />

      <div className="container-page pt-32 pb-16 md:pt-40 md:pb-20">
        <Label tone="light" className="text-white/70">
          Open 24 hours, 365 days a year
        </Label>

        <h1 className="type-display mt-6 max-w-3xl text-white">
          Train at 5am.
          <br />
          Or at midnight.
        </h1>

        <p className="type-lede mt-6 max-w-xl text-white/80">
          Three gyms in Hrastnik, Zagorje and Sevnica. One membership covers all
          three, and none of them ever close.
        </p>

        {/* Equal-width stacked buttons on phones, side by side from sm up. */}
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/pricing" variant="light" size="lg">
            See membership prices
          </ButtonLink>
          <ButtonLink href="/equipment" variant="outlineLight" size="lg">
            See the equipment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
