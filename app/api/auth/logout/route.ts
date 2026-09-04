import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";
import { validateOrigin } from "@/lib/security";

export async function GET(request: Request) {
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

  const acceptHeader = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";

  // If invoked via browser HTML form submission, redirect to login page
  if (
    acceptHeader.includes("text/html") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl, 303);
  }

  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
