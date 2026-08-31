import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StickyCallBar } from "@/components/StickyCallBar";
import { RevealRoot } from "@/components/motion/RevealRoot";
import { site } from "@/lib/site";

import "./globals.css";

/*
 * `latin-ext` ni izbira ampak pogoj: podnabor `latin` NE vsebuje č, š in ž.
 * Brez njega bi se šumniki risali iz sistemske nadomestne pisave, torej vidno
 * druge črke sredi besede.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

/*
 * Archivo za naslove. Naložena kot variabilna z osjo širine (wdth 62–125), da
 * displej stopnje v globals.css lahko uporabijo kondenzirano različico iste
 * družine — brez druge pisave in brez dodatnega zahtevka. Kondenzacija je tudi
 * funkcionalna: slovenski nizi so ~15–20 % daljši od angleških.
 */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — fitnes 24/7 v Hrastniku, Zagorju in Sevnici`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fitnes",
    "fitnes 24/7",
    "telovadnica",
    "Hrastnik",
    "Zagorje ob Savi",
    "Sevnica",
    "Zasavje",
    "Posavje",
    "osebni trening",
    "skupinske vadbe",
    "savna",
    "članarina",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "sl_SI",
    url: site.url,
    title: `${site.name} — odprto 24 ur, tri lokacije`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
  width: "device-width",
  initialScale: 1,
};

/** Organizacija — vezni člen med tremi lokacijami na domači strani. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: new URL("/images/logo.png", site.url).toString(),
  telephone: site.phone,
  foundingDate: String(site.founded),
  areaServed: ["Zasavje", "Posavje"],
  sameAs: ["https://instagram.com", "https://facebook.com", "https://tiktok.com"],
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
      className={`${inter.variable} ${archivo.variable}`}
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
        >
          Na vsebino
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <StickyCallBar />
        <RevealRoot />
      </body>
    </html>
  );
}
