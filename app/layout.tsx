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
  metadataBase: new URL("https://www.youssefmanssouri.site"),
  title: "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
  description:
    "Business Analytics & AI student at EMAA Business School building practical digital products at the intersection of business, technology, data, and AI.",
  keywords: [
    "Youssef Manssouri",
    "Business Analytics & AI Student",
    "Digital Product Builder",
    "Web Developer Agadir",
    "Développeur Web Agadir Morocco",
    "Next.js Developer",
    "TypeScript Developer",
    "Prisma Developer",
    "Business Applications",
    "SaaS Development"
  ],
  authors: [{ name: "Youssef Manssouri", url: "https://www.youssefmanssouri.site" }],
  creator: "Youssef Manssouri",
  alternates: {
    canonical: "https://www.youssefmanssouri.site",
    languages: {
      "en": "https://www.youssefmanssouri.site",
      "fr": "https://www.youssefmanssouri.site",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://www.youssefmanssouri.site",
    title: "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
    description:
      "Business Analytics & AI student at EMAA Business School building practical digital products at the intersection of business, technology, data, and AI.",
    siteName: "Youssef Manssouri Portfolio",
    images: [
      {
        url: "/images/projects/businessos-main.jpg",
        width: 1200,
        height: 675,
        alt: "BusinessOS - Flagship Web Application by Youssef Manssouri",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=2"],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png?v=2",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Youssef Manssouri",
  "jobTitle": "Digital Product Builder & Business Analytics Student",
  "url": "https://www.youssefmanssouri.site",
  "email": "mailto:manssouriyoussef33@gmail.com",
  "telephone": "+212656682813",
  "description": "Business Analytics & AI student at EMAA Business School building practical web applications, e-commerce storefronts, and operational SaaS tools with Next.js and TypeScript.",
  "image": "https://www.youssefmanssouri.site/images/projects/businessos-main.jpg",
  "affiliation": {
    "@type": "EducationalOrganization",
    "name": "EMAA Business School",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Agadir",
      "addressCountry": "Morocco"
    }
  },
  "knowsAbout": [
    "Business Analytics",
    "Artificial Intelligence",
    "Web Application Architecture",
    "Next.js",
    "TypeScript",
    "Prisma ORM",
    "SaaS Development"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Agadir",
    "addressCountry": "Morocco"
  },
  "sameAs": [
    "https://github.com/youssefmanssouri",
    "https://www.linkedin.com/in/youssef-manssouri-24b4662ba/"
  ]
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
  "url": "https://www.youssefmanssouri.site",
  "description": "Official portfolio of Youssef Manssouri featuring case studies, full-stack web applications, e-commerce storefronts, and operational tools built with Next.js, TypeScript, and Prisma.",
  "publisher": {
    "@type": "Person",
    "name": "Youssef Manssouri"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="bg-[#F3EFEA] text-[#242222] antialiased font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#3A171C] focus:text-[#F3EFEA] focus:px-4 focus:py-2 focus:rounded-xs focus:ring-2 focus:ring-[#A65F4B] focus:outline-none text-xs font-mono font-semibold uppercase tracking-wider shadow-xl"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
