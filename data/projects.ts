export interface ProjectMetric {
  value: string;
  label: string;
  labelFr: string;
  detail?: string;
  detailFr?: string;
}

export interface ProblemSolution {
  problemTitleEn: string;
  problemTitleFr: string;
  problemDescEn: string;
  problemDescFr: string;
  solutionTitleEn: string;
  solutionTitleFr: string;
  solutionDescEn: string;
  solutionDescFr: string;
}

export interface ProjectCapability {
  id: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
  practicalOutcomeEn: string;
  practicalOutcomeFr: string;
  image?: string;
  imageCaptionEn?: string;
  imageCaptionFr?: string;
}

export interface EngineeringPoint {
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
}

export interface TechnicalDecision {
  titleEn: string;
  titleFr: string;
  decisionEn: string;
  decisionFr: string;
  rationaleEn: string;
  rationaleFr: string;
}

export interface KeyLearning {
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
}

export interface TechStackDetail {
  tech: string;
  purposeEn: string;
  purposeFr: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  title: string;
  seoTitle?: string;
  seoTitleFr?: string;
  seoDescription?: string;
  seoDescriptionFr?: string;
  lastModified?: string;
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
  problemSolution: ProblemSolution;
  metrics: ProjectMetric[];
  capabilities: ProjectCapability[];
  engineeringPoints: EngineeringPoint[];
  decisions?: TechnicalDecision[];
  learnings?: KeyLearning[];
  technologies: string[];
  techStackDetails?: TechStackDetail[];
  buildScopeEn?: string[];
  buildScopeFr?: string[];
  features: string[];
  featuresFr: string[];
  heroImage: string;
  galleryImages: string[];
  githubUrl: string;
  liveUrl?: string;
  hasLiveDemo: boolean;
  featured: boolean;
  order: number;
  schemaType?: "SoftwareApplication" | "WebApplication" | "CreativeWork";
  applicationCategory?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "businessos",
    slug: "businessos",
    name: "BusinessOS",
    title: "BusinessOS — Flagship Business Operations Platform",
    seoTitle: "BusinessOS — Custom Business Management & CRM Platform | Case Study",
    seoTitleFr: "BusinessOS — Plateforme de Gestion & CRM Sur Mesure | Étude de Cas",
    seoDescription: "BusinessOS is a custom business operations platform combining CRM, invoicing, scheduling, analytics, and workflow management in one web application.",
    seoDescriptionFr: "BusinessOS est une plateforme de gestion métier sur mesure réunissant CRM, facturation, planning, analytics et suivi des opérations.",
    lastModified: "2026-08-20",
    category: "CUSTOM BUSINESS PLATFORM",
    categoryFr: "PLATEFORME MÉTIER SUR MESURE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A full-stack business management platform that centralizes operational workflows, CRM client records, itemized invoicing, appointment bookings, and financial tracking into a unified workspace.",
    shortDescriptionFr: "Une plateforme de gestion d'entreprise full-stack qui centralise les flux opérationnels, le CRM clients, la facturation, les réservations et le suivi financier dans un espace unique.",
    longDescription: "BusinessOS was built to address the confusion and overhead of fragmented SaaS tools. It unifies daily client management, billing, scheduling, team rosters, and real-time cash flow into one responsive command center.",
    longDescriptionFr: "BusinessOS a été développé pour répondre à la dispersion et aux coûts des outils SaaS cloisonnés. Il rassemble la gestion des prospects, la facturation, les plannings, les RH et la trésorerie dans un centre de commande unifié.",
    overview: "Growing organizations often juggle separate subscriptions for CRM, billing, bookings, team directory, and cash flow reporting. BusinessOS consolidates these workflows into one responsive command center, reducing context-switching and operational overhead.",
    overviewFr: "Les entreprises en croissance gèrent souvent leurs activités en jonglant entre des logiciels séparés pour le CRM, la facturation, les rendez-vous, les RH et la trésorerie. BusinessOS regroupe ces flux dans un centre de commande unifié.",
    objective: "Architect a multi-tenant business workspace delivering fast client navigation, relational data presentation, role-based access control (RBAC), and server-enforced demo environment protections.",
    objectiveFr: "Architecturer une application SaaS multi-tenant offrant une navigation rapide, une présentation claire des données relationnelles, un contrôle d'accès par rôle (RBAC) et une sécurisation serveur en mode démo.",
    problemSolution: {
      problemTitleEn: "Operational Fragmentation & Data Silos",
      problemTitleFr: "Fragmentation Opérationnelle & Silos de Données",
      problemDescEn: "Growing businesses frequently operate on a fragmented stack of single-purpose tools: one app for leads, another for invoicing, external calendars for bookings, and spreadsheets for finance. This fragmentation creates data silos, increases context-switching, and requires tedious manual reconciliation across records.",
      problemDescFr: "Les entreprises en croissance gèrent souvent leurs activités avec des outils déconnectés : un CRM pour les prospects, un logiciel pour la facturation, des calendriers externes et des tableurs pour la trésorerie. Cette fragmentation engendre des silos de données, des pertes de temps et des ressaisies manuelles récurrentes.",
      solutionTitleEn: "Unified Operational Command Center",
      solutionTitleFr: "Centre de Commande Opérationnel Unifié",
      solutionDescEn: "BusinessOS consolidates client pipelines, itemized invoices, appointment scheduling, team rosters, and real-time cash flow metrics into one cohesive workspace engineered with Next.js 15, PostgreSQL, and Prisma ORM.",
      solutionDescFr: "BusinessOS regroupe l'ensemble des flux métiers essentiels au sein d'un centre de contrôle unique développé avec Next.js 15, PostgreSQL et Prisma ORM, permettant de piloter prospects, factures, plannings et trésorerie sans dispersion d'outils."
    },
    metrics: [
      {
        value: "4 Modules",
        label: "Integrated Operations",
        labelFr: "Opérations Intégrées",
        detail: "CRM, Invoicing, Bookings, Cash Flow",
        detailFr: "CRM, Facturation, Plannings, Trésorerie"
      },
      {
        value: "PostgreSQL",
        label: "Relational Persistence",
        labelFr: "Persistance Relationnelle",
        detail: "Prisma schema with cascading constraints",
        detailFr: "Schéma Prisma avec contraintes d'intégrité"
      },
      {
        value: "103 kB",
        label: "Shared First Load JS",
        labelFr: "JS Initial Partagé",
        detail: "Measured production bundle size",
        detailFr: "Taille mesurée du bundle de production"
      },
      {
        value: "RBAC",
        label: "Access Security",
        labelFr: "Sécurité des Accès",
        detail: "Role permissions & server demo guards",
        detailFr: "Contrôle d'accès & garde-fous démo"
      }
    ],
    capabilities: [
      {
        id: "executive-dashboard",
        titleEn: "Executive Command Center & Operational Metrics",
        titleFr: "Tableau de Bord Exécutif & Indicateurs Financiers",
        summaryEn: "A centralized dashboard displaying active revenue metrics, monthly pipeline volume, pending invoices, and real-time operational activity feeds.",
        summaryFr: "Un tableau de bord centralisé affichant les indicateurs de chiffre d'affaires, le volume du pipeline commercial, les factures en attente et l'activité récente.",
        practicalOutcomeEn: "Enables business owners and team leaders to assess operational activity and financial health at a glance without requesting manual reports.",
        practicalOutcomeFr: "Permet aux dirigeants et responsables de mesurer l'activité opérationnelle et la santé financière en un coup d'œil, sans compilation manuelle.",
        image: "/images/projects/businessos-main.jpg",
        imageCaptionEn: "Executive command dashboard with revenue KPIs, activity logs, and financial metrics",
        imageCaptionFr: "Tableau de bord exécutif avec KPI de chiffre d'affaires, journal d'activité et indicateurs financiers"
      },
      {
        id: "crm-pipeline",
        titleEn: "CRM Deal Pipeline & Client Directory",
        titleFr: "Pipeline Commercial CRM & Répertoire Clients",
        summaryEn: "A multi-stage sales opportunity tracker with structured client records, contact histories, and deal progression stages.",
        summaryFr: "Un suivi structuré des opportunités commerciales avec fiches clients détaillées, historique des échanges et étapes de conversion.",
        practicalOutcomeEn: "Designed to keep client relationships and sales opportunities structured from initial contact to completed project.",
        practicalOutcomeFr: "Conçu pour structurer les opportunités commerciales du premier contact à la finalisation du projet.",
        image: "/images/projects/businessos-crm.jpg",
        imageCaptionEn: "CRM pipeline board with stage-by-stage deal tracking and centralized client directory",
        imageCaptionFr: "Pipeline commercial CRM avec suivi par étape et annuaire client centralisé"
      },
      {
        id: "invoicing-billing",
        titleEn: "Itemized Billing & Invoice Generation",
        titleFr: "Facturation Détaillée & Gestion des Règlements",
        summaryEn: "An integrated billing engine with automatic line-item calculations, tax handling, payment status tracking, and printable invoice layouts.",
        summaryFr: "Un moteur de facturation intégré avec calcul automatique des lignes, gestion de la TVA, suivi des statuts de paiement et génération de factures.",
        practicalOutcomeEn: "Structures the invoicing process and provides clear, searchable records of paid, pending, and overdue receivables.",
        practicalOutcomeFr: "Structure l'émission des factures et assure un suivi rigoureux des créances payées, en attente ou en retard.",
        image: "/images/projects/businessos-invoicing.jpg",
        imageCaptionEn: "Dynamic invoicing interface with automatic tax computation and payment status management",
        imageCaptionFr: "Interface de facturation dynamique avec calcul des taxes et suivi des statuts de règlement"
      },
      {
        id: "booking-calendar",
        titleEn: "Resource Booking & Appointment Calendar",
        titleFr: "Planning des Réservations & Rendez-vous Clients",
        summaryEn: "An interactive scheduling system with staff capacity planning, service duration settings, and appointment management.",
        summaryFr: "Un système de planification interactif avec gestion des disponibilités de l'équipe, durées des prestations et réservations clients.",
        practicalOutcomeEn: "Designed to organize appointment bookings and prevent double-booking conflicts while tying consultations directly to client records.",
        practicalOutcomeFr: "Conçu pour organiser les rendez-vous et éviter les conflits de planning tout en reliant chaque consultation à la fiche client.",
        image: "/images/projects/businessos-calendar.jpg",
        imageCaptionEn: "Resource appointment calendar with staff availability and consultation booking management",
        imageCaptionFr: "Calendrier de réservation avec gestion des disponibilités de l'équipe et des rendez-vous"
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Full-Stack Next.js Architecture",
        titleFr: "Architecture Next.js Full-Stack",
        descEn: "Built with Next.js 15 App Router and TypeScript, utilizing Server Actions for direct server mutations with type safety.",
        descFr: "Développé avec Next.js 15 App Router et TypeScript, exploitant les Server Actions pour des mutations directes côté serveur avec typage strict."
      },
      {
        titleEn: "Relational Data Modeling",
        titleFr: "Modélisation Relationnelle",
        descEn: "Type-safe database persistence with PostgreSQL and Prisma ORM, linking clients, invoices, appointments, and audit logs.",
        descFr: "Persistance sécurisée sous PostgreSQL et Prisma ORM, reliant de manière cohérente clients, factures, rendez-vous et journaux d'audit."
      },
      {
        titleEn: "Role-Based Access Control (RBAC)",
        titleFr: "Contrôle d'Accès par Rôle (RBAC)",
        descEn: "Granular authorization layers ensuring staff members only access permissions assigned to their role (Admin, Manager, Staff).",
        descFr: "Gestion granulaire des autorisations garantissant que chaque utilisateur accède uniquement aux fonctions de son rôle (Admin, Manager, Équipe)."
      },
      {
        titleEn: "Protected Demo Guard (DEMO_MODE)",
        titleFr: "Garde-Fou Démo Serveur (DEMO_MODE)",
        descEn: "Server-level guards intercept database mutations during public demo exploration, safeguarding data integrity while allowing full UI interaction.",
        descFr: "Des garde-fous serveur interceptent les écritures lors des visites publiques, protégeant les données tout en permettant une découverte interactive."
      }
    ],
    decisions: [
      {
        titleEn: "Relational Data Modeling with Prisma & PostgreSQL",
        titleFr: "Modélisation Relationnelle avec Prisma & PostgreSQL",
        decisionEn: "Structured an explicit relational schema connecting clients, deal stages, itemized invoices, line items, and bookings with foreign key constraints.",
        decisionFr: "Structuration d'un schéma relationnel explicite reliant clients, opportunités, factures, lignes d'articles et réservations avec contraintes d'intégrité.",
        rationaleEn: "Operational records are interdependent: converting a lead into a billed client requires shared identifiers, strict cascading rules, and referential integrity to prevent orphan data.",
        rationaleFr: "Les données opérationnelles sont interdépendantes : convertir une opportunité en client facturé exige des identifiants partagés et des contraintes d'intégrité pour éviter toute perte de cohérence."
      },
      {
        titleEn: "Server Actions & Strict Zod Validation",
        titleFr: "Server Actions & Validation Stricte Zod",
        decisionEn: "Utilized Next.js Server Actions with strict Zod schema parsing for all form submissions and state mutations.",
        decisionFr: "Utilisation des Server Actions Next.js avec validation stricte par schémas Zod pour chaque soumission de formulaire et mutation d'état.",
        rationaleEn: "Co-locating mutations with server components eliminates REST boilerplate, reduces network latency, and ensures all user inputs are validated before hitting the database layer.",
        rationaleFr: "Co-localiser les mutations avec les composants serveur élimine le code d'API redondant, réduit la latence et garantit la validation des entrées avant l'écriture en base."
      },
      {
        titleEn: "Server-Side Sandbox Guards (DEMO_MODE)",
        titleFr: "Garde-Fou Sandbox Côté Serveur (DEMO_MODE)",
        decisionEn: "Implemented a dedicated environment guard that intercepts mutating Server Actions during public demo sessions.",
        decisionFr: "Mise en place d'un garde-fou serveur interceptant les Server Actions de mutation lors des sessions de démonstration publiques.",
        rationaleEn: "Public visitors need to test form inputs, navigation, and filters without risking persistent data tampering, database pollution, or service degradation.",
        rationaleFr: "Les visiteurs doivent pouvoir tester les formulaires, la navigation et les filtres sans risque de corruption des données ou de pollution de la base de démonstration."
      }
    ],
    learnings: [
      {
        titleEn: "Modeling Interdependent Operational Domains",
        titleFr: "Modélisation de Domaines Opérationnels Interdépendants",
        descEn: "Building BusinessOS required thinking through how a single operational event (e.g., booking a consultation) flows into CRM records, calendar availability, and billing. It taught me how to translate operational business logic into sound relational architecture.",
        descFr: "Le développement de BusinessOS a nécessité d'anticiper la répercussion d'un événement opérationnel (ex : réservation d'un rendez-vous) sur le CRM, le planning et la facturation. Cela m'a appris à traduire des règles métiers en une architecture relationnelle robuste."
      },
      {
        titleEn: "Defensive Engineering for Publicly Deployed SaaS",
        titleFr: "Ingénierie Défensive pour Applications Publiques",
        descEn: "Designing the DEMO_MODE guard and role-based permissions reinforced that security must be enforced on the server layer rather than simply disabling UI buttons on the client.",
        descFr: "La conception du garde-fou DEMO_MODE et des autorisations par rôles a confirmé que la sécurité doit être verrouillée côté serveur, et non pas simplement masquée par l'interface client."
      }
    ],
    technologies: [
      "Next.js 15 (App Router)",
      "TypeScript 5.7",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
      "Server Actions",
      "Recharts Analytics",
      "Zod Validation"
    ],
    techStackDetails: [
      {
        tech: "Next.js 15 (App Router)",
        purposeEn: "Full-stack server/client component architecture and optimized routing",
        purposeFr: "Architecture full-stack composants serveur/client et routage optimisé"
      },
      {
        tech: "TypeScript 5.7",
        purposeEn: "Strict type definitions for business entities, state, and mutations",
        purposeFr: "Typage strict des entités métiers, des formulaires et des états applicatifs"
      },
      {
        tech: "PostgreSQL & Prisma ORM",
        purposeEn: "Relational database schema with relational models and cascading constraints",
        purposeFr: "Base de données relationnelle et requêtes typées avec contraintes d'intégrité"
      },
      {
        tech: "Recharts",
        purposeEn: "Interactive financial and operational metrics visualizations",
        purposeFr: "Visualisation interactive des indicateurs financiers et opérationnels"
      },
      {
        tech: "Tailwind CSS",
        purposeEn: "Responsive, cohesive design system across all operational modules",
        purposeFr: "Système de design responsive et cohérent sur tous les modules opérationnels"
      },
      {
        tech: "Zod Schema Validation",
        purposeEn: "Defensive input validation and schema enforcement on all Server Actions",
        purposeFr: "Validation défensive des données sur l'ensemble des Server Actions"
      }
    ],
    buildScopeEn: [
      "Full-stack Next.js 15 application with React 19 and TypeScript architecture",
      "Relational PostgreSQL schema with Prisma ORM (clients, invoices, bookings, users)",
      "CRM pipeline board with stage progression and client directory",
      "Automated invoicing engine with line-item calculations and status tracking",
      "Interactive appointment calendar with staff capacity planning",
      "Server-side DEMO_MODE guards and role-based access control (RBAC)"
    ],
    buildScopeFr: [
      "Application full-stack Next.js 15 avec React 19 et architecture TypeScript",
      "Schéma relationnel PostgreSQL avec Prisma ORM (clients, factures, rendez-vous, utilisateurs)",
      "Tableau de suivi commercial CRM avec gestion des étapes et répertoire clients",
      "Moteur de facturation automatisé avec calcul des lignes et suivi des paiements",
      "Calendrier de réservations interactif avec gestion des disponibilités d'équipe",
      "Garde-fous serveur DEMO_MODE et contrôle d'accès par rôles (RBAC)"
    ],
    features: [
      "Executive operational dashboard with cash flow trends and revenue KPIs",
      "CRM sales pipeline with stage progression, contact records, and deal values",
      "Invoice generation with automated tax calculations and payment status logs",
      "Resource booking calendar with staff availability and duration management",
      "Role-based access control (Admin, Manager, Staff) with permission boundaries",
      "Protected demo mode with server-level write guards for safe public testing"
    ],
    featuresFr: [
      "Tableau de bord exécutif avec flux de trésorerie et indicateurs clés de revenus",
      "Pipeline commercial CRM avec suivi des opportunités, contacts et montants",
      "Émission de factures avec calcul automatique des taxes et suivi des règlements",
      "Calendrier de planification avec gestion des disponibilités et durées",
      "Contrôle d'accès par rôles (Admin, Manager, Équipe) avec règles de permissions",
      "Mode démo sécurisé avec garde-fous serveur pour une exploration publique sans risque"
    ],
    heroImage: "/images/projects/businessos-main.jpg",
    galleryImages: [
      "/images/projects/businessos-main.jpg",
      "/images/projects/businessos-crm.jpg",
      "/images/projects/businessos-invoicing.jpg",
      "/images/projects/businessos-calendar.jpg"
    ],
    githubUrl: "https://github.com/youssefmanssouri/BusinessOS",
    liveUrl: "https://business-os-one.vercel.app/",
    hasLiveDemo: true,
    featured: true,
    order: 1,
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication"
  },
  {
    id: "lumiere-parfums",
    slug: "lumiere-parfums",
    name: "Lumière Parfums",
    title: "Lumière Parfums — Custom Fragrance E-Commerce Boutique",
    seoTitle: "Lumière Parfums — Custom E-Commerce Experience | Case Study",
    seoTitleFr: "Lumière Parfums — Boutique E-Commerce Sur Mesure | Étude de Cas",
    seoDescription: "An interactive e-commerce concept built with a custom product catalog, fragrance discovery experience, product storytelling, and persistent cart.",
    seoDescriptionFr: "Concept e-commerce interactif avec catalogue produit sur mesure, découverte des fragrances, storytelling produit et panier persistant.",
    lastModified: "2026-08-15",
    category: "CUSTOM E-COMMERCE EXPERIENCE",
    categoryFr: "EXPÉRIENCE E-COMMERCE SUR MESURE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A custom e-commerce experience designed to present fragrance products through visual storytelling, guide online discovery with accord filtering, and provide a smooth journey from exploration to purchase.",
    shortDescriptionFr: "Une expérience e-commerce sur mesure conçue pour valoriser des créations olfactives par le récit visuel, guider la découverte par les accords et offrir un parcours fluide de la visite à la commande.",
    longDescription: "Lumière Parfums translates the nuances of fragrance discovery into a structured digital boutique. It pairs olfactory accord filtering and scent pyramid breakdowns with persistent cart state management and store data administration.",
    longDescriptionFr: "Lumière Parfums transpose les subtilités de la parfumerie dans une boutique numérique structurée. Le projet associe un filtrage par accords olfactifs, la décomposition des pyramides de notes, la persistance du panier et la gestion des données de la boutique.",
    overview: "Selling fragrance online requires bridging the sensory gap between a digital screen and physical scent evaluation. Lumière Parfums addresses this with accord filtering, editorial scent pyramids, and an integrated store administration dashboard.",
    overviewFr: "Vendre du parfum en ligne exige de combler l'écart sensoriel entre un écran et l'évaluation olfactive réelle. Lumière Parfums répond à ce défi par le filtrage des accords, des pyramides olfactives détaillées et une interface d'administration.",
    objective: "Architect a dedicated e-commerce experience that facilitates fragrance exploration online and provides direct store management controls.",
    objectiveFr: "Concevoir une plateforme e-commerce dédiée facilitant l'exploration olfactive en ligne et offrant une gestion directe de la boutique.",
    problemSolution: {
      problemTitleEn: "The Challenge of Online Fragrance Discovery",
      problemTitleFr: "Le Défi de la Vente de Parfums en Ligne",
      problemDescEn: "Selling fragrance online is fundamentally different from selling standard physical goods. Because a customer cannot smell a scent through a screen, standard e-commerce grid layouts fail to provide the context needed for product comparison, leaving shoppers dependent on guesswork.",
      problemDescFr: "Vendre du parfum en ligne diffère fondamentalement des produits que l'on peut immédiatement évaluer. Un visiteur ne pouvant pas sentir une fragrance à travers un écran, les grilles e-commerce classiques ne fournissent pas le contexte nécessaire pour comparer et choisir sereinement.",
      solutionTitleEn: "Structured Discovery & Cohesive Commerce Flow",
      solutionTitleFr: "Découverte Structurée & Parcours d'Achat Fluide",
      solutionDescEn: "A custom digital boutique designed around fragrance discovery, editorial product presentation, and a smooth path from browsing to purchase. The platform combines customer-facing olfactory filtering and detailed scent pyramids with persistent cart continuity and an administrative store management portal.",
      solutionDescFr: "Une boutique numérique sur mesure articulée autour de la découverte olfactive, d'une présentation éditoriale soignée et d'un parcours d'achat sans friction. La plateforme associe recherche par accords et pyramides de notes à un panier persistant et un espace d'administration."
    },
    metrics: [
      {
        value: "Discovery",
        label: "Scent Filtering",
        labelFr: "Découverte Olfactive",
        detail: "Olfactory families, accords, notes, price",
        detailFr: "Familles olfactives, accords, notes, budget"
      },
      {
        value: "Storytelling",
        label: "Product Detail",
        labelFr: "Présentation Produit",
        detail: "Top, heart, and base pyramid note breakdowns",
        detailFr: "Profils détaillés avec notes de tête, cœur et fond"
      },
      {
        value: "Cart",
        label: "Persistent Drawer",
        labelFr: "Panier Persistant",
        detail: "LocalStorage state across page navigation",
        detailFr: "Maintient les sélections du visiteur durant la session"
      },
      {
        value: "Admin",
        label: "Store Control",
        labelFr: "Administration Boutique",
        detail: "Catalog pricing and inventory oversight",
        detailFr: "Gestion du catalogue, prix et stocks"
      }
    ],
    capabilities: [
      {
        id: "olfactory-discovery",
        titleEn: "Olfactory Discovery & Accord Filtering",
        titleFr: "Découverte Olfactive & Filtres par Accords",
        summaryEn: "A dedicated catalog filter allowing shoppers to explore fragrances by olfactive family (woody, floral, oriental, fresh), specific scent notes, concentration, and price points without reloading the page.",
        summaryFr: "Un système de filtrage permettant d'explorer les fragrances par famille olfactive (boisée, florale, ambrée, fraîche), notes spécifiques, concentration et prix, sans rechargement de page.",
        practicalOutcomeEn: "Enables customers to navigate a broad fragrance catalog based on concrete scent characteristics rather than guessing from product names or abstract imagery alone.",
        practicalOutcomeFr: "Permet aux visiteurs de parcourir le catalogue selon des caractéristiques olfactives concrètes au lieu de s'en remettre au seul nom du produit ou au visuel.",
        image: "/images/projects/lumiere-catalog.jpg",
        imageCaptionEn: "Catalog discovery interface with multi-attribute accord filtering, notes selection, and instant search",
        imageCaptionFr: "Interface de recherche par catalogue avec filtrage multi-critères, sélection de notes et recherche instantanée"
      },
      {
        id: "product-storytelling",
        titleEn: "Editorial Product Storytelling & Scent Pyramids",
        titleFr: "Présentation Éditoriale & Pyramides Olfactives",
        summaryEn: "Detailed product pages presenting the fragrance narrative alongside an editorial breakdown of top notes (initial impression), heart notes (core body), and base notes (lasting sillage).",
        summaryFr: "Des fiches produits détaillées présentant l'histoire du parfum accompagnée d'une décomposition éditoriale des notes de tête (départ), de cœur (corps) et de fond (sillage).",
        practicalOutcomeEn: "Provides olfactory context and evolution stages, helping customers understand how the fragrance unfolds over time when physical testing is unavailable.",
        practicalOutcomeFr: "Apporte le contexte olfactif sur l'évolution du parfum, aidant le client à appréhender la fragrance sans test physique.",
        image: "/images/projects/lumiere-main.jpg",
        imageCaptionEn: "Editorial product presentation detailing the fragrance composition, scent pyramid, and volume options",
        imageCaptionFr: "Fiche produit éditoriale détaillant la composition, la pyramide olfactive et les formats"
      },
      {
        id: "slideout-cart",
        titleEn: "Persistent Cart & Checkout Journey",
        titleFr: "Panier Persistant & Parcours de Commande",
        summaryEn: "A responsive slide-out cart drawer maintaining bag state across the entire browsing session, allowing immediate quantity adjustments and clear subtotal visibility.",
        summaryFr: "Un tiroir latéral de panier réactif conservant l'état de la sélection durant toute la session de navigation, avec ajustement instantané des quantités et sous-total clair.",
        practicalOutcomeEn: "Designed to keep bag items accessible throughout browsing without forcing full-page redirects away from catalog discovery.",
        practicalOutcomeFr: "Conçu pour garder le panier accessible à tout moment sans interrompre la visite du catalogue.",
        image: "/images/projects/lumiere-cart.jpg",
        imageCaptionEn: "Persistent slide-out cart drawer with instant quantity controls, itemized subtotals, and direct checkout progression",
        imageCaptionFr: "Panier latéral persistant avec contrôle des quantités, sous-total détaillé et accès direct à la commande"
      },
      {
        id: "store-admin",
        titleEn: "Store Management & Inventory Administration",
        titleFr: "Gestion des Données Boutique & Administration",
        summaryEn: "A dedicated administrative portal for managing catalog entries, updating inventory counts, editing fragrance descriptions, and tracking order records.",
        summaryFr: "Un espace d'administration dédié pour gérer les fiches du catalogue, ajuster les niveaux de stock, modifier les descriptions et suivre les commandes.",
        practicalOutcomeEn: "Connects customer-facing shopping with day-to-day store operations, ensuring direct administrative oversight of store data.",
        practicalOutcomeFr: "Relie la boutique en ligne à la gestion opérationnelle quotidienne, assurant un contrôle administratif direct sur les données du catalogue.",
        image: "/images/projects/lumiere-admin.jpg",
        imageCaptionEn: "Administrative portal for store inventory oversight, product data management, and order records",
        imageCaptionFr: "Portail d'administration pour la gestion des stocks, des fiches produits et des commandes"
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Next.js App Router Architecture",
        titleFr: "Architecture Next.js App Router",
        descEn: "Built with Next.js App Router and TypeScript for rapid page transitions, strong component boundaries, and responsive layouts.",
        descFr: "Développé avec Next.js App Router et TypeScript pour des transitions fluides, des composants modulaires et une mise en page responsive."
      },
      {
        titleEn: "Client-Side Discovery Engine",
        titleFr: "Moteur de Recherche Côté Client",
        descEn: "Instant multi-attribute filtering algorithm enabling catalog refinement across notes, accords, and price brackets without reload latency.",
        descFr: "Algorithme de filtrage multi-critères instantané côté client permettant d'affiner le catalogue par notes et accords sans latence."
      },
      {
        titleEn: "Local State Continuity (LocalStorage)",
        titleFr: "Continuité de l'État Local (LocalStorage)",
        descEn: "Client-side storage synchronization preserving customer bag selections and preferences throughout browsing sessions.",
        descFr: "Synchronisation du stockage local garantissant la préservation du panier et des préférences tout au long de la visite."
      },
      {
        titleEn: "Administrative Portal Isolation",
        titleFr: "Espace d'Administration Structuré",
        descEn: "Protected management interface separating customer storefront browsing from catalog inventory and store data controls.",
        descFr: "Interface de gestion structurée séparant l'expérience client publique des contrôles d'inventaire et des données de la boutique."
      }
    ],
    decisions: [
      {
        titleEn: "Client-Side Multi-Attribute Filtering Engine",
        titleFr: "Moteur de Recherche Multicritère Côté Client",
        decisionEn: "Executed fragrance catalog filtering directly in client memory rather than triggering server round-trips per filter change.",
        decisionFr: "Exécution du filtrage du catalogue directement en mémoire client plutôt que de multiplier les requêtes serveur à chaque sélection.",
        rationaleEn: "Shoppers exploring sensory products frequently toggle multiple notes and accords; in-memory filtering delivers instant visual feedback without network lag.",
        rationaleFr: "Les utilisateurs explorant des produits sensoriels modifient fréquemment leurs critères olfactifs ; le filtrage en mémoire offre un retour visuel instantané sans latence réseau."
      },
      {
        titleEn: "Scent Pyramid Breakdown Architecture",
        titleFr: "Décomposition Structurée des Pyramides Olfactives",
        decisionEn: "Structured fragrance product data into top, heart, and base note layers with accompanying visual timeline badges.",
        decisionFr: "Structuration des fiches produits en trois niveaux (notes de tête, de cœur et de fond) avec indicateurs visuels d'évolution.",
        rationaleEn: "Translating olfactory progression into scannable digital data helps online shoppers understand how a fragrance develops over hours without physical testing.",
        rationaleFr: "Traduire l'évolution olfactive en données visuelles claires permet à l'acheteur en ligne de comprendre l'évolution du parfum au fil des heures sans test physique préalable."
      },
      {
        titleEn: "LocalStorage Persistence for Cart State",
        titleFr: "Persistance du Panier via LocalStorage",
        decisionEn: "Synchronized bag items to browser LocalStorage alongside a slide-out drawer interface.",
        decisionFr: "Synchronisation des articles du panier dans le stockage local du navigateur avec affichage en tiroir latéral.",
        rationaleEn: "Preserves user cart continuity across page navigations without forcing user registration or requiring server-side session databases for exploratory shopping.",
        rationaleFr: "Préserve les sélections du panier lors de la navigation sans imposer de compte client ni surcharger le serveur avec des sessions temporaires."
      }
    ],
    learnings: [
      {
        titleEn: "Designing for High-Context Sensory Products",
        titleFr: "Conception Numérique pour Produits Sensoriels",
        descEn: "Lumière Parfums demonstrated how structured information architecture and editorial storytelling can present sensory products effectively in an online catalog.",
        descFr: "Ce projet a démontré comment une architecture de l'information soignée et une mise en récit éditoriale permettent de valoriser efficacement des produits sensoriels en ligne."
      },
      {
        titleEn: "Structuring Persistent Shopping Flows",
        titleFr: "Structuration des Parcours d'Achat Persistants",
        descEn: "Implementing a slide-out cart drawer reinforced the importance of allowing users to inspect their bag and adjust quantities without navigating away from catalog discovery.",
        descFr: "L'intégration d'un panier latéral persistant a confirmé l'importance de permettre la vérification des articles et l'ajustement des quantités sans quitter la découverte du catalogue."
      }
    ],
    technologies: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "React 19",
      "LocalStorage Persistence"
    ],
    techStackDetails: [
      {
        tech: "Next.js (App Router)",
        purposeEn: "High-performance storefront routing and metadata handling",
        purposeFr: "Routage haute performance et structure de boutique"
      },
      {
        tech: "TypeScript",
        purposeEn: "Type-safe product catalog models, cart items, and olfactory structures",
        purposeFr: "Typage sécurisé du catalogue, des articles du panier et des notes"
      },
      {
        tech: "Tailwind CSS",
        purposeEn: "Bespoke luxury editorial aesthetic, typography, and responsive grid",
        purposeFr: "Direction artistique éditoriale et mise en page responsive"
      },
      {
        tech: "LocalStorage Persistence",
        purposeEn: "Seamless client-side cart retention across browsing sessions",
        purposeFr: "Maintien de session fluide pour le panier client"
      }
    ],
    buildScopeEn: [
      "Custom e-commerce storefront with luxury brand storytelling layout",
      "Multi-criteria fragrance discovery engine (olfactory families, accords, notes, gender)",
      "Interactive scent pyramid breakdowns (top, heart, and base notes)",
      "Client-side persistent slide-out shopping cart across browsing sessions",
      "Store management dashboard for catalog pricing and inventory administration"
    ],
    buildScopeFr: [
      "Boutique e-commerce sur mesure et mise en valeur éditoriale de la marque",
      "Moteur de recherche multicritère (familles olfactives, accords, notes, genre)",
      "Décomposition interactive des pyramides olfactives (notes de tête, cœur et fond)",
      "Panier d'achat latéral persistant avec maintien de session sans rechargement",
      "Interface d'administration pour la gestion du catalogue, des prix et des stocks"
    ],
    features: [
      "Dynamic fragrance catalog with multi-attribute olfactive notes & accords filtering",
      "Editorial product presentations with top, heart, and base scent pyramid breakdowns",
      "Persistent slide-out cart drawer maintaining bag continuity throughout browsing",
      "Customer account dashboard with order history and saved preferences",
      "Administrative store portal for managing inventory levels, product catalog, and store data"
    ],
    featuresFr: [
      "Catalogue dynamique avec filtres par notes olfactives, accords et concentration",
      "Présentations éditoriales des produits avec décomposition des pyramides olfactives",
      "Tiroir de panier persistant préservant la continuité de la commande",
      "Espace client avec historique des commandes et préférences",
      "Panneau d'administration pour la gestion des stocks, des fiches produits et des données boutique"
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
    order: 2,
    schemaType: "WebApplication",
    applicationCategory: "ECommerceApplication"
  },
  {
    id: "gym-crm",
    slug: "gym-crm",
    name: "Gym CRM",
    title: "Gym CRM — Operations & Member Management Platform",
    seoTitle: "Gym CRM — Gym Management & Member Operations System | Case Study",
    seoTitleFr: "Gym CRM — Logiciel de Gestion pour Salle de Sport | Étude de Cas",
    seoDescription: "A web-based gym management system for member search, subscription status, reception check-in, attendance tracking, and operational analytics.",
    seoDescriptionFr: "Un système web de gestion pour salle de sport avec recherche des membres, suivi des abonnements, contrôle à l’accueil, suivi des présences et analyses opérationnelles.",
    lastModified: "2026-08-10",
    category: "GYM MANAGEMENT & OPERATIONS",
    categoryFr: "GESTION DE SALLE & OPÉRATIONS",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A gym operations platform designed to help fitness centers manage front-desk check-ins, track membership renewal statuses, organize group class schedules, and monitor recurring facility revenue.",
    shortDescriptionFr: "Une plateforme d'exploitation pour salles de sport conçue pour fluidifier le pointage d'accueil, suivre les statuts d'adhésion, organiser les plannings de cours et suivre les revenus récurrents.",
    longDescription: "Gym CRM addresses front-desk congestion and membership tracking for fitness facilities. It digitizes member lookups, highlights active versus expired subscription states, organizes class capacities, and provides recurring revenue visibility.",
    longDescriptionFr: "Gym CRM répond aux ralentissements d'accueil et au suivi des abonnements dans les salles de sport. L'application numérise les fiches adhérents, distingue les statuts actifs ou expirés, gère les jauges de cours et apporte une visibilité sur les revenus récurrents.",
    overview: "Managing a fitness facility requires fast front-desk check-ins, dependable membership status tracking, and clear operational oversight. Gym CRM centralizes daily reception workflows and member records into a unified interface.",
    overviewFr: "La gestion d'une salle de sport nécessite des pointages rapides à l'accueil, un suivi fiable des abonnements et une vision opérationnelle claire. Gym CRM centralise les flux quotidiens et les fiches adhérents dans une interface unifiée.",
    objective: "Develop a focused operational application designed to reduce front-desk friction, clarify membership expiration states, and provide staff with structured scheduling and revenue metrics.",
    objectiveFr: "Développer une application opérationnelle ciblée conçue pour fluidifier l'accueil, signaler clairement les forfaits expirés et fournir à l'équipe un planning structuré et un suivi financier.",
    problemSolution: {
      problemTitleEn: "Front-Desk Congestion & Membership Tracking Friction",
      problemTitleFr: "Engorgement à l'Accueil & Suivi Complexe des Adhésions",
      problemDescEn: "Fitness facilities often experience reception bottlenecks during peak hours, unverified entries caused by expired memberships, and disjointed paper rosters for class attendance. Without centralized status indicators, front-desk staff struggle to identify lapsed subscriptions quickly.",
      problemDescFr: "Les salles de sport font souvent face à des ralentissements à l'accueil lors des heures de pointe, des entrées non vérifiées dues à des forfaits expirés et des listes d'émargement papier pour les cours. Sans indicateurs de statut centralisés, l'équipe peine à identifier rapidement les renouvellements en attente.",
      solutionTitleEn: "Centralized Reception & Membership Operations",
      solutionTitleFr: "Gestion Centralisée de l'Accueil & des Adhésions",
      solutionDescEn: "Gym CRM provides a dedicated operations interface combining rapid member lookup, clear subscription status badges (Active, Expired, Frozen), group class capacity planning, and recurring revenue metrics into a single platform.",
      solutionDescFr: "Gym CRM offre une interface d'exploitation dédiée associant recherche rapide de membres, badges de statut visuels (Actif, Expiré, Suspendu), gestion des jauges de cours collectifs et indicateurs de chiffre d'affaires récurrent dans un outil unique."
    },
    metrics: [
      {
        value: "Members",
        label: "Member Management",
        labelFr: "Gestion des Adhérents",
        detail: "Profiles with Active, Expired, and Frozen states",
        detailFr: "Profils et statuts : Actif, Expiré, Suspendu"
      },
      {
        value: "Check-In",
        label: "Front-Desk Terminal",
        labelFr: "Pointage d'Accueil",
        detail: "Rapid member lookup and attendance logs",
        detailFr: "Recherche instantanée et historique de pointage"
      },
      {
        value: "Classes",
        label: "Capacity Planning",
        labelFr: "Planning des Cours",
        detail: "Group class capacity matrix and trainer schedules",
        detailFr: "Jauges de cours collectifs et plannings"
      },
      {
        value: "Revenue",
        label: "MRR & Attendance",
        labelFr: "Revenus & Fréquentation",
        detail: "Monthly recurring revenue and usage charts",
        detailFr: "Synthèse des revenus récurrents et affluence"
      }
    ],
    capabilities: [
      {
        id: "operations-dashboard",
        titleEn: "Front-Desk Check-In & Operational Metrics",
        titleFr: "Pointage d'Accueil & Indicateurs d'Exploitation",
        summaryEn: "A central operational view displaying daily check-in volume, active member count, facility attendance patterns, and monthly recurring revenue (MRR) tracking.",
        summaryFr: "Une vue opérationnelle centrale affichant le volume des pointages du jour, le nombre d'adhérents actifs, la fréquentation de la salle et le suivi du MRR.",
        practicalOutcomeEn: "Enables reception staff to process member arrivals quickly during peak hours while giving management clear visibility into daily facility usage.",
        practicalOutcomeFr: "Permet au personnel d'accueil de traiter rapidement les arrivées en période de pointe tout en offrant à la direction une visibilité sur la fréquentation.",
        image: "/images/projects/gymcrm-main.jpg",
        imageCaptionEn: "Operations dashboard with daily check-in logs, active member totals, and recurring revenue metrics",
        imageCaptionFr: "Tableau de bord d'exploitation avec journal des pointages, adhérents actifs et métriques de revenus"
      },
      {
        id: "member-crm",
        titleEn: "Member Directory & Subscription Status Tracking",
        titleFr: "Annuaire des Adhérents & Suivi des Forfaits",
        summaryEn: "A searchable member directory featuring instant name/ID filtering, subscription history, contact profiles, and visual indicators for Active, Expired, and Frozen plans.",
        summaryFr: "Un annuaire des membres avec recherche instantanée par nom ou identifiant, historique d'abonnement, coordonnées et indicateurs clairs (Actif, Expiré, Suspendu).",
        practicalOutcomeEn: "Designed to clarify membership validity instantly through visual badges, making it straightforward for staff to identify renewals.",
        practicalOutcomeFr: "Conçu pour clarifier immédiatement le statut d'adhésion grâce à des badges visuels, facilitant l'identification des renouvellements par l'équipe.",
        image: "/images/projects/gymcrm-members.jpg",
        imageCaptionEn: "Member directory with instant search and clear status badges for Active, Expired, and Frozen memberships",
        imageCaptionFr: "Annuaire des adhérents avec recherche rapide et badges visuels pour forfaits Actifs, Expirés et Suspendus"
      },
      {
        id: "class-scheduling",
        titleEn: "Class Capacity & Trainer Scheduling Matrix",
        titleFr: "Planning des Cours & Gestion des Jauges",
        summaryEn: "A group fitness scheduling matrix displaying class times, room capacities, assigned trainers, and registered participant counts.",
        summaryFr: "Une grille de planning pour les cours collectifs affichant les créneaux, les capacités de salle, les coachs assignés et le nombre d'inscrits.",
        practicalOutcomeEn: "Structures group class capacities to prevent overcrowding and allows trainers to review attendee rosters in advance.",
        practicalOutcomeFr: "Structure les capacités d'accueil des cours collectifs pour éviter la saturation et permet aux coachs de consulter les listes d'inscrits.",
        image: "/images/projects/gymcrm-classes.jpg",
        imageCaptionEn: "Weekly class schedule matrix with trainer allocations and participant capacity limits",
        imageCaptionFr: "Planning hebdomadaire des cours avec assignation des coachs et limites de capacité"
      },
      {
        id: "financial-analytics",
        titleEn: "Membership Tier & Recurring Revenue Breakdown",
        titleFr: "Suivi des Formules & Revenus Récurrents",
        summaryEn: "Visual charts detailing revenue distribution across subscription tiers (Monthly, Annual, VIP) and member retention trends over time.",
        summaryFr: "Graphiques visuels détaillant la répartition du chiffre d'affaires par formule d'adhésion (Mensuel, Annuel, VIP) et l'évolution des abonnements.",
        practicalOutcomeEn: "Provides facility operators with clear metrics to evaluate which membership tiers generate revenue and when renewal cycles occur.",
        practicalOutcomeFr: "Fournit aux gestionnaires des indicateurs clairs pour évaluer les formules les plus actives et anticiper les cycles de renouvellement."
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Focused Operations Architecture",
        titleFr: "Architecture Opérationnelle Ciblée",
        descEn: "Engineered with Next.js and TypeScript for rapid state updates and responsive interface feedback during front-desk operations.",
        descFr: "Conçu avec Next.js et TypeScript pour des mises à jour d'état rapides et une réactivité optimale lors du pointage d'accueil."
      },
      {
        titleEn: "High-Contrast Status Indicators",
        titleFr: "Indicateurs de Statut Visuels",
        descEn: "Structured visual indicators (Active, Expired, Frozen) enabling front-desk staff to scan and verify membership validity immediately.",
        descFr: "Indicateurs de statut visuels clairs (Actif, Expiré, Suspendu) permettant au personnel de vérifier visuellement le statut d'accès de manière immédiate."
      },
      {
        titleEn: "Class Capacity & Attendance Management",
        titleFr: "Gestion des Jauges & Émargement",
        descEn: "Capacity tracking logic designed to organize group class registration and maintain accurate attendance logs.",
        descFr: "Logique de suivi des jauges conçue pour structurer les inscriptions aux cours et assurer un émargement précis."
      },
      {
        titleEn: "Operational Metrics with Recharts",
        titleFr: "Indicateurs d'Exploitation avec Recharts",
        descEn: "Responsive charts visualizing peak check-in time windows and subscription revenue breakdowns without heavy server processing.",
        descFr: "Graphiques responsives visualisant les heures de pointe d'accueil et la répartition des revenus sans calculs lourds."
      }
    ],
    decisions: [
      {
        titleEn: "High-Contrast Status Badges for Front-Desk Speed",
        titleFr: "Badges de Statut à Fort Contraste pour l'Accueil",
        decisionEn: "Emphasized explicit color-coded subscription statuses (Active, Expired, Frozen) prominently across all member records.",
        decisionFr: "Mise en avant explicite de statuts d'adhésion contrastés (Actif, Expiré, Suspendu) sur l'ensemble des fiches adhérents.",
        rationaleEn: "Reception staff handle check-in queues during peak hours; prominent status badges minimize cognitive load and make membership states immediately scannable.",
        rationaleFr: "Le personnel d'accueil gère des flux d'arrivées denses ; des badges très visibles réduisent la charge cognitive et rendent les statuts immédiatement lisibles."
      },
      {
        titleEn: "Interactive Class Capacity Matrix",
        titleFr: "Grille Interactive de Gestion des Jauges",
        decisionEn: "Structured class scheduling around explicit capacity limits and trainer allocations.",
        decisionFr: "Structuration du planning des cours autour de limites de capacité strictes et d'assignations de coachs.",
        rationaleEn: "Fitness studios have physical space constraints; tracking capacity indicators directly within the schedule grid helps avoid overbooking and scheduling conflicts.",
        rationaleFr: "Les salles ont des contraintes physiques d'espace ; intégrer les indicateurs de capacité dans le planning permet d'anticiper les sureffectifs et les doublons."
      },
      {
        titleEn: "Operational & Recurring Revenue Charts with Recharts",
        titleFr: "Graphiques d'Exploitation et de Revenus via Recharts",
        decisionEn: "Integrated client-side charts for tracking monthly recurring revenue and daily check-in volume distributions.",
        decisionFr: "Intégration de graphiques côté client pour suivre le chiffre d'affaires récurrent et la distribution des pointages journaliers.",
        rationaleEn: "Facility managers need high-level oversight of attendance patterns and renewal health without having to export raw CSVs or build manual reports.",
        rationaleFr: "Les gestionnaires ont besoin d'une vision synthétique de la fréquentation et des renouvellements sans avoir à exporter des fichiers tableurs manuellement."
      }
    ],
    learnings: [
      {
        titleEn: "Designing for High-Velocity Operational Environments",
        titleFr: "Conception pour Environnements Opérationnels Rapides",
        descEn: "Gym CRM emphasized that front-desk tools must prioritize scannability and immediate status clarity over dense, multi-click administrative workflows.",
        descFr: "Ce projet a souligné qu'un outil de réception doit privilégier la lisibilité immédiate et la rapidité d'accès aux statuts plutôt que des parcours complexes."
      },
      {
        titleEn: "Translating Daily Activity into Operational Insight",
        titleFr: "Transformation de l'Activité en Indicateurs de Pilotage",
        descEn: "Structuring check-in logs and subscription tiers into clear visual charts demonstrated how basic operational inputs can be aggregated into useful management insight.",
        descFr: "Structurer les journaux de pointage et les formules en graphiques clairs a montré comment de simples saisies quotidiennes deviennent de précieux outils de pilotage."
      }
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts Analytics",
      "React"
    ],
    techStackDetails: [
      {
        tech: "Next.js",
        purposeEn: "Fast responsive framework for front-desk reception and operational views",
        purposeFr: "Framework réactif pour le terminal d'accueil et les vues d'exploitation"
      },
      {
        tech: "TypeScript",
        purposeEn: "Type definitions for member profiles, subscription statuses, and class schedules",
        purposeFr: "Typage strict des profils membres, des statuts d'adhésion et des plannings"
      },
      {
        tech: "Recharts",
        purposeEn: "Interactive charts for facility attendance trends and recurring revenue",
        purposeFr: "Graphiques interactifs pour la fréquentation de la salle et les revenus récurrents"
      },
      {
        tech: "Tailwind CSS",
        purposeEn: "High-contrast, scannable UI layout optimized for front-desk terminals",
        purposeFr: "Interface contrastée et lisible optimisée pour le poste d'accueil"
      }
    ],
    buildScopeEn: [
      "Front-desk check-in interface with rapid member lookup and attendance logs",
      "Member directory with Active, Expired, and Frozen subscription status indicators",
      "Weekly group class scheduling matrix with trainer assignments and capacity limits",
      "Operational metrics dashboard for monthly recurring revenue (MRR) and attendance trends"
    ],
    buildScopeFr: [
      "Interface de pointage d'accueil avec recherche rapide et journal des entrées",
      "Annuaire des adhérents avec statuts visuels d'abonnement (Actif, Expiré, Suspendu)",
      "Planning hebdomadaire des cours collectifs avec coachs et jauges de capacité",
      "Tableau de bord d'indicateurs opérationnels pour le suivi du MRR et de la fréquentation"
    ],
    features: [
      "Front-desk check-in terminal with member search and attendance logging",
      "Searchable member directory with visual subscription status badges",
      "Group class capacity planning with trainer allocations and participant rosters",
      "Monthly recurring revenue (MRR) and facility attendance charts"
    ],
    featuresFr: [
      "Terminal de pointage d'accueil avec recherche et suivi des présences",
      "Annuaire des adhérents avec badges visuels pour statuts d'abonnement",
      "Planning des cours collectifs avec jauges de capacité et assignation des coachs",
      "Graphiques pour le chiffre d'affaires récurrent (MRR) et l'affluence"
    ],
    heroImage: "/images/projects/gymcrm-main.jpg",
    galleryImages: [
      "/images/projects/gymcrm-main.jpg",
      "/images/projects/gymcrm-members.jpg",
      "/images/projects/gymcrm-classes.jpg"
    ],
    githubUrl: "https://github.com/youssefmanssouri/Gym-CRM",
    liveUrl: "https://gym-crm-mauve.vercel.app/",
    hasLiveDemo: true,
    featured: true,
    order: 3,
    schemaType: "WebApplication",
    applicationCategory: "BusinessApplication"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAdjacentProjects(currentSlug: string): { prev: Project; next: Project } {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const total = PROJECTS.length;
  
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex]
  };
}
