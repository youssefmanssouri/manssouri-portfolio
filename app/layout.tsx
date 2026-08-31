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
  applicationName: "Youssef Manssouri",
  appleWebApp: {
    title: "Youssef Manssouri",
    statusBarStyle: "default",
  },
  title: {
    default: "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
    template: "%s | Youssef Manssouri",
  },
  description:
    "Business Analytics & AI student at EMAA Business School building practical web applications, e-commerce storefronts, and operational SaaS tools with Next.js, TypeScript, and Prisma.",
  keywords: [
    "Youssef Manssouri",
    "Business Analytics & AI Student",
    "Digital Product Builder",
    "BusinessOS",
    "Next.js Developer",
    "TypeScript Developer",
    "Prisma ORM",
    "Agadir Morocco Developer",
    "EMAA Business School",
    "SaaS Architecture"
  ],
  authors: [{ name: "Youssef Manssouri", url: "https://www.youssefmanssouri.site" }],
  creator: "Youssef Manssouri",
  publisher: "Youssef Manssouri",
  alternates: {
    canonical: "https://www.youssefmanssouri.site",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://www.youssefmanssouri.site",
    title: "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
    description:
      "Business Analytics & AI student at EMAA Business School building practical web applications, e-commerce storefronts, and operational SaaS tools with Next.js, TypeScript, and Prisma.",
    siteName: "Youssef Manssouri",
    images: [
      {
        url: "/images/projects/businessos-main.jpg",
        width: 1200,
        height: 675,
        alt: "BusinessOS — Flagship Web Application by Youssef Manssouri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
    description:
      "Business Analytics & AI student at EMAA Business School building practical digital products with Next.js, TypeScript, and Prisma.",
    images: ["/images/projects/businessos-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const rootGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.youssefmanssouri.site/#identity",
      "name": "Youssef Manssouri",
      "givenName": "Youssef",
      "familyName": "Manssouri",
      "alternateName": ["Manssouri Youssef"],
      "jobTitle": "Business Analytics & AI Student · Digital Product Builder",
      "description": "Business Analytics & AI student at EMAA Business School building practical digital products, web applications, e-commerce storefronts, and operational SaaS tools with Next.js, TypeScript, and Prisma.",
      "url": "https://www.youssefmanssouri.site",
      "image": "https://www.youssefmanssouri.site/images/projects/businessos-main.jpg",
      "email": "mailto:manssouriyoussef33@gmail.com",
      "telephone": "+212656682813",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Agadir",
        "addressRegion": "Souss-Massa",
        "addressCountry": "Morocco"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "EMAA Business School",
        "url": "https://emaa.ma/",
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
        "React",
        "Prisma ORM",
        "PostgreSQL",
        "Tailwind CSS",
        "SaaS Product Engineering",
        "E-Commerce Architecture",
        "Data Modeling",
        "Role-Based Access Control (RBAC)"
      ],
      "sameAs": [
        "https://github.com/youssefmanssouri",
        "https://www.linkedin.com/in/youssef-manssouri-24b4662ba/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.youssefmanssouri.site/#website",
      "url": "https://www.youssefmanssouri.site",
      "name": "Youssef Manssouri Portfolio",
      "description": "Personal portfolio and engineering case studies of Youssef Manssouri, Business Analytics & AI student and Digital Product Builder.",
      "publisher": { "@id": "https://www.youssefmanssouri.site/#identity" },
      "creator": { "@id": "https://www.youssefmanssouri.site/#identity" },
      "inLanguage": ["en-US", "fr-FR"]
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.youssefmanssouri.site/#webpage",
      "url": "https://www.youssefmanssouri.site",
      "name": "Youssef Manssouri — Business Analytics & AI Student · Digital Product Builder",
      "isPartOf": { "@id": "https://www.youssefmanssouri.site/#website" },
      "about": { "@id": "https://www.youssefmanssouri.site/#identity" },
      "mainEntity": { "@id": "https://www.youssefmanssouri.site/#identity" },
      "description": "Personal portfolio and case studies of Youssef Manssouri.",
      "inLanguage": "en-US"
    }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootGraphJsonLd) }}
        />
      </head>
      <body className="bg-[#F3EFEA] text-[#242222] antialiased font-sans min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#3A171C] focus:text-[#F3EFEA] focus:px-4 focus:py-2 focus:rounded-xs focus:ring-2 focus:ring-[#A65F4B] focus:outline-none text-xs font-mono font-semibold uppercase tracking-wider shadow-xl"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-grow flex flex-col overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
