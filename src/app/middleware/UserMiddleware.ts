import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Middleware only for protected routes
export const config = {
    matcher: ["/dashboard/:path*"], // Protects /dashboard routes
};
