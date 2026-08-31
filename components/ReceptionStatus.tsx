"use client";

import { useEffect, useState } from "react";

import { receptionHours, site } from "@/lib/site";

type State = { open: boolean; label: string };

/**
 * Bere uro v Ljubljani, ne na napravi obiskovalca.
 *
 * `Intl.DateTimeFormat` s `timeZone` je vgrajen in natančen, zato je odgovor
 * pravilen tudi za nekoga, ki gleda stran iz drugega časovnega pasu — in za
 * poletni oziroma zimski čas ne potrebujemo nobene knjižnice.
 */
function readState(): State {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const time = hour + minute / 60;

  const window =
    weekday === "Sun"
      ? receptionHours.sunday
      : weekday === "Sat"
        ? receptionHours.saturday
        : receptionHours.weekday;

  if (!window) {
    return { open: false, label: "Recepcija je danes zaprta — fitnes je odprt" };
  }

  if (time < window.from) {
    return {
      open: false,
      label: `Recepcija odpre ob ${window.from}.00 — fitnes je odprt`,
    };
  }

  if (time >= window.to) {
    return { open: false, label: "Recepcija je zaprta — fitnes je odprt" };
  }

  return { open: true, label: `Recepcija je odprta do ${window.to}.00` };
}

/**
 * Živ status recepcije. Fitnesi so odprti 24 ur, recepcija ni — in to je edina
 * ura na strani, ki jo je vredno preveriti pred obiskom.
 *
 * Strežnik izriše nevtralno različico (samo urnik), da ni neujemanja pri
 * hidraciji; pravi status se pojavi takoj po priklopu.
 */
export function ReceptionStatus({ className }: { className?: string }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    setState(readState());

    // Osveži na minuto, da se status ne zaskoči pri odprti kartici.
    const timer = window.setInterval(() => setState(readState()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p
      className={["flex items-center gap-2.5 text-sm", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "inline-block size-2 shrink-0 rounded-full",
          state === null
            ? "bg-muted"
            : state.open
              ? "bg-accent"
              : "bg-muted",
        ].join(" ")}
      />
      <span className="text-muted">
        {state === null ? `Recepcija ${site.reception}` : state.label}
      </span>
    </p>
  );
}
