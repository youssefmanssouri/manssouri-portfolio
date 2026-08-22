export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: "business-websites",
    number: "01",
    title: "Business Websites",
    tagline: "High-impact digital front doors engineered for credibility and conversion.",
    description:
      "Modern, responsive websites tailored for restaurants, cafés, local businesses, professional agencies, and growing startups looking to stand out.",
    bullets: [
      "Tailored UI/UX design matching your brand identity",
      "Mobile-first responsive architecture across all screen sizes",
      "Fast page load performance & core web vitals optimization",
      "Search Engine Optimization (SEO) setup & meta tags",
      "Content structure designed to guide visitors into leads"
    ],
    deliverables: [
      "Custom Multi-page Website",
      "Mobile Responsive Layouts",
      "SEO & Analytics Integration",
      "CMS / Content Management"
    ]
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Landing Pages",
    tagline: "Laser-focused single-page experiences built to drive specific user actions.",
    description:
      "High-converting landing pages built for product launches, targeted services, marketing campaigns, and personal brands.",
    bullets: [
      "Persuasive visual structure emphasizing core value propositions",
      "Strategic CTA placement for maximum conversion rate",
      "Subtle animations and micro-interactions that keep users engaged",
      "Lightning-fast load speed for ad campaigns & social traffic",
      "Form integration with lead capture & email notifications"
    ],
    deliverables: [
      "Single-page Conversion Funnel",
      "Interactive Product Displays",
      "Lead Capture & Form Handling",
      "Speed & Performance Audit"
    ]
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Applications",
    tagline: "Custom digital tools and platforms designed around complex business operations.",
    description:
      "Tailored web systems including administrative dashboards, client portals, internal management tools, and booking engines.",
    bullets: [
      "Custom database design and backend architecture",
      "Role-based access control (Admin, Staff, Client views)",
      "Interactive data visualizations, charts, and report generation",
      "RESTful API integration & third-party service connections",
      "Intuitive UI created for high daily productivity"
    ],
    deliverables: [
      "Custom Dashboard / Portal",
      "Database Architecture",
      "User Authentication System",
      "Interactive Reports & Charts"
    ]
  },
  {
    id: "e-commerce",
    number: "04",
    title: "E-commerce Solutions",
    tagline: "Seamless online shopping platforms engineered for frictionless buying.",
    description:
      "Full-stack online stores equipped with rich product catalogs, custom cart workflows, checkout integrations, and admin inventory control.",
    bullets: [
      "Custom product catalog layouts with multi-attribute filtering",
      "Frictionless cart & checkout user experience",
      "Admin inventory management and order tracking portal",
      "Customer account portals with past purchase records",
      "Secure payment processing integration & tax workflows"
    ],
    deliverables: [
      "Online Storefront",
      "Product Catalog & Filtering",
      "Shopping Cart & Checkout",
      "Store Administration Panel"
    ]
  }
];
