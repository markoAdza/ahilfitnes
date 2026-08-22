import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="The weights floor at Ahil Fitness, lit in red"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Left-weighted scrim so the headline stays legible over the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
      />

      <div className="container-page py-24">
        <Badge tone="lime" className="px-5 py-2 text-sm tracking-widest">
          <ClockIcon className="size-4" />
          OPEN 24/7
        </Badge>

        <h1 className="text-display mt-8 max-w-4xl text-white uppercase">
          Transform
          <br />
          Your
          <br />
          Body
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-white/85 md:text-xl">
          Professional equipment &bull; Expert trainers &bull; 3 convenient locations
        </p>

        {/* Equal-width stacked buttons on phones, side by side from sm up. */}
        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="#pricing" variant="lime" size="lg">
            Start Your Journey
          </ButtonLink>
          <ButtonLink href="/equipment" variant="outlineLight" size="lg">
            View Equipment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
