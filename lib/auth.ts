import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * Retrieves the cryptographic signing key for admin JWT sessions.
 * Strictly FAILS CLOSED in production if AUTH_SECRET / JWT_SECRET is not configured or too weak.
 */
function getSecretKey(): Uint8Array | null {
  const secret = env.getAuthSecret();
  if (!secret) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = "ym_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

export async function createAdminSessionToken(payload: SessionPayload): Promise<string> {
  const key = getSecretKey();
  if (!key) {
    throw new Error("Admin session signing key is not configured or insecure.");
  }
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyAdminSessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const key = getSecretKey();
    if (!key) return null;
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  } catch {
    // Outside active Next.js request context (e.g. test environment)
  }
}

export async function getAdminSessionFromCookie(req?: Request): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (req) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    if (match) {
      token = match[1];
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    } catch {
      // Ignore if outside request context
    }
  }

  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export async function clearAdminSessionCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  } catch {
    // Outside active Next.js request context (e.g. test environment)
  }
}
