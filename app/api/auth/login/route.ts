import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { createAdminSessionToken, setAdminSessionCookie } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function timingSafeEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Do constant-time dummy comparison to mitigate timing attacks
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for authentication." },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  try {
    // 1. Rate limiting: 5 attempts per 15 minutes per IP
    const { limited, retryAfterSeconds } = checkRateLimit(request, "auth_login", 5, 15 * 60 * 1000);
    if (limited) {
      console.warn(`[Security:Auth] Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 15 minutes before trying again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    let rawBody: any;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { email, password } = rawBody;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 400 }
      );
    }

    const inputEmail = email.toLowerCase().trim();
    const inputPassword = password;

    const envAdminEmail = (process.env.ADMIN_EMAIL || "manssouriyoussef33@gmail.com").toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : null;

    let isValid = false;
    let userId = "admin_default";
    let userName = "Youssef Manssouri";
    let userRole = "ADMIN";

    // 1. Try DB lookup if available
    try {
      await ensureDbSchema();
      const admin = await prisma.adminUser.findUnique({
        where: { email: inputEmail },
      });

      if (admin) {
        const isBcryptMatch = await bcrypt.compare(inputPassword, admin.passwordHash).catch(() => false);
        if (isBcryptMatch) {
          isValid = true;
          userId = admin.id;
          userName = admin.name;
          userRole = admin.role;

          await prisma.adminUser.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
          }).catch(() => {});
        }
      }
    } catch (dbErr: any) {
      console.warn("[Security:Auth] Database user query notice:", dbErr?.message || dbErr);
    }

    // 2. Fallback to Environment Variables (strictly using configured ADMIN_PASSWORD)
    if (!isValid && envAdminPassword) {
      const isEmailMatch = inputEmail === envAdminEmail;
      const isPasswordMatch = timingSafeEqual(inputPassword, envAdminPassword);

      if (isEmailMatch && isPasswordMatch) {
        isValid = true;

        // Auto-seed admin user in database with bcrypt hash for future logins
        try {
          const hashedPassword = await bcrypt.hash(envAdminPassword, 10);
          await prisma.adminUser.upsert({
            where: { email: envAdminEmail },
            update: { lastLoginAt: new Date() },
            create: {
              email: envAdminEmail,
              passwordHash: hashedPassword,
              name: "Youssef Manssouri",
              role: "ADMIN",
            },
          });
        } catch {
          // DB write non-blocking for env-fallback auth
        }
      }
    }

    // 3. Reject if not valid (Generic error to prevent username enumeration)
    if (!isValid) {
      console.warn(`[Security:Auth] Failed login attempt for user '${inputEmail}' from IP ${clientIp}`);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 4. Issue authenticated session token
    const token = await createAdminSessionToken({
      userId,
      email: inputEmail,
      role: userRole,
    });

    await setAdminSessionCookie(token);

    console.log(`[Security:Auth] Successful admin login for '${inputEmail}' from IP ${clientIp}`);

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: inputEmail,
        name: userName,
        role: userRole,
      },
    });
  } catch (err: any) {
    console.error("[Security:Auth] Login error:", err?.message || err);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
