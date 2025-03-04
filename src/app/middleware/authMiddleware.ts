import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Get the JWT token from cookies
  const token = request.cookies.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Allow access to protected routes
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    '/admin/:path*', // Protect all admin routes
    '/jobs', // Protect user-specific routes (optional)
  ],
};