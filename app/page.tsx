import { CtaBand } from "@/components/CtaBand";
import { EquipmentShowcase } from "@/components/EquipmentShowcase";
import { FactsStrip } from "@/components/FactsStrip";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { LocationSwitcher } from "@/components/LocationSwitcher";
import { PricingPreview } from "@/components/PricingPreview";
import { TrainingTeaser } from "@/components/TrainingTeaser";
import { eur } from "@/lib/i18n";
import { fromPrice } from "@/lib/pricing";
import { locations, site } from "@/lib/site";

/**
 * Vsak fitnes kot svoja lokacija — za lokalno iskanje je to najbolj vreden
 * strukturiran podatek, ki ga stran doslej ni imela. Odprtost 24/7 je zapisana
 * kot en sam interval od 00.00 do 23.59 za vse dni, kar je oblika, ki jo
 * schema.org pričakuje.
 */
const locationSchema = locations.map((location) => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: `${site.name} ${location.name}`,
  parentOrganization: { "@type": "Organization", name: site.name, url: site.url },
  url: site.url,
  telephone: location.phone ?? site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: location.address,
    addressCountry: "SI",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  amenityFeature: location.amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  })),
}));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Vsebina je statična in zapisana v lib/site.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      <Hero />
      <FactsStrip />
      <LocationSwitcher />
      <EquipmentShowcase sectionIndex={2} />
      <PricingPreview sectionIndex={3} />
      <TrainingTeaser sectionIndex={4} />
      <Gallery sectionIndex={5} />

      <CtaBand
        title="Kako se vpišeš"
        body={`Pokliči ali piši in se dogovorimo za termin. Če želiš prostor najprej preizkusiti, je enkratni obisk ${eur(
          fromPrice,
        )}.`}
      />
    </>
  );
}
