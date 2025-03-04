import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("✅ User Verified:", decoded);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/protected/:path*"], // 🔹 Secure all /api/protected routes
};
