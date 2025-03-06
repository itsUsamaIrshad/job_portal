import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest, // ✅ Use NextRequest instead of Request
  { params }: { params: { jobId: string } } // ✅ Extract params from the second argument
) {
  const jobId = parseInt(params.jobId, 10); // ✅ Convert to integer

  if (isNaN(jobId)) {
    return NextResponse.json(
      { success: false, error: "Job ID must be a valid number" },
      { status: 400 }
    );
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId }, // Ensure `id` matches Prisma schema
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