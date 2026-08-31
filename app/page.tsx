import { EquipmentShowcase } from "@/components/EquipmentShowcase";
import { FactsStrip } from "@/components/FactsStrip";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { LocationSwitcher } from "@/components/LocationSwitcher";
import { Marquee } from "@/components/Marquee";
import { PlanSwitcher } from "@/components/PlanSwitcher";
import { CtaBand } from "@/components/CtaBand";
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
  telephone: location.phone,
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

      {/*
       * Trak dejstev in lokacije stojita v skupnem ovoju, ker je ovoj tudi
       * vsebovalni blok lepljivega traku: trak tako spremlja obiskovalca skozi
       * tri fitnese in se sprosti, ko se sekcija konča. Brez ovoja bi ostal
       * prilepljen do konca strani in trajno pojedel 80 px zaslona.
       */}
      <div>
        <FactsStrip />
        <LocationSwitcher />
      </div>

      <Marquee />
      <EquipmentShowcase />
      <Gallery sectionIndex={3} />
      <PlanSwitcher sectionIndex={4} showAllLink />

      <CtaBand
        title="Pridi pogledat"
        body="Med urami recepcije se oglasi na ogled, ali pa kupi dnevno vstopnico za 15 € in prostor preizkusi zares."
      />
    </>
  );
}
