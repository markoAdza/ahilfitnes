import type { Metadata, Viewport } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";

import { Footer } from "@/components/Footer";
import { JoinDialog } from "@/components/JoinDialog";
import { Navbar } from "@/components/Navbar";
import { StickyJoinBar } from "@/components/StickyJoinBar";
import { RevealRoot } from "@/components/motion/RevealRoot";
import { forms, listSl, pluralize } from "@/lib/i18n";
import { locations, site } from "@/lib/site";

const regions = [...new Set(locations.map((location) => location.region))];

import "./globals.css";

/*
 * `latin-ext` ni izbira ampak pogoj: podnabor `latin` NE vsebuje č, š in ž.
 * Brez njega bi se šumniki risali iz sistemske nadomestne pisave, torej vidno
 * druge črke sredi besede.
 *
 * Archivo za vse besedilo. Naložena kot variabilna z osjo širine (wdth 62–125),
 * da displej stopnje v globals.css uporabijo kondenzirano različico iste
 * družine, tekoče besedilo pa normalno širino — ena pisava, en zahtevek.
 * Kondenzacija je tudi funkcionalna: slovenski nizi so ~15–20 % daljši od
 * angleških.
 */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/*
 * Cormorant Garamond samo v kurzivi — klasični naglas (rimske številke,
 * nadnapisi, "fitnes" v heroju). Pokončni rez se na strani ne pojavi, zato ga
 * ne nalagamo.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — fitnes 24/7 v ${listSl(
      locations.map((location) => location.locative),
    )}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fitnes",
    "fitnes 24/7",
    "telovadnica",
    ...locations.map((location) => location.name),
    ...regions,
    "osebni trener",
    "cenik fitnes",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "sl_SI",
    url: site.url,
    title: `${site.name} — odprto 24 ur, ${pluralize(locations.length, forms.lokacija)}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organizacija — vezni člen med lokacijami na domači strani. `sameAs` manjka,
 * dokler stranka ne sporoči pravih profilov na družbenih omrežjih.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: new URL("/images/logo.png", site.url).toString(),
  telephone: site.phone,
  email: site.email,
  areaServed: regions,
};

/*
 * Oborožitev odkrivanja ob drsenju. Teče še med razčlenjevanjem HTML-ja, torej
 * PRED izrisom vsebine pod njo — zato ni utripa iz vidnega v skrito. Če je
 * vklopljeno zmanjšano gibanje ali brskalnik ne pozna IntersectionObserverja,
 * se ne postavi nič in vsebina je od začetka vidna.
 */
const armReveal = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window){document.documentElement.setAttribute("data-reveal-armed","")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sl"
      className={`${archivo.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: armReveal }} />
        <script
          type="application/ld+json"
          // Vsebina je statična in zapisana v lib/site.ts.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-[2px] focus:bg-accent-bright focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
        >
          Na vsebino
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <StickyJoinBar />
        <JoinDialog />
        <RevealRoot />
      </body>
    </html>
  );
}
