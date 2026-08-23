import { ButtonLink } from "@/components/ui/Button";
import { site, telHref } from "@/lib/site";

/**
 * Closing band so content pages do not run straight into the footer.
 */
export function CtaBand({
  title,
  body,
  cta = "Call to join",
}: {
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <section className="on-dark bg-ink">
      <div className="container-page flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:gap-16 md:py-20">
        <div className="max-w-xl">
          <h2 className="type-h2 text-white">{title}</h2>
          <p className="type-lede mt-4 text-white/70">{body}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={telHref(site.phone)} variant="light" size="lg">
            {cta}
          </ButtonLink>
          <a
            href={telHref(site.phone)}
            className="nums link-underline text-[0.9375rem] text-white/70 hover:text-white"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
