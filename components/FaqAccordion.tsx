"use client";

import { useState } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/faq";

/**
 * Hairline-separated disclosure list.
 *
 * The rows used to be individually bordered, rounded cards with a shadow on the
 * open one, which made ten questions look like ten unrelated objects. A single
 * ruled list reads as one document.
 */
export function FaqAccordion() {
  // First item open on load.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <li key={faq.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={[
                    "type-h3 transition-colors",
                    isOpen ? "text-ink" : "text-ink group-hover:text-accent",
                  ].join(" ")}
                >
                  {faq.question}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className={[
                    "mt-1 size-5 shrink-0 text-muted transition-transform duration-200",
                    isOpen ? "-rotate-180" : "",
                  ].join(" ")}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-7"
            >
              <p className="max-w-3xl text-body">{faq.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
