import { prisma, ensureDbSchema } from "@/lib/prisma";
import crypto from "crypto";

export interface SaveContactMessageParams {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  language?: string;
}

export interface StoredContactMessage {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  projectType: string;
  budgetRange?: string | null;
  message: string;
  language: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
}

export interface StorageResult {
  persisted: boolean;
  message: StoredContactMessage;
  storageType: "prisma_database" | "fallback_storage";
  error?: string;
}

export async function persistContactMessage(
  params: SaveContactMessageParams
): Promise<StorageResult> {
  const fallbackId = `msg_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  const now = new Date();

  const formattedRecord: StoredContactMessage = {
    id: fallbackId,
    createdAt: now,
    name: params.name,
    email: params.email,
    company: params.company || null,
    phone: params.phone || null,
    projectType: params.projectType,
    budgetRange: params.budgetRange || null,
    message: params.message,
    language: params.language || "en",
    status: "NEW",
  };

  // 1. Primary persistence: Prisma Database
  try {
    await ensureDbSchema();
    const created = await prisma.contactMessage.create({
      data: {
        name: params.name,
        email: params.email,
        company: params.company || null,
        projectType: params.projectType,
        budgetRange: params.budgetRange || null,
        message: params.message,
        language: params.language || "en",
        status: "NEW",
      },
    });

    return {
      persisted: true,
      message: {
        id: created.id,
        createdAt: created.createdAt,
        name: created.name,
        email: created.email,
        company: created.company,
        phone: params.phone || null,
        projectType: created.projectType,
        budgetRange: created.budgetRange,
        message: created.message,
        language: created.language,
        status: created.status as "NEW",
      },
      storageType: "prisma_database",
    };
  } catch (dbErr: any) {
    console.error("[Storage Error] Primary Prisma DB write failed:", dbErr?.message || dbErr);
  }

  // 2. Secondary fallback: Cloud Webhook or JSON Storage if configured
  const backupEndpoint = process.env.CONTACT_STORAGE_WEBHOOK;
  if (backupEndpoint && backupEndpoint.startsWith("http")) {
    try {
      const res = await fetch(backupEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedRecord),
      });
      if (res.ok) {
        return {
          persisted: true,
          message: formattedRecord,
          storageType: "fallback_storage",
        };
      }
    } catch (fallbackErr) {
      console.error("[Storage Error] Backup storage failed:", fallbackErr);
    }
  }

  return {
    persisted: false,
    message: formattedRecord,
    storageType: "fallback_storage",
    error: "Database persistence failed.",
  };
}

export async function logNotificationAudit(
  messageId: string,
  delivered: boolean,
  provider?: string,
  error?: string
) {
  try {
    console.log(
      `[Notification Audit] Message ${messageId} | Delivered: ${delivered} | Provider: ${provider || "none"}${error ? ` | Error: ${error}` : ""}`
    );
  } catch {
    // Non-blocking logging
  }
}
