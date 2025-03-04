import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "پہلے لاگ ان کریں" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/api/apply/:path*"],
};
