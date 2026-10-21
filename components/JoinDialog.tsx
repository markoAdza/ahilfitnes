"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Label } from "@/components/ui/Label";
import { eur } from "@/lib/i18n";
import { annualFee } from "@/lib/pricing";
import { mailHref, site, telHref } from "@/lib/site";

const steps = [
  { numeral: "I", text: "Pokliči ali piši." },
  { numeral: "II", text: "Dogovorimo se za termin v fitnesu." },
  {
    numeral: "III",
    text: `Na lokaciji plačaš karto — pri časovnih kartah še letno članarino (${eur(
      annualFee,
    )}) — ter prevzameš kartico za vstop.`,
  },
];

/** Telo e-pošte, ki ga obiskovalec dopolni — ve, kaj nam mora povedati. */
function mailBody(choice: string | null): string {
  return [
    "Pozdravljeni,",
    "",
    `želim se vpisati v ${site.name}.`,
    "",
    `Zanima me: ${choice ?? ""}`,
    "Lokacija: ",
    "Ime in priimek: ",
    "Telefon: ",
  ].join("\n");
}

/**
 * Dialog za vpis — en primerek v postavitvi, odpre ga vsak `[data-join]`.
 *
 * Zaledja ni: vpis poteka po telefonu ali e-pošti, nato v fitnesu. Dialog to
 * pove v treh korakih in ponudi oba kanala; e-pošta ima izpolnjeno zadevo
 * ("Vpis – Mesečna karta") in osnutek sporočila.
 *
 * Klik prestreže en poslušalec na `window` v fazi zajemanja, torej PRED
 * next/link — ta preveri `defaultPrevented` in ne skoči na `#vpis`. Brez
 * JavaScripta poslušalca ni in povezava pelje do kontaktnega bloka v nogi.
 *
 * Stoji na domačem `<dialog>`: past za fokus, Escape in vračilo fokusa na
 * sprožilni gumb so vgrajeni v brskalnik.
 */
export function JoinDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Nov zavihek ali okno ostane brskalnikova odločitev.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-join]") : null;
      const element = dialog.current;
      if (!(trigger instanceof HTMLElement) || !element) return;

      event.preventDefault();
      setChoice(trigger.dataset.joinPass ?? null);
      if (!element.open) {
        element.showModal();
        // Stran za dialogom se ne premika.
        document.documentElement.style.overflow = "hidden";
      }
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  const subject = choice ? `Vpis – ${choice}` : "Vpis";

  return (
    <dialog
      ref={dialog}
      aria-labelledby="join-title"
      onClose={() => {
        document.documentElement.style.overflow = "";
      }}
      onClick={(event) => {
        // Klik na ozadje zapre; klik v vsebino ne.
        if (event.target === dialog.current) dialog.current?.close();
      }}
      className="join-sheet"
    >
      <div className="relative border-t border-accent/40 bg-ink-2 px-6 pt-9 pb-[calc(2rem+env(safe-area-inset-bottom))] md:border md:border-line md:px-10 md:pt-10 md:pb-10">
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Zapri"
          className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-[2px] text-muted transition-colors hover:text-chalk"
        >
          <CloseIcon className="size-5" />
        </button>

        <Label tone="accent">Vpis</Label>
        <h2 id="join-title" className="type-h2 mt-3">
          Pridruži se
        </h2>
        {choice ? (
          <p className="mt-3 text-body">
            Izbrano: <span className="font-medium text-chalk">{choice}</span>
          </p>
        ) : null}

        <ol className="mt-7 flex flex-col gap-4 border-t border-line pt-6">
          {steps.map((step) => (
            <li key={step.numeral} className="flex gap-4">
              <span
                aria-hidden="true"
                className="type-serif w-8 shrink-0 text-xl leading-6 text-accent"
              >
                {step.numeral}
              </span>
              <span className="text-[0.9375rem] text-body">{step.text}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <ButtonLink href={telHref(site.phone)} size="lg">
            <PhoneIcon aria-hidden="true" className="size-4" />
            Pokliči
          </ButtonLink>
          <ButtonLink href={mailHref(subject, mailBody(choice))} variant="outline" size="lg">
            <MailIcon aria-hidden="true" className="size-4" />
            Piši
          </ButtonLink>
        </div>

        <p className="mt-5 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:gap-3">
          <span className="nums">{site.phone}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>{site.email}</span>
        </p>
      </div>
    </dialog>
  );
}
