import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // Verify the logged-in user is an admin
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can create jobs' }, { status: 403 });
    }

    // Parse request body
    const { title, description, category, location, salary } = await req.json();

    // Create new job
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        location,
        salary,
        postedById: decoded.id, // Associate the job with the logged-in admin
      },
    });

    return NextResponse.json({ message: 'Job created successfully', job });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}