import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Legacy schema initialization stub.
 * In PostgreSQL production architecture, schemas are managed strictly via Prisma Migrations.
 * This no-op function ensures zero runtime DDL overhead or race conditions in serverless environments.
 */
export async function ensureDbSchema(): Promise<void> {
  // No-op: PostgreSQL schema is managed via `prisma migrate deploy`
  return;
}
