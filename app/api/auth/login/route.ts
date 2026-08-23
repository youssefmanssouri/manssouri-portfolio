import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSessionToken, setAdminSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const inputEmail = email.toLowerCase().trim();
    const envAdminEmail = (process.env.ADMIN_EMAIL || "manssouriyoussef33@gmail.com").toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD || "admin_ym_portfolio_2026";

    let isValid = false;
    let userId = "admin_default";
    let userName = "Youssef Manssouri";
    let userRole = "ADMIN";

    // 1. Try DB lookup if available
    try {
      if (prisma) {
        const admin = await prisma.adminUser.findUnique({
          where: { email: inputEmail },
        });

        if (admin) {
          const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
          if (isPasswordValid) {
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
      }
    } catch (dbErr) {
      console.warn("DB lookup failed during admin login, falling back to ENV auth:", dbErr);
    }

    // 2. Fallback to Environment Variables authentication
    if (!isValid) {
      if (inputEmail === envAdminEmail && password === envAdminPassword) {
        isValid = true;

        // Optionally seed DB user asynchronously if DB is accessible
        if (prisma) {
          try {
            const passwordHash = await bcrypt.hash(envAdminPassword, 10);
            const upserted = await prisma.adminUser.upsert({
              where: { email: envAdminEmail },
              update: { lastLoginAt: new Date() },
              create: {
                email: envAdminEmail,
                name: "Youssef Manssouri",
                passwordHash,
                role: "ADMIN",
              },
            });
            userId = upserted.id;
          } catch (e) {
            // Ignore seed error in fallback path
          }
        }
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Create session token and set HTTP-only cookie
    const token = await createAdminSessionToken({
      userId,
      email: inputEmail,
      role: userRole,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: inputEmail,
        name: userName,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
