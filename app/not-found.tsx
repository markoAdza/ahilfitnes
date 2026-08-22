import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-body uppercase">
          Error 404
        </p>
        <h1 className="text-h1 mt-4">This page took a rest day</h1>
        <p className="mt-5 max-w-md text-lg text-body">
          The page you were looking for does not exist. Let&rsquo;s get you back to
          training.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="lime" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/equipment" variant="outline" size="lg">
            View Equipment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
