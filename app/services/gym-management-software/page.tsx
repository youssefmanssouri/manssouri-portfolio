import React from "react";
import type { Metadata } from "next";
import { GymManagementLandingClient } from "./client";

export const metadata: Metadata = {
  title: "Gym Management Software Morocco — Member & Reception System | Youssef Manssouri",
  description:
    "Custom gym management software for fitness clubs in Morocco. Member management, reception check-in, subscription tracking, attendance tracking, and operational tools.",
  keywords: [
    "gym management software Morocco",
    "logiciel de gestion salle de sport Maroc",
    "gym management software Agadir",
    "logiciel gestion adhérents salle de sport",
    "gym check-in software",
    "système de pointage salle de sport",
    "fitness club CRM Morocco",
    "gestion abonnements gym Maroc",
    "développeur web Agadir",
    "Gym CRM",
    "Youssef Manssouri"
  ],
  authors: [{ name: "Youssef Manssouri", url: "https://www.youssefmanssouri.site" }],
  creator: "Youssef Manssouri",
  alternates: {
    canonical: "https://www.youssefmanssouri.site/services/gym-management-software",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://www.youssefmanssouri.site/services/gym-management-software",
    title: "Gym Management Software Morocco — Member & Reception System",
    description:
      "Custom gym management software for fitness clubs in Morocco. Member management, reception check-in, subscription tracking, attendance tracking, and operational tools.",
    siteName: "Youssef Manssouri",
    images: [
      {
        url: "/images/projects/gymcrm-main.jpg",
        width: 1200,
        height: 675,
        alt: "Gym CRM — Operations & Member Management Platform Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Management Software Morocco — Member & Reception System",
    description:
      "Custom gym management software for fitness clubs in Morocco. Member management, reception check-in, subscription tracking, attendance tracking, and operational tools.",
    images: ["/images/projects/gymcrm-main.jpg"],
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
};

const landingPageGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.youssefmanssouri.site/services/gym-management-software#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.youssefmanssouri.site"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Capabilities",
          "item": "https://www.youssefmanssouri.site/#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Gym Management Software",
          "item": "https://www.youssefmanssouri.site/services/gym-management-software"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.youssefmanssouri.site/services/gym-management-software#webpage",
      "url": "https://www.youssefmanssouri.site/services/gym-management-software",
      "name": "Gym Management Software Morocco — Member & Reception System",
      "description": "Custom gym management software for fitness clubs in Morocco. Member management, reception check-in, subscription tracking, attendance tracking, and operational tools.",
      "inLanguage": ["en-US", "fr-FR"],
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.youssefmanssouri.site/#website"
      },
      "about": {
        "@type": "Person",
        "@id": "https://www.youssefmanssouri.site/#identity"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.youssefmanssouri.site/services/gym-management-software#software",
      "name": "Gym CRM Prototype",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "url": "https://gym-crm-mauve.vercel.app/",
      "author": {
        "@type": "Person",
        "@id": "https://www.youssefmanssouri.site/#identity"
      },
      "featureList": [
        "Front-desk reception check-in terminal",
        "Member directory with Active, Expired, and Suspended status tracking",
        "Operational reporting and CSV data export",
        "Monthly recurring revenue and attendance visualizations"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.youssefmanssouri.site/services/gym-management-software#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is custom gym management software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a web-based operational system designed specifically around a gym's reception, membership verification, and attendance tracking workflows, avoiding the clutter of generic off-the-shelf software."
          }
        },
        {
          "@type": "Question",
          "name": "Can the system be customized for my gym's specific rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Because each installation is configured from a modular codebase, membership durations, grace periods, access rules, and staff roles can be adjusted to match your exact rules."
          }
        },
        {
          "@type": "Question",
          "name": "Can you migrate existing member data from Excel spreadsheets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Existing member data from Excel or CSV can be prepared and migrated into a customized deployment as part of assisted onboarding. The current prototype provides CSV export rather than a self-service spreadsheet import interface."
          }
        },
        {
          "@type": "Question",
          "name": "Can reception staff use the system on a tablet or phone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The entire system is built with responsive web standards and works seamlessly on reception desktop monitors, laptops, tablets, and smartphones without requiring app store installations."
          }
        },
        {
          "@type": "Question",
          "name": "How much does custom gym management software cost in Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost depends on the number of modules, integrations, data migration requirements, and customization level. Contact me to discuss the scope."
          }
        }
      ]
    }
  ]
};

export default function GymManagementServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageGraphJsonLd) }}
      />
      <GymManagementLandingClient />
    </>
  );
}
