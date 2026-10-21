import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { HelmetMark } from "@/components/ui/HelmetMark";
import { Label } from "@/components/ui/Label";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strani ni bilo mogoče najti",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <HelmetMark
        tone="current"
        className="pointer-events-none absolute top-1/2 -right-24 h-[90%] w-auto -translate-y-1/2 text-line/70 md:right-[6vw]"
      />
      <div className="container-page relative flex min-h-[70vh] flex-col justify-center py-24">
        <Label tone="accent">Napaka 404</Label>
        <h1 className="type-h1 mt-6 max-w-xl">Te strani nismo našli</h1>
        <p className="type-lede mt-5 max-w-md text-body">
          Morda se je preselila ali pa je povezava napačna. Cela stran so{" "}
          {nav.length} strani spodaj.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Nazaj na domačo stran
          </ButtonLink>
          <ButtonLink href="/cenik" variant="outline" size="lg">
            Cenik
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
