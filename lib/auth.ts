import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

function getSecretKey(): Uint8Array {
  const envSecret =
    process.env.AUTH_SECRET &&
    process.env.AUTH_SECRET.trim() !== "" &&
    !process.env.AUTH_SECRET.includes("[SENSITIVE]")
      ? process.env.AUTH_SECRET.trim()
      : null;
  const jwtSecret =
    process.env.JWT_SECRET &&
    process.env.JWT_SECRET.trim() !== "" &&
    !process.env.JWT_SECRET.includes("[SENSITIVE]")
      ? process.env.JWT_SECRET.trim()
      : null;

  const secret = envSecret || jwtSecret || "super-secret-jwt-key-manssouri";
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = "ym_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

export async function createAdminSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
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
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
