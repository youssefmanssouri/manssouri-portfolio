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
    subtitle: "Understanding the problem & requirements",
    description:
      "Begin by analyzing the operational context, user workflows, core requirements, and technical scope to ensure a solid foundation.",
    details: [
      "Operational context & problem definition",
      "User workflow and journey analysis",
      "Technical scoping & feature prioritization"
    ]
  },
  {
    step: "02",
    title: "Structure",
    subtitle: "Architecture & data modeling",
    description:
      "Map out product flows, database schemas, API contracts, and user interactions before writing code.",
    details: [
      "Relational schema & data modeling",
      "API endpoints & state architecture",
      "Interface structure & visual hierarchy"
    ]
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Full-stack implementation",
    description:
      "Engineer the digital product using modern technologies like Next.js, React, TypeScript, Tailwind CSS, and Prisma ORM.",
    details: [
      "Type-safe component engineering",
      "Backend, database & auth integration",
      "Interaction polish & responsive styling"
    ]
  },
  {
    step: "04",
    title: "Refine",
    subtitle: "Testing & verification",
    description:
      "Thoroughly inspect functionality, cross-device responsiveness, security barriers, performance metrics, and edge cases.",
    details: [
      "Cross-device mobile & tablet verification",
      "Input validation & defensive safeguards",
      "Performance & SEO vitals audit"
    ]
  },
  {
    step: "05",
    title: "Deploy",
    subtitle: "Production release & monitoring",
    description:
      "Configure production hosting on Vercel, domain DNS, SSL security, analytics telemetry, and verify live application health.",
    details: [
      "Production deployment configuration",
      "DNS, SSL & security header validation",
      "Telemetry & analytics verification"
    ]
  }
];
