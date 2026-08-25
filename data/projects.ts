export interface ProjectMetric {
  value: string;
  label: string;
  labelFr: string;
  detail?: string;
  detailFr?: string;
}

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
  metrics?: ProjectMetric[];
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
    title: "BusinessOS — Flagship Business Operations Platform",
    category: "FLAGSHIP CASE STUDY · SAAS ARCHITECTURE",
    categoryFr: "ÉTUDE DE CAS PHARE · ARCHITECTURE SAAS",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A unified business operations platform that integrates CRM, invoicing, appointment bookings, employee records, tasks, cash flow, and analytics into a single workspace.",
    shortDescriptionFr: "Une plateforme d'opérations d'entreprise unifiée intégrant CRM, facturation, rendez-vous, RH, tâches, trésorerie et analytics au sein d'un espace de travail unique.",
    longDescription: "BusinessOS was architected to solve the inefficiency of fragmented SaaS stacks. Built with Next.js 15 App Router and React 19, it integrates 7 operational modules backed by a 15-model Prisma relational schema, server-enforced RBAC authorization, interactive Recharts telemetry, and an environment-isolated demo guard.",
    longDescriptionFr: "BusinessOS a été conçu pour résoudre la fragmentation des logiciels SaaS. Développé avec Next.js 15 App Router et React 19, il réunit 7 modules opérationnels appuyés par un schéma relationnel Prisma de 15 modèles, un contrôle d'accès RBAC et un garde-fou serveur en mode démonstration.",
    overview: "Growing organizations often juggle separate subscriptions for CRM, billing, bookings, team directory, and cash flow reporting. BusinessOS consolidates these workflows into one responsive command center, reducing context-switching and operational overhead.",
    overviewFr: "Les entreprises en croissance gèrent leurs activités en jonglant entre des logiciels séparés pour le CRM, la facturation, les rendez-vous, les RH et la trésorerie. BusinessOS regroupe ces flux dans un centre de commande unifié.",
    objective: "Architect a multi-tenant business workspace delivering fast client navigation, relational data presentation, role-based access control (RBAC), and server-enforced demo environment protections.",
    objectiveFr: "Architecturer une application SaaS multi-tenant offrant une navigation rapide, une présentation claire des données relationnelles, un contrôle d'accès par rôle (RBAC) et une sécurisation serveur en mode démo.",
    technologies: [
      "Next.js 15 (App Router)",
      "TypeScript 5.7",
      "Tailwind CSS",
      "Prisma ORM (15 Models)",
      "PostgreSQL",
      "Server Actions",
      "Recharts Analytics",
      "Zod Validation"
    ],
    features: [
      "Executive Dashboard with live revenue KPIs, activity logs, and Recharts telemetry",
      "CRM Deal Pipeline with multi-stage sales tracking and customer record lookups",
      "Itemized Invoicing engine with automatic tax/subtotal calculation and status tracking",
      "Client Appointment Booking calendar with staff capacity and duration management",
      "Employee Directory featuring department rosters and role-based permissions (RBAC)",
      "Real-time Cash Flow ledger with income/expense tracking and financial analytics",
      "Kanban Task Workflow board with status progression and priority indicators",
      "Server-Enforced DEMO_MODE guard blocking database write paths during public exploration"
    ],
    featuresFr: [
      "Tableau de bord exécutif avec KPI de chiffre d'affaires et graphiques Recharts",
      "CRM & Pipeline commercial avec suivi des opportunités et fiches clients",
      "Moteur de facturation détaillée avec calcul automatique des taxes et sous-totaux",
      "Planning de réservation de rendez-vous clients et gestion des disponibilités",
      "Annuaire RH avec fiches employés et gestion des autorisations par rôle (RBAC)",
      "Livre de trésorerie en temps réel avec suivi des recettes/dépenses et analytics",
      "Tableau Kanban de suivi des tâches avec gestion des priorités",
      "Garde-fou serveur DEMO_MODE protégeant la base de données lors des visites publiques"
    ],
    metrics: [
      {
        value: "15",
        label: "Database Models",
        labelFr: "Modèles Prisma",
        detail: "Relational schema mapping enterprise entities",
        detailFr: "Schéma relationnel couvrant l'ensemble des entités"
      },
      {
        value: "7",
        label: "Core Modules",
        labelFr: "Modules Métiers",
        detail: "CRM, Billing, Calendar, HR, Tasks, Finance, Inventory",
        detailFr: "CRM, Factures, Calendrier, RH, Tâches, Trésorerie, Stocks"
      },
      {
        value: "12",
        label: "App Routes",
        labelFr: "Pages & Routes",
        detail: "Dashboard views and authenticated workspace routes",
        detailFr: "Vues du tableau de bord et parcours sécurisés"
      },
      {
        value: "1",
        label: "Server Security Guard",
        labelFr: "Garde-Fou Démo Serveur",
        detail: "DEMO_MODE=true environment write mutation barrier",
        detailFr: "Protection serveur DEMO_MODE interceptant les écritures"
      }
    ],
    heroImage: "/images/projects/businessos-main.jpg",
    galleryImages: [
      "/images/projects/businessos-main.jpg",
      "/images/projects/businessos-crm.jpg",
      "/images/projects/businessos-invoicing.jpg",
      "/images/projects/businessos-calendar.jpg"
    ],
    githubUrl: "https://github.com/youssefmanssouri/business-os",
    liveUrl: "https://business-os-manssouri.vercel.app",
    hasLiveDemo: true,
    featured: true,
    order: 1
  },
  {
    id: "lumiere-parfums",
    slug: "lumiere-parfums",
    name: "Lumière Parfums",
    title: "Lumière Parfums — E-Commerce Experience",
    category: "WEB APPLICATION · E-COMMERCE",
    categoryFr: "APPLICATION WEB · E-COMMERCE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "An e-commerce storefront focused on product presentation, olfactive note filtering, responsive cart interaction, and store management.",
    shortDescriptionFr: "Une boutique e-commerce axée sur la présentation des produits, le filtrage par notes olfactives, la gestion du panier et l'administration.",
    longDescription: "Lumière Parfums is a bespoke digital fragrance boutique built with Next.js App Router and TypeScript. It features client-side scent note filtering algorithms, high-definition asset presentation, a persistent slide-out cart drawer, customer accounts, and an inventory admin portal.",
    longDescriptionFr: "Lumière Parfums est une boutique numérique sur mesure développée avec Next.js App Router et TypeScript, offrant un filtrage par profil olfactif, des visuels haute définition, un panier persistant et un espace d'administration.",
    overview: "Designed for niche fragrance retail, Lumière Parfums combines brand storytelling with responsive catalog filtering and direct checkout preparation.",
    overviewFr: "Conçu pour le secteur de la parfumerie de niche, Lumière Parfums associe storytelling de marque et filtrage réactif du catalogue.",
    objective: "Build a responsive storefront that prioritizes visual elegance, swift product category filtering, client-side cart persistence, and stock administration.",
    objectiveFr: "Développer une boutique en ligne réactive privilégiant l'élégance visuelle, le filtrage du catalogue, la persistance du panier et la gestion des stocks.",
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "React 19",
      "LocalStorage Persistence"
    ],
    features: [
      "Dynamic fragrance catalog with olfactive notes & accords filtering",
      "High-definition product imagery with scent pyramid breakdowns",
      "Persistent slide-out cart drawer with instant checkout state",
      "Customer account dashboard & order history tracking",
      "Admin store portal for inventory levels, product updates & sales logs"
    ],
    featuresFr: [
      "Catalogue dynamique avec filtres par notes olfactives et accords",
      "Visuels produits haute définition et détail de la pyramide olfactive",
      "Tiroir de panier persistant et préparation de commande",
      "Espace client avec historique des commandes",
      "Panneau d'administration des stocks, produits et rapports de vente"
    ],
    metrics: [
      {
        value: "10",
        label: "Catalog Products",
        labelFr: "Produits au Catalogue",
        detail: "Fragrance entries with scent pyramid data",
        detailFr: "Fiches produits avec pyramides olfactives"
      },
      {
        value: "5",
        label: "Filter Criteria",
        labelFr: "Filtres Olfactifs",
        detail: "Brand, accords, gender, concentration, price",
        detailFr: "Marque, accords, genre, concentration, prix"
      },
      {
        value: "11",
        label: "E-Commerce Routes",
        labelFr: "Routes E-Commerce",
        detail: "Catalog, PDPs, cart, checkout, admin portal",
        detailFr: "Catalogue, PDP, panier, commande, espace admin"
      }
    ],
    heroImage: "/images/projects/lumiere-main.jpg",
    galleryImages: [
      "/images/projects/lumiere-main.jpg",
      "/images/projects/lumiere-catalog.jpg",
      "/images/projects/lumiere-cart.jpg",
      "/images/projects/lumiere-admin.jpg"
    ],
    githubUrl: "https://github.com/youssefmanssouri/lumiere-parfums",
    liveUrl: "https://lumiere-parfums-mu.vercel.app/",
    hasLiveDemo: true,
    featured: true,
    order: 2
  },
  {
    id: "gym-crm",
    slug: "gym-crm",
    name: "Gym CRM",
    title: "Gym CRM — Operations & Member Management Application",
    category: "BUSINESS APPLICATION · OPERATIONAL TOOLS",
    categoryFr: "APPLICATION MÉTIER · OUTILS OPÉRATIONNELS",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A business application designed to organize fitness center operations, member subscriptions, class capacity, and desk check-ins.",
    shortDescriptionFr: "Une application métier conçue pour organiser l'activité des salles de sport, les abonnements, les cours collectifs et les pointages d'accueil.",
    longDescription: "Gym CRM provides fitness managers and reception staff with rapid member lookups, subscription status alerts, trainer class schedules, check-in logs, and monthly revenue metrics.",
    longDescriptionFr: "Gym CRM offre aux gestionnaires de salles de sport et hôtes d'accueil un outil rapide pour les recherches de membres, les alertes d'abonnement, les cours collectifs et le chiffre d'affaires.",
    overview: "Engineered to handle reception desk check-ins and daily facility management, Gym CRM digitizes member records and simplifies renewal tracking.",
    overviewFr: "Développé pour gérer les enregistrements à l'accueil et la gestion quotidienne des installations, Gym CRM numérise la gestion des adhérents.",
    objective: "Build an administrative application delivering rapid member lookups, clear membership alert states, and recurring revenue summaries.",
    objectiveFr: "Concevoir une application d'administration réactive offrant des recherches instantanées, des alertes de statut claires et des synthèses financières.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL"
    ],
    features: [
      "Member management database with renewal alert indicators",
      "Rapid ID & member name search for front-desk reception check-ins",
      "Class scheduling & trainer booking capacity matrix",
      "Financial reporting tracking monthly recurring revenue (MRR)",
      "Role-based access permissions for staff and facility administration"
    ],
    featuresFr: [
      "Gestionnaire d'adhérents avec alertes visuelles d'expiration du forfait",
      "Recherche rapide par nom et ID pour le pointage d'accueil",
      "Planning des cours collectifs et gestion des jauges",
      "Rapports financiers du chiffre d'affaires récurrent mensuel (MRR)",
      "Gestion des autorisations et rôles du personnel"
    ],
    metrics: [
      {
        value: "12",
        label: "Database Models",
        labelFr: "Modèles Prisma",
        detail: "User, MemberProfile, Membership, Attendance, Payments...",
        detailFr: "Adhérents, Abonnements, Présences, Paiements, Exercices..."
      },
      {
        value: "12",
        label: "Operational Modules",
        labelFr: "Modules Métiers UI",
        detail: "Dashboard, Members, Attendance, POS, Workouts, AI Suite...",
        detailFr: "Pointages, Adhérents, Cours, Nutrition, Caisse, Rapports..."
      }
    ],
    heroImage: "/images/projects/gymcrm-main.jpg",
    galleryImages: [
      "/images/projects/gymcrm-main.jpg",
      "/images/projects/gymcrm-members.jpg",
      "/images/projects/gymcrm-classes.jpg"
    ],
    githubUrl: "https://github.com/youssefmanssouri/gym-crm",
    liveUrl: "https://gym-crm-gules.vercel.app",
    hasLiveDemo: true,
    featured: true,
    order: 3
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
