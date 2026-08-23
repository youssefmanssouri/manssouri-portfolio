import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL || "file:dev.db";
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "manssouriyoussef33@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin_ym_portfolio_2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: "Youssef Manssouri",
    },
    create: {
      email: adminEmail,
      name: "Youssef Manssouri",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin user seeded: ${admin.email}`);

  // 2. Seed Flagship Projects
  const projectsData = [
    {
      slug: "businessos",
      title: "BusinessOS",
      category: "SAAS · BUSINESS PLATFORM",
      type: "PERSONAL PROJECT",
      taglineEn: "Centralizing essential business operations in one intelligent system.",
      taglineFr: "Centraliser l'ensemble des opérations essentielles de votre entreprise au sein d'un système intelligent unique.",
      descriptionEn: "A comprehensive business platform designed to centralize essential business operations in one system.",
      descriptionFr: "Une plateforme d'entreprise complète conçue pour centraliser les opérations clés au sein d'un système unifié.",
      overviewEn: "BusinessOS was created to address operational fragmentation common in business management. By integrating CRM, financial invoicing, bookings, HR directory, and cash flow analytics into a single high-performance web application, it provides decision-makers with a clear command center.",
      overviewFr: "BusinessOS a été conçu pour résoudre la fragmentation opérationnelle fréquente dans la gestion d'entreprise. En intégrant le CRM, la facturation financière, les réservations, l'annuaire RH et l'analyse de trésorerie au sein d'une application web fluide, il offre un véritable centre de pilotage stratégique.",
      objectiveEn: "Design and architect an enterprise-grade SaaS platform dashboard capable of handling multi-module business workflows with low-latency navigation, responsive data visualisations, and role-based access.",
      objectiveFr: "Concevoir et architecturer un tableau de bord SaaS de niveau entreprise, capable de gérer des flux de travail multi-modules avec une navigation ultra-rapide, des visualisations de données réactives et une gestion des accès par rôles.",
      outcomeEn: "Personal project created to demonstrate full-stack SaaS architecture capabilities, complex state management, and modern dashboard UI design.",
      outcomeFr: "Projet personnel réalisé pour démontrer mes compétences en architecture SaaS full-stack, en gestion d'états complexes et en design d'interfaces de tableaux de bord modernes.",
      featured: true,
      published: true,
      editorialVariant: "featured-large",
      githubUrl: "https://github.com/youssefmanssouri",
      liveUrl: "https://github.com/youssefmanssouri",
      heroImage: "/images/projects/businessos-main.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Framer Motion", "Recharts"],
      features: [
        {
          titleEn: "CRM Deal Pipeline",
          titleFr: "Pipeline d'affaires CRM",
          descriptionEn: "Customer Relationship Management with deal pipeline tracking",
          descriptionFr: "Gestion de la relation client avec suivi détaillé du pipeline commercial"
        },
        {
          titleEn: "Automated Invoicing",
          titleFr: "Facturation automatisée",
          descriptionEn: "Automated invoicing, recurring billing & financial status logs",
          descriptionFr: "Facturation automatisée, abonnements récurrents et journaux de trésorerie"
        },
        {
          titleEn: "Appointment Booking",
          titleFr: "Gestion des rendez-vous",
          descriptionEn: "Integrated client appointment & resource booking calendar",
          descriptionFr: "Calendrier intégré pour la prise de rendez-vous clients et la réservation de ressources"
        },
        {
          titleEn: "HR Directory",
          titleFr: "Annuaire RH",
          descriptionEn: "HR directory with employee profiles and department tracking",
          descriptionFr: "Annuaire RH complet avec profils d'employés et suivi par département"
        }
      ],
      challenges: [
        {
          textEn: "Architecting a clean, modular UI layout that remains intuitive despite displaying dense financial and operational data.",
          textFr: "Architecturer une interface modulaire et épurée qui reste intuitive malgré la densité des données financières et opérationnelles."
        },
        {
          textEn: "Optimizing chart rendering and state synchronization across multiple dynamic dashboard widgets.",
          textFr: "Optimiser le rendu des graphiques et la synchronisation des états à travers plusieurs widgets dynamiques."
        }
      ]
    },
    {
      slug: "lumiere-parfums",
      title: "Lumière Parfums",
      category: "E-COMMERCE",
      type: "PERSONAL PROJECT",
      taglineEn: "Elevated luxury shopping for niche fragrance connoisseurs.",
      taglineFr: "Une expérience d'achat haut de gamme dédiée aux passionnés de haute parfumerie.",
      descriptionEn: "A premium full-stack e-commerce experience designed around product discovery, shopping and online store management.",
      descriptionFr: "Une expérience e-commerce full-stack d'exception, articulée autour de la découverte produit, de l'achat et de la gestion de boutique.",
      overviewEn: "Lumière Parfums is a bespoke digital boutique for artisanal fragrances. Built with a focus on editorial typography, high-impact imagery, and instant client interactions, it blends brand storytelling with seamless transaction flows.",
      overviewFr: "Lumière Parfums est une boutique en ligne sur mesure dédiée à la parfumerie artisanale. Conçue avec une attention particulière portée à la typographie éditoriale, aux visuels haute définition et aux interactions instantanées, elle associe avec élégance le storytelling de marque et la simplicité de commande.",
      objectiveEn: "Develop a high-converting luxury storefront that prioritizes visual elegance, swift product filtering, responsive cart management, and a robust backend administration system.",
      objectiveFr: "Développer une boutique en ligne à forte conversion privilégiant l'élégance visuelle, le filtrage rapide des produits, la gestion fluide du panier et une administration arrière-plan robuste.",
      outcomeEn: "Personal project created to showcase e-commerce architecture, product filtering algorithms, and visual branding execution.",
      outcomeFr: "Projet personnel développé pour mettre en valeur mon savoir-faire en architecture e-commerce, en algorithmes de filtrage et en identité visuelle digitale.",
      featured: true,
      published: true,
      editorialVariant: "two-column-alt",
      githubUrl: "https://github.com/youssefmanssouri",
      liveUrl: "https://github.com/youssefmanssouri",
      heroImage: "/images/projects/lumiere-main.jpg",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
      features: [
        {
          titleEn: "Fragrance Profile Filtering",
          titleFr: "Filtrage par profil olfactif",
          descriptionEn: "Dynamic fragrance catalog with scent profile filtering (Notes, Accord, Season)",
          descriptionFr: "Catalogue dynamique avec filtres par notes, accords olfactifs et saisons"
        },
        {
          titleEn: "Persistent Cart Drawer",
          titleFr: "Panier persistant",
          descriptionEn: "Persistent cart state with instant drawer checkout preparation",
          descriptionFr: "Gestion du panier persistant avec volet de commande instantané"
        },
        {
          titleEn: "Store Administration",
          titleFr: "Administration de boutique",
          descriptionEn: "Store admin dashboard for inventory, stock alerts, and sales reporting",
          descriptionFr: "Tableau de bord administrateur pour la gestion des stocks et les rapports de ventes"
        }
      ],
      challenges: [
        {
          textEn: "Balancing high-resolution imagery and elegant animations with fast page-load speeds.",
          textFr: "Concilier des visuels haute définition et des animations élégantes avec des temps de chargement ultra-rapides."
        },
        {
          textEn: "Implementing efficient real-time filtering without causing layout shifts or search delays.",
          textFr: "Mettre en place un filtrage en temps réel efficace sans saut de mise en page ni latence d'affichage."
        }
      ]
    },
    {
      slug: "ember-coffee",
      title: "Ember Coffee",
      category: "BUSINESS WEBSITE · E-COMMERCE",
      type: "PERSONAL PROJECT",
      taglineEn: "Artisanal coffee experience brought to life digitally.",
      taglineFr: "L'art du café artisanal sublimé par une expérience numérique sur mesure.",
      descriptionEn: "A premium coffee brand experience combining strong visual design, responsive user experience and e-commerce functionality.",
      descriptionFr: "Une expérience de marque haut de gamme alliant design visuel affirmé, ergonomie réactive et fonctionnalités d'achat en ligne.",
      overviewEn: "Ember Coffee combines an inviting brand narrative with direct-to-consumer coffee bean and equipment sales. The platform allows customers to explore roast profiles, select customized coffee grinds, and subscribe to recurring bean deliveries.",
      overviewFr: "Ember Coffee associe un storytelling chaleureux à la vente directe de grains torréfiés et d'équipements. La plateforme permet de découvrir les profils de torréfaction, de sélectionner sa mouture sur mesure et de s'abonner à des livraisons récurrentes.",
      objectiveEn: "Craft a warm, sensory brand website and storefront that converts casual readers into subscription buyers through clear UX and fast checkout.",
      objectiveFr: "Créer un site vitrine et marchand immersif transformant les visiteurs en abonnés fidèles grâce à un parcours utilisateur clair et un paiement rapide.",
      outcomeEn: "Personal project created to demonstrate brand-focused web development, interactive customization controls, and full-stack integration.",
      outcomeFr: "Projet personnel conçu pour illustrer la création de sites de marque, les sélecteurs interactifs personnalisés et l'intégration full-stack.",
      featured: true,
      published: true,
      editorialVariant: "visual-showcase",
      githubUrl: "https://github.com/youssefmanssouri",
      liveUrl: "https://github.com/youssefmanssouri",
      heroImage: "/images/projects/ember-main.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Django", "PostgreSQL"],
      features: [
        {
          titleEn: "Interactive Roast & Origin Selector",
          titleFr: "Sélecteur de torréfaction & origine",
          descriptionEn: "Interactive roast profile & origin selector",
          descriptionFr: "Sélecteur interactif de profil de torréfaction et d'origine des grains"
        },
        {
          titleEn: "Custom Grind Selection",
          titleFr: "Personnalisation de mouture",
          descriptionEn: "Custom grind selection (Whole Bean, Espresso, French Press, Filter)",
          descriptionFr: "Choix de la mouture adapté à votre mode d'extraction (Grains, Espresso, Piston, Filtre)"
        },
        {
          titleEn: "Brew Recipe Guides",
          titleFr: "Guides d'extraction",
          descriptionEn: "Brew guide interactive content section with timed recipes",
          descriptionFr: "Section de recettes interactives d'extraction avec minuteur intégré"
        }
      ],
      challenges: [
        {
          textEn: "Crafting custom micro-interactions for grind selector widgets that feel intuitive across mobile touch screens.",
          textFr: "Concevoir des micro-interactions intuitives pour les widgets de sélection sur écrans tactiles mobiles."
        },
        {
          textEn: "Structuring a clean Django backend API integration for inventory and order management.",
          textFr: "Structurer une intégration API propre avec un backend Django pour la gestion des commandes et inventaires."
        }
      ]
    },
    {
      slug: "gym-crm",
      title: "Gym CRM",
      category: "BUSINESS APPLICATION · CRM",
      type: "PERSONAL PROJECT",
      taglineEn: "Streamlining fitness facility operations and member management.",
      taglineFr: "Optimiser les opérations quotidiennes et la gestion des membres de centres de remise en forme.",
      descriptionEn: "A modern fitness business application managing member subscriptions, class scheduling, and facility analytics.",
      descriptionFr: "Une application métier moderne pour la gestion des abonnements, des plannings de cours et des statistiques de fréquentation.",
      overviewEn: "Gym CRM was engineered for boutique gyms and fitness centers needing an efficient tool to handle daily operations. It manages member profiles, monthly membership status, check-in records, trainer schedules, and revenue metrics.",
      overviewFr: "Gym CRM a été développé pour les salles de sport et studios de fitness souhaitant optimiser leurs opérations au quotidien. Il gère les profils membres, les statuts d'abonnement, le contrôle d'accès, le planning des coachs et les indicateurs financiers.",
      objectiveEn: "Build a reliable administrative portal with quick search, instant check-in logging, and automated renewal reminders.",
      objectiveFr: "Construire un portail d'administration fiable offrant une recherche rapide, un pointage instantané et des rappels automatiques de renouvellement.",
      outcomeEn: "Personal project created to demonstrate business application workflows, REST API consumption, and data-dense UI design.",
      outcomeFr: "Projet personnel réalisé pour illustrer la conception d'applications métier complexes, la consommation d'API REST et le design d'interfaces orientées données.",
      featured: true,
      published: true,
      editorialVariant: "app-showcase",
      githubUrl: "https://github.com/youssefmanssouri",
      liveUrl: "https://github.com/youssefmanssouri",
      heroImage: "/images/projects/gymcrm-main.jpg",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Laravel", "PostgreSQL", "Chart.js"],
      features: [
        {
          titleEn: "Member & Subscription Management",
          titleFr: "Gestion des membres & abonnements",
          descriptionEn: "Member database with subscription status, payment history & renewal alerts",
          descriptionFr: "Base de données membres avec statut des cotisations, historique des paiements et alertes de renouvellement"
        },
        {
          titleEn: "Instant Desk Check-in",
          titleFr: "Pointage d'accès instantané",
          descriptionEn: "Rapid barcode/ID search for receptionist desk check-in logging",
          descriptionFr: "Recherche rapide par ID/code-barres pour l'enregistrement à l'accueil"
        },
        {
          titleEn: "Trainer Class Schedule",
          titleFr: "Planning des cours & coachs",
          descriptionEn: "Trainer class schedule calendar with booking capacity indicators",
          descriptionFr: "Planning interactif des cours collectifs avec jauge de capacité en temps réel"
        }
      ],
      challenges: [
        {
          textEn: "Designing high-density data tables that allow fast filtering and sorting without sacrificing mobile usability.",
          textFr: "Concevoir des tableaux de données denses facilitant le tri et la recherche sans altérer l'ergonomie mobile."
        },
        {
          textEn: "Building clear visual alerts for expired memberships to assist desk staff.",
          textFr: "Créer des alertes visuelles claires pour les abonnements expirés afin d'assister les agents d'accueil."
        }
      ]
    }
  ];

  for (const projectData of projectsData) {
    const { technologies, features, challenges, ...projectFields } = projectData;

    const existingProject = await prisma.project.findUnique({
      where: { slug: projectFields.slug },
    });

    if (!existingProject) {
      const createdProject = await prisma.project.create({
        data: {
          ...projectFields,
          technologies: {
            create: technologies.map((name) => ({ name })),
          },
          features: {
            create: features,
          },
          challenges: {
            create: challenges,
          },
        },
      });
      console.log(`Seeded project: ${createdProject.title}`);
    } else {
      console.log(`Project already exists: ${existingProject.title}`);
    }
  }

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
