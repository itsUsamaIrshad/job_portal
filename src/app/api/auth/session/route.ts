import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ isLoggedIn: false }, { status: 200 });
    }

    // Verify the JWT token
    const { userId, role } = verifyToken(token);

    return NextResponse.json(
      {
        isLoggedIn: true,
        userId,
        role,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }
}