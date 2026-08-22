export interface TechCategory {
  category: string;
  description: string;
  items: {
    name: string;
    description: string;
    icon?: string;
  }[];
}

export const TECHNOLOGIES: TechCategory[] = [
  {
    category: "Frontend",
    description: "Building responsive, fast, and accessible user interfaces.",
    items: [
      { name: "HTML", description: "Semantic, accessible web page structure" },
      { name: "CSS", description: "Modern layouts, Flexbox, Grid, and animations" },
      { name: "JavaScript", description: "Dynamic client-side application logic" },
      { name: "TypeScript", description: "Typed JavaScript for scalable applications" },
      { name: "React", description: "Component-driven user interface development" },
      { name: "Next.js", description: "Production React framework with SSR and App Router" },
      { name: "Tailwind CSS", description: "Utility-first design systems and custom styling" }
    ]
  },
  {
    category: "Backend",
    description: "Architecting reliable server-side logic and RESTful APIs.",
    items: [
      { name: "Node.js", description: "Event-driven asynchronous JavaScript runtime" },
      { name: "Django", description: "High-level Python web framework for clean APIs" },
      { name: "Laravel", description: "Elegant PHP framework for web application backends" }
    ]
  },
  {
    category: "Database",
    description: "Designing efficient data models and storage solutions.",
    items: [
      { name: "PostgreSQL", description: "Powerful open-source relational database" }
    ]
  },
  {
    category: "Tools & Environment",
    description: "Development workflow, version control, and containerization.",
    items: [
      { name: "Git", description: "Distributed version control system" },
      { name: "GitHub", description: "Code hosting, collaboration, and deployment pipeline" },
      { name: "Docker", description: "Containerized environments for consistent deployment" },
      { name: "VS Code", description: "Primary development code editor and tooling environment" }
    ]
  }
];
