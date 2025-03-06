// import { NextResponse } from 'next/server';
// import { uploadToCloudinary } from '@/lib/cloudinary';
// import prisma from '@/lib/prisma';

// export async function POST(req: Request, { params }: { params: { jobId: string } }) {
//   try {
//     // Debug: Log the jobId from params
//     console.log('Job ID from params:', params.jobId);

//     // Parse jobId from params
//     const jobId = parseInt(params.jobId);
//     if (isNaN(jobId)) {
//       return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
//     }

//     // Parse form data
//     const formData = await req.formData();
//     const name = formData.get('name') as string;
//     const cover_letter = formData.get('cover_letter') as string;
//     const resumeFile = formData.get('resume') as File;

//     // Validate input
//     if (!name || !cover_letter || !resumeFile) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     // Debug: Log the file
//     console.log('Received file:', resumeFile);

//     // Debug: Log the file size
//     console.log('File size:', resumeFile.size);

//     if (resumeFile.size === 0) {
//       return NextResponse.json({ error: 'Empty file uploaded' }, { status: 400 });
//     }

//     // Upload file to Cloudinary
//     const cloudinaryResult = await uploadToCloudinary(resumeFile);
//     const resumeUrl = (cloudinaryResult as any).secure_url; // Get the file URL

//     // Save the application to the database
//     const application = await prisma.application.create({
//       data: {
//         name,
//         cover_letter,
//         resume: resumeUrl, // Store the Cloudinary URL
//         jobId: jobId, // Associate with the job (use `jobId` as per your schema)
//         userId: 1, // Replace with the logged-in user's ID (use `userId` as per your schema)
//       },
//     });

//     return NextResponse.json({ success: true, message: 'Application submitted successfully', application });
//   } catch (error) {
//     console.error('Error submitting application:', error);
//     return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import prisma from '@/lib/prisma';

export async function POST(req: Request, context: { params: { jobId: string } }) {
  try {
    const { jobId } = context.params; // ✅ Correct way to access jobId

    console.log('Job ID from params:', jobId);

    // Convert jobId to integer
    const parsedJobId = parseInt(jobId);
    if (isNaN(parsedJobId)) {
      return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
    }

    // Parse form data
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const cover_letter = formData.get('cover_letter') as string;
    const resumeFile = formData.get('resume') as File;

    // Validate input
    if (!name || !cover_letter || !resumeFile) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    console.log('Received file:', resumeFile);
    console.log('File size:', resumeFile.size);

    if (resumeFile.size === 0) {
      return NextResponse.json({ error: 'Empty file uploaded' }, { status: 400 });
    }

    // Upload file to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(resumeFile);
    const resumeUrl = (cloudinaryResult as any).secure_url;

    // Save to database
    const application = await prisma.application.create({
      data: {
        name,
        cover_letter,
        resume: resumeUrl,
        jobId: parsedJobId, // ✅ Use parsed jobId
        userId: 1, // 🔹 Replace with the logged-in user's ID
      },
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
