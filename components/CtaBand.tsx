import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { site, telHref } from "@/lib/site";

/**
 * Slim closing band so content pages do not run straight into the footer.
 * Not present in the original design — an addition for a more finished feel.
 */
export function CtaBand({
  title,
  body,
  cta = "Join Now",
}: {
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <section className="on-dark bg-ink">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <p className="mt-2 text-white/70">{body}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <a
            href={telHref(site.phone)}
            className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-lime"
          >
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>
          <ButtonLink href={telHref(site.phone)} variant="lime" size="lg">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
