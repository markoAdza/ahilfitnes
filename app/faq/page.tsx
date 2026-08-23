import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { PhoneIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { faqs } from "@/lib/faq";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Opening hours, memberships, guest passes, personal training, classes and the amenities at each of the three Ahil Fitness gyms.",
  openGraph: {
    title: "Frequently asked questions — Ahil Fitness",
    description:
      "What you need to know about Ahil Fitness memberships and facilities.",
  },
};

/** FAQPage structured data, so the answers can surface in search results. */
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
        // Content is static and authored in lib/faq.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        title="Frequently asked questions"
        intro="Hours, memberships, guest passes and what is in each gym. If something is missing, the phone is the fastest way to get an answer."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-page grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>

          {/* Contact stays in view while the answers are being read. */}
          <aside className="lg:col-span-4">
            <div className="rounded-[2px] border border-line bg-sand p-7 lg:sticky lg:top-28">
              <Label as="h2">Still stuck?</Label>
              <p className="type-h3 mt-4 text-ink">
                Call the team and we will answer straight away.
              </p>
              <a
                href={telHref(site.phone)}
                className="mt-5 inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
              >
                <PhoneIcon className="size-4 text-muted" />
                <span className="nums">{site.phone}</span>
              </a>
              <p className="mt-4 text-sm text-muted">
                Reception is staffed {site.reception}. The gyms themselves are
                open around the clock.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
