"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Odkrivanje ob drsenju za celo stran, z enim samim IntersectionObserverjem.
 *
 * Strežniške komponente si ne odprejo lastne client meje — sekciji dodajo samo
 * `data-reveal` (in po želji `data-reveal-delay="1|2|3"` za stopničast vstop v
 * mreži). Prehod je v celoti v CSS, tu je le opazovanje.
 *
 * Skrito izhodišče vklopi vgrajena skripta v layoutu (`data-reveal-armed` na
 * <html>), ki teče še pred izrisom — tako ni utripa. Če JS ni na voljo ali je
 * vklopljeno zmanjšano gibanje, se ne postavi nič in vsebina je od začetka
 * vidna.
 *
 * `data-reveal` zato ne sodi na vsebino nad pregibom: dokler se hidracija ne
 * zgodi, tak element ostane skrit.
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    // Skripta v layoutu ni oborožila — zmanjšano gibanje ali star brskalnik.
    if (!document.documentElement.hasAttribute("data-reveal-armed")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // Sproži se, ko je element dobrih 10 % nad spodnjim robom zaslona, da
      // animacija teče med drsenjem in ne šele, ko element že stoji.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );

    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
    // Ob menjavi poti se izrišejo nove sekcije, ki jih je treba opazovati.
  }, [pathname]);

  return null;
}
