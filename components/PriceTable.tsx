import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceList } from "@/lib/pricing";

export function PriceTable() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page">
        <SectionHeading title="Complete Price List" />

        {/* Scrolls inside its own container rather than widening the page. */}
        <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-2xl border border-line shadow-[0_2px_24px_rgba(15,23,41,0.05)]">
          <table className="w-full min-w-[28rem] border-collapse text-left">
            <caption className="sr-only">
              Full price list for memberships, personal training, group classes and
              additional services
            </caption>
            <thead>
              <tr className="bg-ink text-white">
                <th scope="col" className="px-6 py-5 text-base font-bold">
                  Service
                </th>
                <th scope="col" className="px-6 py-5 text-right text-base font-bold">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((row) => (
                <tr
                  key={row.service}
                  className="border-t border-line first:border-t-0"
                >
                  <th
                    scope="row"
                    className={[
                      "px-6 py-5 text-left",
                      row.emphasis
                        ? "font-bold text-ink"
                        : "font-normal text-ink/80",
                    ].join(" ")}
                  >
                    {row.service}
                  </th>
                  <td
                    className={[
                      "px-6 py-5 text-right whitespace-nowrap",
                      row.emphasis
                        ? "font-bold text-ink"
                        : "font-normal text-ink/80",
                    ].join(" ")}
                  >
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
