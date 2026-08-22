export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Understanding business & goals",
    description:
      "We begin by defining your business objectives, target audience, core features, and project scope to ensure every decision aligns with your business goals.",
    details: [
      "Requirements gathering & goal alignment",
      "Target audience definition",
      "Feature prioritization & technical scoping"
    ]
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Architecture & structure",
    description:
      "Map out site architecture, user journeys, navigation flow, database schemas, and technical stack selection before writing code.",
    details: [
      "Sitemap & user journey mapping",
      "Database schema & API planning",
      "Content strategy & structural layout"
    ]
  },
  {
    step: "03",
    title: "Design",
    subtitle: "Visual direction & UI",
    description:
      "Create high-fidelity interfaces, component design systems, typography hierarchy, and interactive states tailored to your brand personality.",
    details: [
      "Modern dark/light interface concepts",
      "Component library & typography system",
      "Interactive prototype review"
    ]
  },
  {
    step: "04",
    title: "Develop",
    subtitle: "Clean code & integration",
    description:
      "Build the web solution using modern technologies like Next.js, React, TypeScript, and Tailwind CSS. Clean, maintainable, modular codebase.",
    details: [
      "Responsive frontend component engineering",
      "Backend & database API integration",
      "Smooth animation & interaction polish"
    ]
  },
  {
    step: "05",
    title: "Test",
    subtitle: "Quality & responsiveness",
    description:
      "Rigorously inspect functionality, cross-browser compatibility, mobile responsiveness, accessibility standards, and page loading speed.",
    details: [
      "Cross-device mobile & tablet verification",
      "Form validation & edge-case testing",
      "Performance & SEO web vitals audit"
    ]
  },
  {
    step: "06",
    title: "Launch",
    subtitle: "Deployment & delivery",
    description:
      "Configure production hosting, domain DNS, SSL certificates, analytics tracking, and deliver full documentation for effortless operation.",
    details: [
      "Production deployment configuration",
      "Domain DNS & security setup",
      "Handover documentation & walkthrough"
    ]
  }
];
