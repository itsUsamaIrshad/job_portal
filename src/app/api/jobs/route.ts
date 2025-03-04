import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ✅ Fetch All Jobs (GET /api/jobs)
export async function GET() {
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}