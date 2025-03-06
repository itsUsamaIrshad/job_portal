import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';




export async function GET() {


  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}


export async function POST(req: Request) {
 
 
  try {
    const { title, description, category, location, salary } = await req.json();

    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        location,
        salary,
        postedById: decoded?.id, 
      },
    });

    return NextResponse.json({ success: true, message: 'Job created successfully', job });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}


export async function PUT(req: Request) {


  try {
    const body = await req.json();
    const updatedJob = await prisma.job.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json({ success: true, message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  
  try {
    const { id } = await req.json();
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}

