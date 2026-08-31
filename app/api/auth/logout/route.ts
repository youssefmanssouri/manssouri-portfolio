import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";
import { validateOrigin } from "@/lib/security";

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to logout." },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  await clearAdminSessionCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
