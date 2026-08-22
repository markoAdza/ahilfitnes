"use client";

import { useState } from "react";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/faq";

export function FaqAccordion() {
  // First item open on load, matching the reference design.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mx-auto flex max-w-3xl flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <li
            key={faq.question}
            className={[
              "overflow-hidden rounded-2xl border bg-white transition-colors",
              isOpen ? "border-line shadow-[0_2px_20px_rgba(15,23,41,0.05)]" : "border-line",
            ].join(" ")}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
              >
                <span className="text-lg font-bold text-ink md:text-xl">
                  {faq.question}
                </span>
                <span className="shrink-0 text-lime-ink">
                  {isOpen ? (
                    <MinusIcon className="size-5" />
                  ) : (
                    <PlusIcon className="size-5" />
                  )}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-7 md:px-8"
            >
              <p className="leading-relaxed text-body md:text-lg">{faq.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
