/**
 * Centralized, type-safe environment variable configuration and validation.
 * Ensures secrets are never exposed and required variables are checked safely.
 */

function sanitizeEnvValue(val: string | undefined): string | undefined {
  if (!val) return undefined;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed.includes("[SENSITIVE]")) {
    return undefined;
  }
  return trimmed;
}

export const env = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",

  // Database
  databaseUrl: process.env.DATABASE_URL || "file:./dev.db",

  // JWT / Auth Secrets
  getAuthSecret(): string | null {
    const secret =
      sanitizeEnvValue(process.env.AUTH_SECRET) ||
      sanitizeEnvValue(process.env.JWT_SECRET);

    if (secret) {
      if (secret.length < 32 && process.env.NODE_ENV === "production") {
        console.error(
          "[Security:Env] CRITICAL: AUTH_SECRET / JWT_SECRET is less than 32 characters in production."
        );
        return null;
      }
      return secret;
    }

    if (process.env.NODE_ENV === "production") {
      console.error(
        "[Security:Env] CRITICAL: AUTH_SECRET or JWT_SECRET is missing in production. Failing closed."
      );
      return null;
    }

    // Isolated local development fallback ONLY
    return "ym-portfolio-dev-secret-key-32chars-long-local-only-do-not-use-in-prod";
  },

  // Admin Credentials
  getAdminEmail(): string {
    return (
      sanitizeEnvValue(process.env.ADMIN_EMAIL)?.toLowerCase() ||
      "manssouriyoussef33@gmail.com"
    );
  },

  getAdminPassword(): string | null {
    const pass = sanitizeEnvValue(process.env.ADMIN_PASSWORD);
    if (pass) return pass;

    if (process.env.NODE_ENV === "production") {
      // In production, never fall back to default password
      return null;
    }

    // Development only
    return "portfolio-admin";
  },

  // Notification / Email Settings
  resendApiKey: sanitizeEnvValue(process.env.RESEND_API_KEY) || null,
  contactEmail: sanitizeEnvValue(process.env.CONTACT_EMAIL) || "manssouriyoussef33@gmail.com",
  emailFrom: sanitizeEnvValue(process.env.EMAIL_FROM) || "Portfolio Contact <onboarding@resend.dev>",

  // SMTP Settings
  smtpHost: sanitizeEnvValue(process.env.SMTP_HOST) || null,
  smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
  smtpSecure: (process.env.SMTP_SECURE || "true") === "true",
  smtpUser: sanitizeEnvValue(process.env.SMTP_USER) || null,
  smtpPass: sanitizeEnvValue(process.env.SMTP_PASS) || null,

  // Webhooks
  contactWebhookUrl: sanitizeEnvValue(process.env.CONTACT_WEBHOOK_URL) || null,
  contactStorageWebhook: sanitizeEnvValue(process.env.CONTACT_STORAGE_WEBHOOK) || null,

  // Upstash Redis
  upstashRedisRestUrl: sanitizeEnvValue(process.env.UPSTASH_REDIS_REST_URL) || null,
  upstashRedisRestToken: sanitizeEnvValue(process.env.UPSTASH_REDIS_REST_TOKEN) || null,

  // Vercel / Site URL
  siteUrl: sanitizeEnvValue(process.env.NEXT_PUBLIC_SITE_URL) || null,
  vercelUrl: sanitizeEnvValue(process.env.VERCEL_URL) || null,
};
