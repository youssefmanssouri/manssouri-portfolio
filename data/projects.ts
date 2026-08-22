export interface Project {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  categoryFr: string;
  shortDescription: string;
  shortDescriptionFr: string;
  longDescription: string;
  longDescriptionFr: string;
  overview: string;
  overviewFr: string;
  objective: string;
  objectiveFr: string;
  technologies: string[];
  features: string[];
  featuresFr: string[];
  heroImage: string;
  galleryImages: string[];
  githubUrl: string;
  liveUrl?: string;
  hasLiveDemo: boolean;
  featured: boolean;
  order: number;
}

export const PROJECTS: Project[] = [
  {
    id: "businessos",
    slug: "businessos",
    name: "BusinessOS",
    title: "BusinessOS — All-in-One SaaS Platform",
    category: "SAAS · BUSINESS PLATFORM",
    categoryFr: "SAAS · PLATEFORME D'ENTREPRISE",
    shortDescription: "A multi-module business platform designed to centralize essential business operations in one system.",
    shortDescriptionFr: "Une plateforme de gestion modulaire conçue pour centraliser les principales opérations d'une entreprise au sein d'un même environnement.",
    longDescription: "BusinessOS integrates executive dashboards, CRM pipelines, financial invoicing, service bookings, employee directory management, task tracking, inventory vaults, and cash flow analytics into a unified, high-performance web platform.",
    longDescriptionFr: "BusinessOS réunit tableaux de bord décisionnels, pipeline CRM, facturation financière, gestion de rendez-vous, annuaire RH, suivi des tâches, stock d'inventaire et analyse de trésorerie au sein d'une plateforme web unifiée et performante.",
    overview: "BusinessOS addresses operational fragmentation by unifying CRM, invoicing, resource bookings, HR management, and financial reporting into a cohesive command center with role-based access control.",
    overviewFr: "BusinessOS résout la fragmentation opérationnelle en unifiant CRM, facturation, réservations, gestion RH et rapports financiers dans un centre de contrôle intuitif avec gestion des accès par rôle.",
    objective: "Architect a robust multi-tenant SaaS application that displays dense operational and financial data with clean visual hierarchy, low-latency client rendering, and responsive controls.",
    objectiveFr: "Architecturer une application SaaS multi-tenant capable de traiter des données financières et opérationnelles denses avec une hiérarchie visuelle claire et une ergonomie irréprochable.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Recharts",
      "Framer Motion"
    ],
    features: [
      "Executive Dashboard with live revenue KPIs & activity telemetry",
      "CRM & Sales Pipeline with multi-stage deal tracking",
      "Itemized Invoicing engine with payment status monitoring",
      "Client appointment booking calendar & resource management",
      "Employee Directory with department tracking & role-based permissions",
      "Real-time Cash Flow ledger & multidimensional Recharts analytics"
    ],
    featuresFr: [
      "Tableau de bord exécutif avec KPI financiers en temps réel",
      "CRM & Pipeline commercial avec suivi multi-étapes des opportunités",
      "Moteur de facturation détaillée avec suivi des statuts de paiement",
      "Calendrier de réservation de rendez-vous clients et gestion de ressources",
      "Annuaire RH avec fiches employés et gestion des rôles (RBAC)",
      "Analyse de trésorerie en temps réel & graphiques Recharts interactifs"
    ],
    heroImage: "/images/projects/businessos-main.jpg",
    galleryImages: [
      "/images/projects/businessos-main.jpg",
      "/images/projects/businessos-crm.jpg",
      "/images/projects/businessos-invoicing.jpg",
      "/images/projects/businessos-calendar.jpg"
    ],
    githubUrl: "https://github.com/b91749533-sys/business-os",
    liveUrl: "https://business-os-manssouri.vercel.app",
    hasLiveDemo: true,
    featured: true,
    order: 1
  },
  {
    id: "lumiere-parfums",
    slug: "lumiere-parfums",
    name: "Lumière Parfums",
    title: "Lumière Parfums — Luxury E-Commerce Experience",
    category: "LUXURY E-COMMERCE",
    categoryFr: "E-COMMERCE HAUT DE GAMME",
    shortDescription: "A luxury e-commerce experience built around product discovery, shopping and online store management.",
    shortDescriptionFr: "Une expérience e-commerce haut de gamme pensée autour de la découverte des produits, de l'achat en ligne et de la gestion de boutique.",
    longDescription: "Lumière Parfums is a bespoke digital fragrance house featuring interactive note-profile filtering, high-definition product galleries, persistent cart management, customer accounts, and an administration portal.",
    longDescriptionFr: "Lumière Parfums est une boutique numérique sur mesure dédiée à la haute parfumerie, offrant un filtrage interactif des notes olfactives, des galeries produits haute définition, un panier persistant et un espace d'administration.",
    overview: "Designed for niche fragrance connoisseurs, Lumière Parfums combines editorial storytelling with seamless checkout mechanics and inventory management.",
    overviewFr: "Conçu pour les connaisseurs de parfumerie de niche, Lumière Parfums associe narration de marque et tunnel de commande sans friction avec gestion des stocks.",
    objective: "Build a high-converting luxury storefront that prioritizes visual elegance, swift catalog filtering, responsive cart interaction, and robust stock administration.",
    objectiveFr: "Développer une boutique en ligne haut de gamme privilégiant l'élégance visuelle, le filtrage rapide du catalogue et une expérience d'achat fluide.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL"
    ],
    features: [
      "Dynamic fragrance catalog with olfactive notes & accords filtering",
      "High-definition product imagery with real perfume house assets",
      "Persistent slide-out cart drawer with instant checkout flow",
      "Customer account dashboard & order history tracking",
      "Admin store portal for stock levels, product updates & sales logs"
    ],
    featuresFr: [
      "Catalogue dynamique avec filtres par notes olfactives et accords",
      "Visuels produits haute définition issus des maisons de parfum réelles",
      "Tiroir de panier persistant et tunnel de commande optimisé",
      "Espace client sécurisé avec suivi de l'historique des commandes",
      "Panneau d'administration des stocks, produits et rapports de vente"
    ],
    heroImage: "/images/projects/lumiere-main.jpg",
    galleryImages: [
      "/images/projects/lumiere-main.jpg",
      "/images/projects/lumiere-catalog.jpg",
      "/images/projects/lumiere-cart.jpg",
      "/images/projects/lumiere-admin.jpg"
    ],
    githubUrl: "https://github.com/b91749533-sys/lumiere-parfums",
    liveUrl: "https://lumiere-parfums-mu.vercel.app/",
    hasLiveDemo: true,
    featured: true,
    order: 2
  },
  {
    id: "gym-crm",
    slug: "gym-crm",
    name: "Gym CRM",
    title: "Gym CRM — Fitness Facility Management",
    category: "BUSINESS APPLICATION · CRM",
    categoryFr: "APPLICATION MÉTIER · GESTION DE SALLE",
    shortDescription: "A full-stack gym management platform designed to centralize members, operations, payments and day-to-day workflows.",
    shortDescriptionFr: "Une plateforme complète de gestion pour salles de sport, conçue pour centraliser les adhérents, les opérations, les paiements et les activités quotidiennes.",
    longDescription: "Gym CRM provides fitness center managers and front-desk staff with instant member check-ins, membership renewal tracking, class scheduling, trainer management, and financial revenue reporting.",
    longDescriptionFr: "Gym CRM offre aux gestionnaires de salles de sport et hôtes d'accueil un outil rapide pour les pointages, le suivi des réabonnements, le planning des cours, la gestion des coachs et le chiffre d'affaires.",
    overview: "Engineered to handle high-frequency member verification and daily gym workflows, Gym CRM eliminates manual paperwork and speeds up reception check-ins.",
    overviewFr: "Développé pour gérer les pointages à haute fréquence et les opérations quotidiennes, Gym CRM numérise l'ensemble de l'activité des clubs de sport.",
    objective: "Build a reliable high-density portal that delivers sub-second member lookups, clear membership alert states, and comprehensive revenue analytics.",
    objectiveFr: "Concevoir un portail d'administration réactif offrant une recherche de membres en quelques millisecondes, des alertes de statut claires et des rapports financiers.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Chart.js"
    ],
    features: [
      "Member management database with renewal alert indicators",
      "Rapid ID/Barcode check-in system for reception desks",
      "Class scheduling & coach booking capacity matrix",
      "Financial reporting tracking monthly recurring revenue (MRR)",
      "Role-based access permissions for staff and management"
    ],
    featuresFr: [
      "Gestionnaire d'adhérents avec alerte visuelle d'expiration du forfait",
      "Système de pointage rapide à l'accueil pour les réceptions",
      "Planning des cours collectifs et suivi des jauges d'inscriptions",
      "Rapports financiers du chiffre d'affaires récurrent mensuel (MRR)",
      "Matrice de droits et permissions selon les rôles du personnel"
    ],
    heroImage: "/images/projects/gymcrm-main.jpg",
    galleryImages: [
      "/images/projects/gymcrm-main.jpg",
      "/images/projects/gymcrm-members.jpg",
      "/images/projects/gymcrm-classes.jpg"
    ],
    githubUrl: "https://github.com/b91749533-sys/gym-crm",
    hasLiveDemo: false,
    featured: true,
    order: 3
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
