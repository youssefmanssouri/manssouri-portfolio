import { defineConfig } from "@prisma/config";
import path from "path";

const getDbUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.VERCEL) return "file:/tmp/dev.db";
  const dbPath = path.resolve("dev.db").replace(/\\/g, "/");
  return `file:${dbPath}`;
};

export default defineConfig({
  datasource: {
    url: getDbUrl(),
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
