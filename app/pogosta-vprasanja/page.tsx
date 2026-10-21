import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { JoinButton } from "@/components/JoinButton";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { faqs } from "@/lib/faq";
import { mailHref, site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pogosta vprašanja",
  description:
    "Kako se vpišeš, ali karta velja na vseh lokacijah, parkiranje, delovni čas, letna članarina in osebni trener v fitnesih Ahil Fitnes.",
  alternates: { canonical: "/pogosta-vprasanja" },
  openGraph: {
    title: "Pogosta vprašanja — Ahil Fitnes",
    description:
      "Vpis, karte, parkiranje in delovni čas Ahil Fitnes, na enem mestu.",
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
        intro="Vpis, karte, parkiranje in delovni čas. Če česa ni med odgovori, pokliči ali piši."
        crumbs={[{ label: "Domov", href: "/" }, { label: "Pogosta vprašanja" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>

          {/* Kontakt ostane v vidnem polju, dokler se odgovori berejo. */}
          <aside className="lg:col-span-4">
            <div className="rounded-[2px] border border-line bg-ink-2 p-7 lg:sticky lg:top-28">
              <Label as="h2">Še vedno nejasno?</Label>
              <p className="type-h3 mt-4">Pokliči ali piši — odgovorimo.</p>

              <a
                href={telHref(site.phone)}
                className="mt-6 flex items-center gap-2.5 font-medium text-chalk transition-colors hover:text-accent-bright"
              >
                <PhoneIcon aria-hidden="true" className="size-4 text-accent" />
                <span className="nums">{site.phone}</span>
              </a>
              <a
                href={mailHref("Vprašanje")}
                className="mt-3 flex items-center gap-2.5 font-medium text-chalk transition-colors hover:text-accent-bright"
              >
                <MailIcon aria-hidden="true" className="size-4 text-accent" />
                <span>{site.email}</span>
              </a>

              <p className="mt-5 text-sm text-muted">{site.access}. Recepcije ni.</p>

              <JoinButton className="mt-7 w-full">Pridruži se</JoinButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
