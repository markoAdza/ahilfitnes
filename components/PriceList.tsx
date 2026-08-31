import { SectionHeading } from "@/components/ui/SectionHeading";
import { eur } from "@/lib/i18n";
import { priceGroups } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

/**
 * Celoten cenik, po skupinah — na svetlem otoku.
 *
 * Cela stran je temna, ta sekcija pa ne: sedemindvajset vrstic tabelaričnih
 * številk se na svetlem bere bistveno bolje, in menjava podlage tu ni okras
 * ampak edina razlika med "seznam, ki ga preletiš" in "seznam, ki ga preskočiš".
 *
 * Nadomešča dve sekciji, ki sta nosili istih dvanajst zneskov: tabelo
 * "Celoten cenik" in mrežo "Dodatne storitve", ki je vsako vrstico ponovila.
 * Ena skupinska tabela je krajša za branje in si ne more nasprotovati.
 */
export function PriceList() {
  return (
    <section id="cenik" className="on-light bg-paper py-16 md:py-24">
      <div className="container-page">
        {/*
         * Ena črta čez celotno mrežo namesto ene na stolpec, da se oznaka
         * "Cenik" in oznaka prve skupine začneta na isti vrstici.
         */}
        <div className="grid gap-x-8 gap-y-10 border-t border-paper-line pt-8 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <SectionHeading
              rule={false}
              tone="light"
              label="Cenik"
              title="Vse, v celoti"
              intro="Osebni treningi, vadbe in dodatki se plačujejo po porabi — v članarino ni zavito nič, česar nisi želel."
            />
          </div>

          <div className="lg:col-span-8">
            <table className="w-full text-left">
              <caption className="sr-only">
                Celoten cenik: članarina, osebni trening, skupinske vadbe in
                dodatne storitve
              </caption>

              {priceGroups.map((group, groupIndex) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className={[
                        "type-label border-b border-ink pb-3 text-left text-ink/60",
                        groupIndex === 0 ? "" : "pt-12",
                      ].join(" ")}
                    >
                      {group.title}
                    </th>
                  </tr>

                  {group.rows.map((row) => (
                    <tr key={row.service} className="border-b border-paper-line">
                      <th
                        scope="row"
                        className="py-4 pr-6 text-left font-normal text-ink"
                      >
                        {row.service}
                        {row.note ? (
                          <span className="mt-0.5 block text-sm text-ink/55">
                            {row.note}
                          </span>
                        ) : null}
                      </th>
                      <td className="nums py-4 text-right align-top whitespace-nowrap text-ink">
                        {eur(row.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            <p className="mt-8 text-sm text-ink/55">
              Cene vključujejo DDV. Če potrebuješ kaj, česar tu ni, pokliči{" "}
              <a
                href={telHref(site.phone)}
                className="nums link-underline text-accent-ink hover:text-ink"
              >
                {site.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
