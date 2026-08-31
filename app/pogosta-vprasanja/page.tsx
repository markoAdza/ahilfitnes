import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { ReceptionStatus } from "@/components/ReceptionStatus";
import { PhoneIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { faqs } from "@/lib/faq";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pogosta vprašanja",
  description:
    "Delovni čas, članarine, vstopnice za goste, osebni trening, skupinske vadbe in kaj je v posameznem fitnesu Ahil Fitnes.",
  alternates: { canonical: "/pogosta-vprasanja" },
  openGraph: {
    title: "Pogosta vprašanja — Ahil Fitnes",
    description:
      "Kar je treba vedeti o članarinah in prostorih Ahil Fitnes, na enem mestu.",
  },
};

/** FAQPage oznake, da se odgovori lahko pojavijo že v zadetkih iskanja. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Vsebina je statična in zapisana v lib/faq.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        title="Pogosta vprašanja"
        intro="Urnik, članarine, vstopnice za goste in kaj je v posameznem fitnesu. Če česa ni med odgovori, je telefon najhitrejša pot."
        crumbs={[{ label: "Domov", href: "/" }, { label: "Pogosta vprašanja" }]}
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>

          {/* Kontakt ostane v vidnem polju, dokler se odgovori berejo. */}
          <aside className="lg:col-span-4">
            <div className="rounded-[2px] border border-line bg-ink-2 p-7 lg:sticky lg:top-28">
              <Label as="h2">Še vedno nejasno?</Label>
              <p className="type-h3 mt-4">
                Pokliči ekipo in odgovorimo takoj.
              </p>

              <a
                href={telHref(site.phone)}
                className="mt-5 inline-flex items-center gap-2 font-medium text-chalk transition-colors hover:text-accent"
              >
                <PhoneIcon aria-hidden="true" className="size-4 text-accent" />
                <span className="nums">{site.phone}</span>
              </a>

              <ReceptionStatus className="mt-4" />

              <p className="mt-4 text-sm text-muted">
                Fitnesi so odprti ves čas — recepcija je zasedena{" "}
                {site.reception}.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
