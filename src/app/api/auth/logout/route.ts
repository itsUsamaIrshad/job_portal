import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ✅ Get Token API (GET)
export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, token: null });
  }

  return NextResponse.json({ authenticated: true, token });
}

// ✅ Logout API (POST)
export async function POST() {
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logout successful" });
}
