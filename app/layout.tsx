import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/** The one font: monospace, terminal, hacker. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

const description = `${site.name} — ${site.role}. ${site.intro}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050705",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ared.dev"),
  title: `${site.name} | ${site.role}`,
  description,
  authors: [{ name: site.name, url: "https://ared.dev" }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "https://ared.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: "https://ared.dev",
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
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
