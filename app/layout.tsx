import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/lib/i18n/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manssouri.dev"),
  title: "Youssef Manssouri — Web Developer | Développeur Web | Agadir, Morocco",
  description:
    "Youssef Manssouri is a web developer based in Agadir, Morocco. Building modern websites and web applications for ambitious businesses.",
  keywords: [
    "Youssef Manssouri",
    "Web Developer",
    "Développeur Web",
    "Agadir Morocco Developer",
    "Développeur Web Agadir",
    "Freelance Web Developer Morocco",
    "Web Applications",
    "SaaS Development",
    "E-commerce Websites",
    "Next.js Developer",
    "TypeScript Developer"
  ],
  authors: [{ name: "Youssef Manssouri", url: "https://manssouri.dev" }],
  creator: "Youssef Manssouri",
  alternates: {
    canonical: "https://manssouri.dev",
    languages: {
      "en": "https://manssouri.dev",
      "fr": "https://manssouri.dev",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://manssouri.dev",
    title: "Youssef Manssouri — Web Developer | Développeur Web",
    description:
      "Building modern websites and web applications for ambitious businesses.",
    siteName: "Youssef Manssouri Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Youssef Manssouri",
  "jobTitle": "Web Developer",
  "url": "https://manssouri.dev",
  "email": "mailto:manssouriyoussef33@gmail.com",
  "telephone": "+212656682813",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Agadir",
    "addressCountry": "Morocco"
  },
  "sameAs": [
    "https://github.com/b91749533-sys",
    "https://www.linkedin.com/in/youssef-manssouri-24b4662ba/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="bg-[#F3EFEA] text-[#242222] antialiased font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
