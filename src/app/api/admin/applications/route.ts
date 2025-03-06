import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';


// ✅ Fetch All Applications (GET /api/admin/applications)
export async function GET() {
  // **Admin verification**
  
  

  try {
    // Fetch all applications with user and job details
    const applications = await prisma.application.findMany({
      include: {
        user: true, // Include user details
        job: true, // Include job details
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}


