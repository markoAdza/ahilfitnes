import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <Label>Error 404</Label>
        <h1 className="type-h1 mt-6 max-w-xl">We could not find that page</h1>
        <p className="type-lede mt-5 max-w-md text-body">
          It may have moved, or the link may be wrong. Everything on the site is
          one of the four pages below.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg">
            Membership prices
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
