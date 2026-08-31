"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { MapIcon } from "@/components/ui/Icons";
import { mapEmbedHref } from "@/lib/site";

/**
 * Zemljevid, ki se naloži šele na klik.
 *
 * Dokler obiskovalec ne klikne, proti Googlu ne gre noben zahtevek in se ne
 * nastavi noben piškotek. Stran je zato hitrejša, stranka pa ima eno skrb manj
 * glede zasebnosti — vdelan zemljevid je tretjeosebni sledilnik, tudi kadar
 * nikoli ne pogledaš vanj.
 */
export function MapPanel({ address, name }: { address: string; name: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="relative h-72 overflow-hidden rounded-[2px] border border-line bg-ink-3 md:h-96">
        <iframe
          src={mapEmbedHref(address)}
          title={`Zemljevid — ${name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  /*
   * Poster je vrsta in ne stolpec: pri polni širini strani bi navpična
   * postavitev pustila 900 px prazne temne ploskve na desni, kar se bere kot
   * "nekaj se ni naložilo" — natanko nasprotno od tega, kar naj poster pove.
   */
  return (
    <div className="flex flex-col gap-5 rounded-[2px] border border-line bg-ink-3 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
      <div className="flex items-start gap-4">
        <MapIcon aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-muted" />
        <div>
          <p className="text-[0.9375rem] text-chalk">{address}</p>
          <p className="mt-1 max-w-md text-sm text-muted">
            Zemljevid se naloži šele na klik — do takrat proti Googlu ne gre noben
            zahtevek.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="shrink-0"
        onClick={() => setLoaded(true)}
      >
        Pokaži zemljevid
      </Button>
    </div>
  );
}
