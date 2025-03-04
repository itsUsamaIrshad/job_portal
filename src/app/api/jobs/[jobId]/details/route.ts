// // app/api/jobs/[id]/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {    const job = await prisma.job.findUnique({
//       where: { id: parseInt(params.id) }, // Convert ID to number
//     });

//     if (!job) {
//       return NextResponse.json({ error: 'Job not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, job });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const jobId = parseInt(params.id);
    if (isNaN(jobId)) {
      return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
    }

    // Fetch job details
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if user already applied
    const application = await prisma.application.findFirst({
      where: {
        jobId,
        userId: decoded.id,
      },
    });

    const hasApplied = !!application; // True if user has already applied

    return NextResponse.json({ success: true, job, hasApplied });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
  }
}