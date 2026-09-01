import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  schemaEnsured?: boolean;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

export async function ensureDbSchema() {
  if (globalForPrisma.schemaEnsured) return;

  try {
    const dbUrl = process.env.DATABASE_URL || "";
    const isPostgres = dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://");
    const dateTimeType = isPostgres ? "TIMESTAMP WITH TIME ZONE" : "DATETIME";

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AdminUser" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'ADMIN',
        "createdAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastLoginAt" ${dateTimeType}
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "company" TEXT,
        "projectType" TEXT NOT NULL,
        "budgetRange" TEXT,
        "message" TEXT NOT NULL,
        "language" TEXT NOT NULL DEFAULT 'en',
        "status" TEXT NOT NULL DEFAULT 'NEW',
        "createdAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "event" TEXT NOT NULL,
        "path" TEXT,
        "meta" TEXT,
        "ipHash" TEXT,
        "createdAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Project" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'PERSONAL PROJECT',
        "taglineEn" TEXT NOT NULL,
        "taglineFr" TEXT NOT NULL,
        "descriptionEn" TEXT NOT NULL,
        "descriptionFr" TEXT NOT NULL,
        "overviewEn" TEXT NOT NULL,
        "overviewFr" TEXT NOT NULL,
        "objectiveEn" TEXT NOT NULL,
        "objectiveFr" TEXT NOT NULL,
        "outcomeEn" TEXT NOT NULL,
        "outcomeFr" TEXT NOT NULL,
        "featured" BOOLEAN NOT NULL DEFAULT 1,
        "published" BOOLEAN NOT NULL DEFAULT 1,
        "editorialVariant" TEXT NOT NULL DEFAULT 'featured-large',
        "githubUrl" TEXT NOT NULL,
        "liveUrl" TEXT,
        "heroImage" TEXT NOT NULL,
        "createdAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" ${dateTimeType} NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    globalForPrisma.schemaEnsured = true;
  } catch (err) {
    console.warn("[Prisma Schema Init Notice]", err);
  }
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
