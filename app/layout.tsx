import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site, labels } from "@/lib/content";
import { LoadingScreen } from "./components/loading-screen";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

const description = `${site.name} — ${site.role}. ${site.description}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.role}`,
  description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: site.url,
  },
};

const loadingName = site.shortName;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen name={loadingName} label={labels.loading} />
        {children}
      </body>
    </html>
  );
}
