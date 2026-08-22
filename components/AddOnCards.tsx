import { SectionHeading } from "@/components/ui/SectionHeading";
import { addOnGroups } from "@/lib/pricing";

export function AddOnCards() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="container-page">
        <SectionHeading
          title="Additional Services & Add-ons"
          subtitle="Enhance your fitness journey with our premium services"
        />

        <ul className="mt-14 grid gap-8 lg:grid-cols-3">
          {addOnGroups.map((group) => (
            <li key={group.title}>
              <article className="h-full rounded-2xl border border-line bg-white p-8">
                <h3 className="text-2xl font-bold">{group.title}</h3>

                <ul className="mt-6 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-4 rounded-xl bg-surface px-5 py-4"
                    >
                      <div>
                        <p className="font-bold text-ink">{item.label}</p>
                        {item.save ? (
                          <p className="mt-0.5 text-sm text-coral">{item.save}</p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-2xl font-black whitespace-nowrap text-ink">
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
