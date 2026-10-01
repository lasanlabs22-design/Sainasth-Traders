import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Serif_Telugu } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { showrooms, site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const telugu = Noto_Serif_Telugu({ subsets: ["telugu"], weight: ["400", "500"], variable: "--font-telugu-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["coffee machine Guntur", "coffee machine Vijayawada", "espresso machine Andhra Pradesh", "bean to cup machine", "commercial coffee machine", "coffee machine service Vijayawada"],
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
};

export const viewport: Viewport = {
  themeColor: "#1c120c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": showrooms.map((s) => ({
    "@type": "Store",
    name: `${site.name} — ${s.city}`,
    telephone: s.phone,
    address: { "@type": "PostalAddress", streetAddress: s.address.slice(0, 2).join(", "), addressLocality: s.city, addressRegion: "Andhra Pradesh", addressCountry: "IN" },
    openingHours: "Mo-Sa 10:00-20:30",
    url: site.url,
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable} ${telugu.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
