import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strani ni bilo mogoče najti",
};

export default function NotFound() {
  return (
    <section>
      <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
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
            Članarina in cene
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
