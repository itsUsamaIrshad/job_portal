// lib/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const authMiddleware = (handler: any) => async (req: NextRequest) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as { userId: number; role: string };
    (req as any).user = decoded; // User data request object mein attach karein
    return handler(req);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
};