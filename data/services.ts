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
    tagline: "High-impact digital front doors engineered for clarity and performance.",
    description:
      "Modern, responsive websites with structured content, clear navigation, and performance-optimized architecture.",
    bullets: [
      "Tailored UI/UX design matching organizational identity",
      "Mobile-first responsive architecture across all screen sizes",
      "Fast page load performance & core web vitals optimization",
      "Search Engine Optimization (SEO) setup & semantic meta tags",
      "Content structure designed to guide visitors intuitively"
    ],
    deliverables: [
      "Custom Multi-page Website",
      "Mobile Responsive Layouts",
      "SEO & Analytics Integration",
      "Structured Content Architecture"
    ]
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Landing Pages",
    tagline: "Laser-focused single-page experiences built around clear product narratives.",
    description:
      "Engaging landing pages built for digital products, service presentations, and focused marketing initiatives.",
    bullets: [
      "Structured visual hierarchy emphasizing core value propositions",
      "Strategic CTA placement for clear user interaction",
      "Subtle animations and micro-interactions that elevate engagement",
      "Fast load speed across desktop, tablet, and mobile devices",
      "Form handling with client validation & automated notification"
    ],
    deliverables: [
      "Single-page Product Showcase",
      "Interactive Interface Displays",
      "Lead Capture & Form Handling",
      "Speed & Performance Audit"
    ]
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Applications",
    tagline: "Custom digital tools and platforms designed around operational workflows.",
    description:
      "Tailored web systems including administrative dashboards, member management portals, and scheduling workflows.",
    bullets: [
      "Custom relational database schemas and backend architecture",
      "Role-based access control (Admin, Staff, Member views)",
      "Interactive data visualizations, charts, and report generation",
      "RESTful API endpoints & third-party service connections",
      "Intuitive UI engineered for high daily usability"
    ],
    deliverables: [
      "Custom Operational Dashboard",
      "Relational Database Architecture",
      "User Authentication System",
      "Interactive Reports & Charts"
    ]
  },
  {
    id: "e-commerce",
    number: "04",
    title: "E-commerce Solutions",
    tagline: "Seamless online shopping experiences engineered for exploration and conversion.",
    description:
      "Full-stack digital storefronts equipped with rich product catalogs, multi-attribute discovery, persistent carts, and admin controls.",
    bullets: [
      "Custom product catalog layouts with multi-attribute filtering",
      "Frictionless persistent cart & checkout user experience",
      "Admin catalog management and order overview portal",
      "Responsive interface optimized for touch devices",
      "Modern state management ensuring session continuity"
    ],
    deliverables: [
      "Online Storefront",
      "Product Catalog & Filtering",
      "Persistent Shopping Cart",
      "Store Administration Panel"
    ]
  }
];
