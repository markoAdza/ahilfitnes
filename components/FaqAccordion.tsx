import { ChevronDownIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/faq";

/**
 * Seznam vprašanj, ločen z lasnicami.
 *
 * Stoji na domačem `<details>` z atributom `name`: brskalnik sam poskrbi, da je
 * odprto le eno vprašanje hkrati, in to brez ene vrstice JavaScripta. Prejšnja
 * različica je bila client komponenta z `useState`, kar je pomenilo, da je bilo
 * brez JS vidnih devet vprašanj brez odgovorov.
 *
 * Kjer brskalnik `name` še ne pozna, se lahko odpre več vprašanj hkrati — kar
 * je popolnoma sprejemljiv izid in ne napaka.
 *
 * Ena črtasta lista se bere kot en dokument, ne kot kup nepovezanih kartic.
 */
export function FaqAccordion() {
  return (
    <ul className="border-t border-line">
      {faqs.map((faq, index) => (
        <li key={faq.question} className="border-b border-line">
          <details name="faq" open={index === 0} className="group">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="type-h3 text-[1.25rem] text-chalk transition-colors group-hover:text-accent-bright group-open:text-chalk">
                {faq.question}
              </h3>
              <ChevronDownIcon
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-accent transition-transform duration-200 group-open:-rotate-180"
              />
            </summary>

            <div className="pb-7">
              <p className="max-w-3xl text-body">{faq.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
