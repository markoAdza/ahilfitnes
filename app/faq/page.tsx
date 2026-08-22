import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PhoneIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/faq";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Ahil Fitness opening hours, memberships, guest passes, personal training, group classes and the amenities at each of our three locations.",
  openGraph: {
    title: "Frequently Asked Questions | Ahil Fitness",
    description:
      "Everything you need to know about Ahil Fitness memberships and facilities.",
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

      <section className="bg-white pt-16 pb-14 md:pt-24">
        <div className="container-page text-center">
          <h1 className="text-h1">Frequently Asked Questions</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-body md:text-xl">
            Everything you need to know about {site.name} memberships and facilities
          </p>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className="container-page">
          <FaqAccordion />

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-surface px-6 py-7 text-center md:px-8">
            <p className="text-lg font-bold text-ink">Still have questions?</p>
            <p className="mt-2 text-body">
              Call the team and we will get you an answer straight away.
            </p>
            <a
              href={telHref(site.phone)}
              className="mt-4 inline-flex items-center gap-2 font-bold text-ink transition-colors hover:text-lime-ink"
            >
              <PhoneIcon className="size-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
