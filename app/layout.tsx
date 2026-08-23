import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/site";

import "./globals.css";

/* Inter for interface and body copy. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/*
 * Archivo for headings. Its squarer shoulders and tighter apertures give
 * headlines a signage quality at display sizes that Inter does not have, which
 * is what lets the type carry the design without uppercase or weight 900.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 24-hour gym in Hrastnik, Zagorje & Sevnica`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "gym",
    "fitness",
    "24 hour gym",
    "Hrastnik",
    "Zagorje",
    "Sevnica",
    "Zasavje",
    "personal training",
    "fitnes",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: site.url,
    title: `${site.name} — open 24 hours, three locations`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
