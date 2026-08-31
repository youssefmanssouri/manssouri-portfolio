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
  seoDescription?: string;
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
    seoTitle: "BusinessOS — SaaS Business Operations Platform",
    seoDescription: "BusinessOS is a full-stack SaaS operations platform built with Next.js 15, TypeScript, PostgreSQL, and Prisma ORM, unifying CRM, invoicing, bookings, HR directory, and Recharts analytics.",
    lastModified: "2026-08-20",
    category: "CUSTOM BUSINESS PLATFORM",
    categoryFr: "PLATEFORME MÉTIER SUR MESURE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A custom business management platform that centralizes operational workflows, CRM client records, itemized invoicing, appointment bookings, and financial tracking into a unified workspace.",
    shortDescriptionFr: "Une plateforme de gestion d'entreprise sur mesure qui centralise les flux opérationnels, le CRM clients, la facturation, les réservations et le suivi financier dans un espace unique.",
    longDescription: "BusinessOS was built to eliminate the cost and confusion of fragmented SaaS tools. It unifies daily client management, billing, scheduling, team rosters, and real-time cash flow into one responsive command center.",
    longDescriptionFr: "BusinessOS a été développé pour éliminer les coûts et la dispersion des logiciels SaaS. Il rassemble la gestion des prospects, la facturation, les plannings, les RH et la trésorerie dans un centre de commande unifié.",
    overview: "Growing organizations often juggle separate subscriptions for CRM, billing, bookings, team directory, and cash flow reporting. BusinessOS consolidates these workflows into one responsive command center, reducing context-switching and operational overhead.",
    overviewFr: "Les entreprises en croissance gèrent leurs activités en jonglant entre des logiciels séparés pour le CRM, la facturation, les rendez-vous, les RH et la trésorerie. BusinessOS regroupe ces flux dans un centre de commande unifié.",
    objective: "Architect a multi-tenant business workspace delivering fast client navigation, relational data presentation, role-based access control (RBAC), and server-enforced demo environment protections.",
    objectiveFr: "Architecturer une application SaaS multi-tenant offrant une navigation rapide, une présentation claire des données relationnelles, un contrôle d'accès par rôle (RBAC) et une sécurisation serveur en mode démo.",
    problemSolution: {
      problemTitleEn: "Operational Fragmentation & Tool Silos",
      problemTitleFr: "Fragmentation Opérationnelle & Silos d'Informations",
      problemDescEn: "Growing businesses operate on a fragmented stack of disconnected tools: one SaaS for leads, another for invoicing, external calendars for bookings, and spreadsheets for finance. This fragmentation inflates software subscriptions, creates data silos, and wastes valuable operational hours.",
      problemDescFr: "Les entreprises en croissance gèrent souvent leurs activités avec des outils déconnectés : un CRM pour les prospects, un logiciel pour la facturation, des calendriers externes et des tableurs pour les RH et la trésorerie. Cette fragmentation engendre des coûts logiciels inutiles et des pertes de temps au quotidien.",
      solutionTitleEn: "Unified Operational Command Center",
      solutionTitleFr: "Centre de Commande Opérationnel Unifié",
      solutionDescEn: "BusinessOS consolidates client pipelines, itemized invoices, appointment scheduling, team rosters, and real-time cash flow into one cohesive workspace with role-based access control.",
      solutionDescFr: "BusinessOS regroupe l'ensemble des flux métiers essentiels au sein d'un centre de contrôle unique. Les équipes pilotent prospects, factures, plannings et trésorerie sans dispersion d'outils, avec un accès sécurisé par rôle."
    },
    metrics: [
      {
        value: "CRM",
        label: "Client Pipeline",
        labelFr: "Pipeline Commercial",
        detail: "Lead stages, deal tracking, client records",
        detailFr: "Statuts de prospection, suivi des opportunités"
      },
      {
        value: "Invoicing",
        label: "Billing & Quotes",
        labelFr: "Facturation & Devis",
        detail: "Itemized invoices, tax calculations, status tracking",
        detailFr: "Factures détaillées, calculs de TVA, statuts"
      },
      {
        value: "Scheduling",
        label: "Calendar Bookings",
        labelFr: "Planification",
        detail: "Appointment reservations, team availability",
        detailFr: "Réservations clients, planning d'équipe"
      },
      {
        value: "Analytics",
        label: "Financial Telemetry",
        labelFr: "Télémétrie Financière",
        detail: "Cash flow trends, revenue charts, activity feeds",
        detailFr: "Flux de trésorerie, graphiques de revenus"
      }
    ],
    capabilities: [
      {
        id: "executive-dashboard",
        titleEn: "Executive Command Center & Live Telemetry",
        titleFr: "Tableau de Bord Exécutif & Télémétrie Financière",
        summaryEn: "A centralized dashboard displaying active revenue metrics, monthly pipeline volume, pending invoices, and real-time operational activity feeds.",
        summaryFr: "Un tableau de bord centralisé affichant les indicateurs de chiffre d'affaires, le volume du pipeline commercial, les factures en attente et l'activité récente.",
        practicalOutcomeEn: "Enables business owners and team leaders to assess operational velocity and financial health at a glance without requesting manual reports.",
        practicalOutcomeFr: "Permet aux dirigeants et responsables de mesurer l'activité opérationnelle et la santé financière en un coup d'œil, sans compilation manuelle.",
        image: "/images/projects/businessos-main.jpg",
        imageCaptionEn: "Executive command dashboard with live revenue KPIs, activity logs, and financial telemetry",
        imageCaptionFr: "Tableau de bord exécutif avec KPI de chiffre d'affaires, journal d'activité et télémétrie financière"
      },
      {
        id: "crm-pipeline",
        titleEn: "CRM Deal Pipeline & Client Directory",
        titleFr: "Pipeline Commercial CRM & Répertoire Clients",
        summaryEn: "A multi-stage sales opportunity tracker with structured client records, contact histories, and deal progression stages.",
        summaryFr: "Un suivi structuré des opportunités commerciales avec fiches clients détaillées, historique des échanges et étapes de conversion.",
        practicalOutcomeEn: "Keeps client relationships and sales opportunities organized from initial contact to completed project, ensuring zero lost inquiries.",
        practicalOutcomeFr: "Structure la relation client et les opportunités de vente du premier contact à la finalisation du projet, évitant toute perte de prospect.",
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
        practicalOutcomeEn: "Accelerates invoicing turnaround and provides clear, searchable records of paid, pending, and overdue receivables.",
        practicalOutcomeFr: "Accélère l'émission des factures et assure un suivi rigoureux des créances payées, en attente ou en retard.",
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
        practicalOutcomeEn: "Eliminates scheduling conflicts and double-bookings while keeping client consultations directly tied to their CRM records.",
        practicalOutcomeFr: "Élimine les conflits de planning et les doubles réservations tout en reliant directement chaque consultation à la fiche CRM du client.",
        image: "/images/projects/businessos-calendar.jpg",
        imageCaptionEn: "Resource appointment calendar with staff availability and consultation booking management",
        imageCaptionFr: "Calendrier de réservation avec gestion des disponibilités de l'équipe et des rendez-vous"
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Full-Stack Architecture",
        titleFr: "Architecture Full-Stack",
        descEn: "Built with Next.js 15 App Router and React 19, utilizing Server Actions for direct server mutations with zero API boilerplate.",
        descFr: "Développé avec Next.js 15 App Router et React 19, exploitant les Server Actions pour des mutations directes côté serveur sans surcoût d'API."
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
        titleEn: "Protected Demo Environment",
        titleFr: "Environnement Démo Sécurisé",
        descEn: "Server-level guards intercept database mutations during public demo exploration, safeguarding data integrity while allowing full UI interaction.",
        descFr: "Des garde-fous serveur interceptent les écritures lors des visites publiques, protégeant les données tout en permettant une découverte interactive."
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
        tech: "Tailwind CSS",
        purposeEn: "Custom responsive command-center interface and unified tokens",
        purposeFr: "Système de design sur mesure et interface responsive pour centre de commande"
      },
      {
        tech: "Recharts Analytics",
        purposeEn: "Interactive financial trends, pipeline metrics, and telemetry charts",
        purposeFr: "Graphiques interactifs de flux financiers et de progression commerciale"
      }
    ],
    buildScopeEn: [
      "Multi-module business operations architecture (CRM, Invoicing, Bookings, HR, Cash Flow)",
      "Relational PostgreSQL database schema with Prisma ORM",
      "Interactive financial telemetry & cash flow visualization with Recharts",
      "Role-based access control (Admin, Manager, Staff) with server-side validation",
      "Protected interactive sandbox with simulated enterprise data and mutation guards"
    ],
    buildScopeFr: [
      "Architecture logicielle multi-modules (CRM, Facturation, Réservations, RH, Trésorerie)",
      "Modèle de données relationnel PostgreSQL structuré avec Prisma ORM",
      "Visualisation interactive de télémétrie financière et trésorerie (Recharts)",
      "Structure de contrôle d'accès par rôle (Admin, Manager, Équipe) et validation serveur",
      "Environnement de test interactif avec protection des écritures serveur et données de démo"
    ],
    features: [
      "Executive Dashboard with live revenue KPIs, activity logs, and Recharts telemetry",
      "CRM Deal Pipeline with multi-stage sales tracking and customer record lookups",
      "Itemized Invoicing engine with automatic tax/subtotal calculation and status tracking",
      "Client Appointment Booking calendar with staff capacity and duration management",
      "Employee Directory featuring department rosters and role-based permissions (RBAC)",
      "Real-time Cash Flow ledger with income/expense tracking and financial analytics"
    ],
    featuresFr: [
      "Tableau de bord exécutif avec KPI de chiffre d'affaires et graphiques Recharts",
      "CRM & Pipeline commercial avec suivi des opportunités et fiches clients",
      "Moteur de facturation détaillée avec calcul automatique des taxes et sous-totaux",
      "Planning de réservation de rendez-vous clients et gestion des disponibilités",
      "Annuaire RH avec fiches employés et gestion des autorisations par rôle (RBAC)",
      "Livre de trésorerie en temps réel avec suivi des recettes/dépenses et analytics"
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
    title: "Lumière Parfums — Custom Fragrance E-Commerce Boutique",
    seoTitle: "Lumière Parfums — Fragrance E-Commerce Case Study",
    seoDescription: "Lumière Parfums is a custom e-commerce web application engineered for fragrance discovery, olfactory pyramid breakdowns, persistent cart interaction, and store administration.",
    lastModified: "2026-08-15",
    category: "CUSTOM E-COMMERCE EXPERIENCE",
    categoryFr: "EXPÉRIENCE E-COMMERCE SUR MESURE",
    role: "Designed & Developed (Independent Project)",
    roleFr: "Conception & Développement (Projet Indépendant)",
    shortDescription: "A custom e-commerce experience designed to help a fragrance brand present its products with stronger storytelling, guide online discovery through scent characteristics, and provide a smooth journey from exploration to purchase.",
    shortDescriptionFr: "Une expérience e-commerce sur mesure conçue pour valoriser des créations olfactives par le récit de marque, guider la découverte par les notes et offrir un parcours fluide de la visite à la commande.",
    longDescription: "Lumière Parfums translates the tactile nuances of fragrance discovery into a structured digital boutique. It pairs olfactory accord filtering and scent pyramid breakdowns with persistent cart state management and store data administration.",
    longDescriptionFr: "Lumière Parfums transpose les subtilités de la parfumerie dans une boutique numérique structurée. Le projet associe un filtrage par accords olfactifs, la décomposition des pyramides de notes, la persistance du panier et la gestion des données de la boutique.",
    overview: "Selling fragrance online requires bridging the sensory gap between a digital screen and physical scent evaluation. Lumière Parfums addresses this with accord filtering, editorial scent pyramids, and an integrated store administration dashboard.",
    overviewFr: "Vendre du parfum en ligne exige de combler l'écart sensoriel entre un écran et l'évaluation olfactive réelle. Lumière Parfums répond à ce défi par le filtrage des accords, des pyramides olfactives détaillées et une interface d'administration.",
    objective: "Architect a dedicated e-commerce experience that facilitates fragrance exploration without physical testing, reduces purchasing friction, and provides direct store management controls.",
    objectiveFr: "Concevoir une plateforme e-commerce dédiée facilitant l'exploration olfactive sans test physique préalable, réduisant les frictions d'achat et offrant une gestion directe de la boutique.",
    problemSolution: {
      problemTitleEn: "The Challenge of Online Fragrance Discovery",
      problemTitleFr: "Le Défi de la Vente de Parfums en Ligne",
      problemDescEn: "Selling fragrance online is fundamentally different from selling physical products that customers can immediately evaluate. Because a customer cannot smell a fragrance through a screen, standard e-commerce grid layouts fail to provide the context needed for confident product comparison, leaving shoppers dependent on guesswork.",
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
        detail: "Olfactory families, accords, notes, gender, price",
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
        detail: "Slide-out cart across page navigation",
        detailFr: "Maintient les sélections du visiteur durant la session"
      },
      {
        value: "Admin",
        label: "Store Control",
        labelFr: "Administration Boutique",
        detail: "Catalog pricing and inventory management",
        detailFr: "Gestion du catalogue, prix et commandes"
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
        practicalOutcomeEn: "Provides essential olfactory context and evolution stages, helping customers understand how the fragrance unfolds over time when physical testing is unavailable.",
        practicalOutcomeFr: "Apporte le contexte olfactif indispensable sur l'évolution du parfum, aidant le client à appréhender la fragrance sans test physique.",
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
        practicalOutcomeEn: "Reduces friction between exploration and purchasing by keeping bag items accessible without forcing full-page redirects away from discovery.",
        practicalOutcomeFr: "Réduit les frictions entre la découverte et l'achat en gardant le panier accessible à tout moment sans interrompre la visite.",
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
        practicalOutcomeEn: "Connects customer-facing shopping with day-to-day store operations, ensuring the boutique owner has direct administrative oversight of store data.",
        practicalOutcomeFr: "Relie la boutique en ligne à la gestion opérationnelle quotidienne, assurant un contrôle administratif direct sur les données du catalogue.",
        image: "/images/projects/lumiere-admin.jpg",
        imageCaptionEn: "Administrative portal for store inventory oversight, product data management, and order records",
        imageCaptionFr: "Portail d'administration pour la gestion des stocks, des fiches produits et des commandes"
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Modern App Router Architecture",
        titleFr: "Architecture Next.js App Router",
        descEn: "Built with Next.js App Router and TypeScript for rapid page transitions, strong component boundaries, and resilient state handling.",
        descFr: "Développé avec Next.js App Router et TypeScript pour des transitions fluides, des composants modulaires et une gestion fiable des états."
      },
      {
        titleEn: "Client-Side Discovery Engine",
        titleFr: "Moteur de Recherche Côté Client",
        descEn: "Zero-latency multi-attribute filtering algorithm enabling instant catalog refinement across notes, accords, and price brackets.",
        descFr: "Algorithme de filtrage multi-critères instantané côté client permettant d'affiner le catalogue par notes et accords sans latence."
      },
      {
        titleEn: "Local State Continuity",
        titleFr: "Continuité de l'État Local",
        descEn: "Client-side storage synchronization preserving customer bag selections and preferences throughout browsing sessions.",
        descFr: "Synchronisation du stockage local garantissant la préservation du panier et des préférences tout au long de la visite."
      },
      {
        titleEn: "Administrative Portal Isolation",
        titleFr: "Espace d'Administration Structuré",
        descEn: "Protected management interface separating customer storefront browsing from backend product inventory and store data controls.",
        descFr: "Interface de gestion structurée séparant l'expérience client publique des contrôles d'inventaire et des données de la boutique."
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
    seoTitle: "Gym CRM — Fitness Facility & Member Management Case Study",
    seoDescription: "Gym CRM is a dedicated fitness management web application designed for front-desk check-in verification, membership status tracking, class scheduling, and recurring revenue telemetry.",
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
    objective: "Develop a focused operational application that eliminates reception bottlenecks, prevents unverified entry from expired memberships, and provides staff with structured scheduling and revenue telemetry.",
    objectiveFr: "Développer une application opérationnelle ciblée qui élimine les engorgements à l'accueil, prévient les accès non autorisés sur forfaits expirés et fournit à l'équipe un planning structuré et un suivi financier.",
    problemSolution: {
      problemTitleEn: "Front-Desk Bottlenecks & Unmonitored Expirations",
      problemTitleFr: "Engorgement à l'Accueil & Forfaits Expirés Non Détectés",
      problemDescEn: "Fitness facilities often experience severe reception bottlenecks during peak hours, unverified entries caused by expired memberships, and disjointed paper rosters for class attendance. Without centralized status indicators, staff struggle to identify lapsed subscriptions in real time.",
      problemDescFr: "Les salles de sport font souvent face à des ralentissements à l'accueil lors des heures de pointe, des entrées non vérifiées dues à des forfaits expirés et des listes d'émargement papier pour les cours. Sans indicateurs de statut centralisés, l'équipe peine à identifier les renouvellements en attente.",
      solutionTitleEn: "Centralized Reception & Membership Operations",
      solutionTitleFr: "Gestion Centralisée de l'Accueil & des Adhésions",
      solutionDescEn: "Gym CRM provides a dedicated operations interface combining rapid member lookup, clear subscription status badges (Active, Expired, Frozen), group class capacity planning, and recurring revenue telemetry into a single administrative platform.",
      solutionDescFr: "Gym CRM offre une interface d'exploitation dédiée associant recherche rapide de membres, badges de statut visuels (Actif, Expiré, Suspendu), gestion des jauges de cours collectifs et suivi du chiffre d'affaires récurrent dans un outil unique."
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
        label: "Financial Tracking",
        labelFr: "Suivi des Revenus",
        detail: "Monthly recurring revenue summaries and metrics",
        detailFr: "Synthèse des revenus récurrents et métriques"
      }
    ],
    capabilities: [
      {
        id: "operations-dashboard",
        titleEn: "Front-Desk Check-In & Facility Telemetry",
        titleFr: "Pointage d'Accueil & Télémétrie Opérationnelle",
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
        practicalOutcomeEn: "Prevents unverified facility access by highlighting expired memberships instantly, making it straightforward for staff to manage renewals.",
        practicalOutcomeFr: "Empêche les accès non autorisés en signalant immédiatement les forfaits expirés, facilitant ainsi la gestion des renouvellements par l'équipe.",
        image: "/images/projects/gymcrm-members.jpg",
        imageCaptionEn: "Member directory with instant search and clear status badges for Active, Expired, and Frozen memberships",
        imageCaptionFr: "Annuaire des adhérents avec recherche rapide et badges visuels pour forfaits Actifs, Expirés et Suspendus"
      },
      {
        id: "class-scheduling",
        titleEn: "Class Capacity & Trainer Scheduling Matrix",
        titleFr: "Planning des Cours & Gestion des Jauges",
        summaryEn: "A structured scheduling grid for group fitness classes, trainer allocations, room assignments, and attendee capacity limits.",
        summaryFr: "Une grille de planification pour les cours collectifs, l'affectation des coachs, les salles dédiées et les limites de capacité d'accueil.",
        practicalOutcomeEn: "Prevents class overcrowding and helps organizers manage facility resources and trainer schedules without scheduling conflicts.",
        practicalOutcomeFr: "Évite la surfréquentation des cours et aide les organisateurs à gérer les ressources de la salle et les plannings des coachs sans conflit.",
        image: "/images/projects/gymcrm-classes.jpg",
        imageCaptionEn: "Group fitness class scheduler with trainer allocation and attendee capacity limits",
        imageCaptionFr: "Planning des cours collectifs avec affectation des coachs et gestion des jauges d'accueil"
      },
      {
        id: "revenue-telemetry",
        titleEn: "Operational Financial Telemetry & MRR Analytics",
        titleFr: "Télémétrie Financière & Analyse des Revenus",
        summaryEn: "Integrated reporting charts that break down monthly recurring revenue, membership tier distributions, and attendance trends across time.",
        summaryFr: "Des graphiques de synthèse détaillant le chiffre d'affaires récurrent mensuel, la répartition des formules d'adhésion et les tendances de présence.",
        practicalOutcomeEn: "Provides gym operators with clear visibility into recurring revenue and membership patterns to support data-informed operational decisions.",
        practicalOutcomeFr: "Donne aux gérants de salle une visibilité claire sur les revenus récurrents et les tendances d'adhésion pour appuyer leurs décisions de gestion.",
        image: "/images/projects/gymcrm-main.jpg",
        imageCaptionEn: "Financial telemetry view with monthly recurring revenue breakdown and membership tier distribution",
        imageCaptionFr: "Visualisation financière avec répartition du chiffre d'affaires récurrent et distribution des forfaits"
      }
    ],
    engineeringPoints: [
      {
        titleEn: "Responsive Reception Architecture",
        titleFr: "Architecture d'Accueil Réactive",
        descEn: "Built with Next.js and TypeScript to deliver instant front-desk lookups and dependable responsive layouts across front-desk tablets and desktops.",
        descFr: "Développé avec Next.js et TypeScript pour assurer des recherches instantanées et une interface réactive sur tablettes d'accueil et postes fixes."
      },
      {
        titleEn: "Relational Data Modeling",
        titleFr: "Modélisation Relationnelle des Données",
        descEn: "Structured relational database persistence linking member profiles, subscription tiers, check-in logs, and payment records.",
        descFr: "Base de données relationnelle structurée reliant les profils adhérents, les formules d'abonnement, les pointages et les règlements."
      },
      {
        titleEn: "Role-Based Staff Permissions",
        titleFr: "Autorisations par Rôle du Personnel",
        descEn: "Granular access control separating administrative configuration from daily front-desk reception check-in and trainer schedule views.",
        descFr: "Contrôle d'accès granulaire séparant la configuration administrative des fonctions de pointage d'accueil et de consultation des plannings."
      },
      {
        titleEn: "Operational Data Visualization",
        titleFr: "Visualisation des Données d'Exploitation",
        descEn: "Visual reporting components designed to transform raw check-in timestamps and membership dates into actionable operational trends.",
        descFr: "Composants visuels transformant les données brutes de pointage et d'adhésion en tendances opérationnelles lisibles."
      }
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL"
    ],
    techStackDetails: [
      {
        tech: "Next.js",
        purposeEn: "Front-desk operations portal with responsive views",
        purposeFr: "Portail d'exploitation et interface d'accueil réactive"
      },
      {
        tech: "TypeScript",
        purposeEn: "Strict data typing for member profiles, attendance logs, and class rosters",
        purposeFr: "Typage rigoureux des profils adhérents, pointages et cours"
      },
      {
        tech: "PostgreSQL & Prisma ORM",
        purposeEn: "Structured member records, plan tiers, and booking capacity models",
        purposeFr: "Modélisation des adhérents, forfaits et jauges de cours"
      },
      {
        tech: "Tailwind CSS",
        purposeEn: "High-contrast front-desk terminal UI and quick status indicators",
        purposeFr: "Interface d'accueil à fort contraste et indicateurs de statut visuels"
      }
    ],
    buildScopeEn: [
      "Reception desk attendance check-in terminal with instant search",
      "Member directory with Active, Expired, and Frozen subscription badges",
      "Group class scheduling matrix with trainer allocations & attendee capacity",
      "Monthly recurring revenue (MRR) summaries & membership tier breakdown",
      "Role-based operations interface designed for front-desk and management staff"
    ],
    buildScopeFr: [
      "Borne de pointage d'accueil avec recherche instantanée d'adhérents",
      "Annuaire des membres avec alertes visuelles (Actif, Expiré, Suspendu)",
      "Grille de planification des cours collectifs avec jauges et affectation coachs",
      "Suivi du chiffre d'affaires récurrent mensuel (MRR) et répartition des forfaits",
      "Interface d'exploitation structurée pour le personnel d'accueil et la direction"
    ],
    features: [
      "Rapid ID & member name search for front-desk reception check-ins",
      "Member management database with visual renewal status indicators",
      "Group class capacity scheduling and trainer allocation matrix",
      "Financial telemetry tracking monthly recurring revenue (MRR)",
      "Role-based access permissions for reception staff, trainers, and admins"
    ],
    featuresFr: [
      "Recherche rapide par nom et identifiant pour le pointage d'accueil",
      "Gestionnaire d'adhérents avec alertes visuelles d'expiration de forfait",
      "Planning des cours collectifs avec gestion des jauges et des coachs",
      "Télémétrie financière suivant le chiffre d'affaires récurrent (MRR)",
      "Gestion des autorisations par rôle pour réceptionnistes, coachs et gérants"
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
    order: 3,
    schemaType: "WebApplication",
    applicationCategory: "BusinessApplication"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}


