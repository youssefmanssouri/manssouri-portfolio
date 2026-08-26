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
    icon: [{ url: "/brand/ym-monogram.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/ym-monogram.svg", type: "image/svg+xml" }],
  },
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
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
