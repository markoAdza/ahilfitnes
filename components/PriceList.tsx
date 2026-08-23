import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceGroups } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

/**
 * The full price list, grouped.
 *
 * This replaces two sections that carried the same twelve figures: a
 * "Complete Price List" table and an "Additional Services & Add-ons" grid
 * repeating every row of it. One grouped table is shorter to read and cannot
 * contradict itself.
 */
export function PriceList() {
  return (
    <section id="price-list" className="bg-white py-20 md:py-28">
      <div className="container-page">
        {/*
         * One rule across the whole grid rather than one per column, so the
         * "Price list" label and the first group label start on the same line.
         */}
        <div className="grid gap-x-8 gap-y-10 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              rule={false}
              label="Price list"
              title="Everything, in full"
              intro="Personal training, classes and extras are pay-as-you-go — nothing is bundled into the membership you did not ask for."
            />
          </div>

          <div className="lg:col-span-8">
            <table className="w-full text-left">
              <caption className="sr-only">
                Full price list: membership, personal training, group classes and
                extras
              </caption>

              {priceGroups.map((group, groupIndex) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className={[
                        "type-label border-b border-ink pb-3 text-left text-muted",
                        groupIndex === 0 ? "" : "pt-12",
                      ].join(" ")}
                    >
                      {group.title}
                    </th>
                  </tr>

                  {group.rows.map((row) => (
                    <tr key={row.service} className="border-b border-line-soft">
                      <th
                        scope="row"
                        className="py-4 pr-6 text-left font-normal text-ink"
                      >
                        {row.service}
                        {row.note ? (
                          <span className="mt-0.5 block text-sm text-muted">
                            {row.note}
                          </span>
                        ) : null}
                      </th>
                      <td className="nums py-4 text-right align-top whitespace-nowrap text-ink">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            <p className="mt-8 text-sm text-muted">
              Prices include VAT. Call{" "}
              <a
                href={telHref(site.phone)}
                className="nums link-underline text-body hover:text-ink"
              >
                {site.phone}
              </a>{" "}
              if you need something that is not listed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
