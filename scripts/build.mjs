import { execSync } from "node:child_process";

/**
 * Execute a shell command synchronously with inherited stdio.
 * If the command exits with a non-zero exit code, exit this process immediately.
 */
function run(command, description) {
  console.log(`\n[Build] ===> ${description}...`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`\n[Build ERROR] Step failed: ${description}`);
    process.exit(1);
  }
}

const vercelEnv = process.env.VERCEL_ENV;

console.log("[Build] Starting portfolio build pipeline...");
console.log(`[Build] Environment: VERCEL_ENV=${vercelEnv || "(not set)"}`);

// 1. Database Migrations (Vercel Production Only)
if (vercelEnv === "production") {
  console.log("[Build] Vercel Production deployment detected. Applying pending Prisma migrations...");
  run("npx prisma migrate deploy", "Prisma database migrations deployment");
} else if (vercelEnv === "preview") {
  console.log("[Build] Vercel Preview deployment detected. Skipping database migrations.");
} else {
  console.log("[Build] Non-production or local environment. Skipping database migrations.");
}

// 2. Prisma Client Generation
run("npx prisma generate", "Prisma Client code generation");

// 3. Next.js Production Build
run("npx next build", "Next.js application build");

console.log("\n[Build] Portfolio build pipeline completed successfully.");
