import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

let prismaInstance: PrismaClient | null = null;

try {
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  const adapter = new PrismaBetterSqlite3({ url: "dev.db" });
  
  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

  if (process.env.NODE_ENV !== "production" && prismaInstance) {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (e) {
  console.warn("Prisma SQLite adapter failed to initialize in current runtime:", e);
}

export const prisma = prismaInstance;
