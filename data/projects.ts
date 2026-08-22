export interface Project {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  categoryFr: string;
  role: string;
  roleFr: string;
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
    title: "BusinessOS — Flagship All-in-One Business Operations Platform",
    category: "FLAGSHIP CASE STUDY · BUSINESS OPERATIONS",
    categoryFr: "ÉTUDE DE CAS PHARE · OPÉRATIONS D'ENTREPRISE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A unified business operations platform that centralizes CRM, invoicing, bookings, employees, tasks, finance, and analytics into one command center.",
    shortDescriptionFr: "Une plateforme d'opérations d'entreprise unifiée centralisant CRM, factures, rendez-vous, RH, tâches, trésorerie et analytics au sein d'un seul centre de contrôle.",
    longDescription: "BusinessOS addresses the inefficiency of fragmented SaaS stacks. Built with Next.js 15 App Router and React 19, it combines 7 core operational modules into a single zero-latency workspace powered by a 15-model Prisma relational schema, server-enforced RBAC, interactive Recharts telemetry, and isolated demo security guards.",
    longDescriptionFr: "BusinessOS résout l'inefficacité des outils SaaS morcelés. Développé avec Next.js 15 App Router et React 19, il réunit 7 modules opérationnels clés au sein d'un espace de travail réactif appuyé par un schéma relationnel Prisma de 15 modèles, un contrôle d'accès RBAC et une sécurisation des données en mode démonstration.",
    overview: "Fragmented operations force growing teams to juggle separate subscriptions for CRM, invoicing, appointment scheduling, employee records, and cash flow reporting. BusinessOS eliminates this friction through a unified operational command center.",
    overviewFr: "La fragmentation des opérations contraint les entreprises à jongler entre des outils séparés pour le CRM, la facturation, les rendez-vous, les RH et la trésorerie. BusinessOS élimine cette friction grâce à un centre de contrôle centralisé.",
    objective: "Architect a production-grade multi-tenant SaaS workspace delivering sub-second client navigation, dense financial data presentation, role-based access control (RBAC), and server-enforced demo environment protections.",
    objectiveFr: "Architecturer une application SaaS multi-tenant offrant une navigation fluide, une présentation claire des données financières, un contrôle d'accès par rôle (RBAC) et une sécurisation serveur en mode démo.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Prisma (15 Models)",
      "PostgreSQL",
      "Server Actions",
      "Recharts"
    ],
    features: [
      "Executive Command Center with live revenue KPIs & activity telemetry",
      "CRM & Sales Pipeline with multi-stage deal tracking & customer lookup",
      "Itemized Invoicing engine with automatic subtotal/tax calculations",
      "Client appointment booking calendar & resource capacity manager",
      "Employee Directory with department tracking & role-based permissions (RBAC)",
      "Real-time Cash Flow ledger & multidimensional Recharts analytics",
      "Kanban Task Workflow board with priority indicators & status updates",
      "Server-Enforced DEMO_MODE guard protecting database write paths"
    ],
    featuresFr: [
      "Centre de commande exécutif avec KPI de chiffre d'affaires et télémétrie",
      "CRM & Pipeline commercial avec suivi des opportunités et des fiches clients",
      "Moteur de facturation détaillée avec calcul automatique des taxes et sous-totaux",
      "Planning de réservation de rendez-vous clients et gestion des capacités",
      "Annuaire RH avec fiches employés et gestion des rôles d'accès (RBAC)",
      "Livre de trésorerie en temps réel & graphiques Recharts interactifs",
      "Tableau Kanban de suivi des tâches avec gestion des priorités",
      "Sécurisation serveur DEMO_MODE protégeant les parcours de modification"
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
    category: "COMMERCIAL WEB EXPERIENCE",
    categoryFr: "EXPÉRIENCE WEB COMMERCIALE",
    role: "Designed & Developed",
    roleFr: "Conception & Développement",
    shortDescription: "A refined e-commerce experience focused on product presentation, responsive design, and a smooth shopping interface.",
    shortDescriptionFr: "Une expérience e-commerce haut de gamme axée sur la présentation des produits, le design réactif et une interface d'achat fluide.",
    longDescription: "Lumière Parfums is a bespoke digital fragrance house featuring interactive note-profile filtering, high-definition product galleries, persistent cart management, customer accounts, and an administration portal.",
    longDescriptionFr: "Lumière Parfums est une boutique numérique sur mesure dédiée à la haute parfumerie, offrant un filtrage interactif des notes olfactives, des galeries produits haute définition, un panier persistant et un espace d'administration.",
    overview: "Designed for niche fragrance connoisseurs, Lumière Parfums combines editorial storytelling with seamless checkout mechanics and inventory management.",
    overviewFr: "Conçu pour les connaisseurs de parfumerie de niche, Lumière Parfums associe narration de marque et tunnel de commande sans friction avec gestion des stocks.",
    objective: "Build a high-converting luxury storefront that prioritizes visual elegance, swift catalog filtering, responsive cart interaction, and robust stock administration.",
    objectiveFr: "Développer une boutique en ligne haut de gamme privilégiant l'élégance visuelle, le filtrage rapide du catalogue et une expérience d'achat fluide.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React"
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
    title: "Gym CRM — Practical Business Management Application",
    category: "BUSINESS APPLICATION",
    categoryFr: "APPLICATION MÉTIER",
    role: "Designed & Developed",
    roleFr: "Conception & Développement",
    shortDescription: "A practical management application designed to organize gym operations, member information, and day-to-day administrative workflows.",
    shortDescriptionFr: "Une application de gestion pratique conçue pour organiser l'activité des salles de sport, les adhérents et les tâches administratives.",
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
      "PostgreSQL"
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
