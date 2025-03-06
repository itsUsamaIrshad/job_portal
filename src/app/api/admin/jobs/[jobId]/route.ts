import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // Extract jobId from the URL
  const jobId = request.nextUrl.pathname.split("/").pop();

  if (!jobId) {
    return NextResponse.json(
      { success: false, error: "Job ID is required" },
      { status: 400 }
    );
  }

  const parsedJobId = parseInt(jobId, 10);

  if (isNaN(parsedJobId)) {
    return NextResponse.json(
      { success: false, error: "Job ID must be a valid number" },
      { status: 400 }
    );
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: parsedJobId }, // Ensure `id` matches Prisma schema
    });

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job details" },
      { status: 500 }
    );
  }
}