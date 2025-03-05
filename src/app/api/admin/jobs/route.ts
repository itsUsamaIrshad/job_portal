// // import { NextResponse } from 'next/server';
// // import { cookies } from 'next/headers';
// // import jwt from 'jsonwebtoken';
// // import prisma from '@/lib/prisma';

// // const verifyAdmin = async() => {
// //   const token = (await cookies()).get("token")?.value;
// //   if (!token) {
// //     return { error: 'Unauthorized', status: 401 };
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, id: number };
// //     if (decoded.role !== 'ADMIN') {
// //       return { error: 'Only admins can perform this action', status: 403 };
// //     }
// //     return { decoded };
// //   } catch (error) {
// //     return { error: 'Invalid token', status: 401 };
// //   }
// // };


// // export async function GET() {
// //   const { error, status } = verifyAdmin();
// //   if (error) {
// //     return NextResponse.json({ error }, { status });
// //   }

// //   try {
// //     const jobs = await prisma.job.findMany();
// //     return NextResponse.json({ success: true, jobs });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
// //   }
// // }


// // export async function POST(req: Request) {
// //   const { error, status, decoded } = verifyAdmin();
// //   if (error) {
// //     return NextResponse.json({ error }, { status });
// //   }

// //   try {
// //     const { title, description, category, location, salary } = await req.json();

// //     const job = await prisma.job.create({
// //       data: {
// //         title,
// //         description,
// //         category,
// //         location,
// //         salary,
// //         postedById: decoded?.id, 
// //       },
// //     });

// //     return NextResponse.json({ success: true, message: 'Job created successfully', job });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
// //   }
// // }


// // export async function PUT(req: Request) {
// //   const { error, status } = verifyAdmin();
// //   if (error) {
// //     return NextResponse.json({ error }, { status });
// //   }

// //   try {
// //     const body = await req.json();
// //     const updatedJob = await prisma.job.update({
// //       where: { id: body.id },
// //       data: body,
// //     });
// //     return NextResponse.json({ success: true, message: 'Job updated successfully', job: updatedJob });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
// //   }
// // }


// // export async function DELETE(req: Request) {
// //   const { error, status } = verifyAdmin();
// //   if (error) {
// //     return NextResponse.json({ error }, { status });
// //   }

// //   try {
// //     const { id } = await req.json();
// //     await prisma.job.delete({ where: { id } });
// //     return NextResponse.json({ success: true, message: 'Job deleted successfully' });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
// //   }
// // }



// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import prisma from '@/lib/prisma';

// const verifyAdmin = async () => {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) {
//     return { error: 'Unauthorized', status: 401 };
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, id: number };
//     if (decoded.role !== 'ADMIN') {
//       return { error: 'Only admins can perform this action', status: 403 };
//     }
//     return { decoded };
//   } catch (error) {
//     return { error: 'Invalid token', status: 401 };
//   }
// };

// // export async function GET(request: Request, { params }: { params: { jobId: string } }) {
// //   const { error, status } = await verifyAdmin();
// //   if (error) {
// //     return NextResponse.json({ error }, { status });
// //   }

// //   try {
// //     const job = await prisma.job.findUnique({
// //       where: { id: parseInt(params.jobId) },
// //     });

// //     if (!job) {
// //       return NextResponse.json({ error: 'Job not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, job });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
// // //   }
// // }

// export async function GET(request: Request, context: { params: { jobId: string } }) {
//   const jobId = context.params.jobId;

//   if (!jobId) {
//     return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
//   }

//   const { error, status } = await verifyAdmin();
//   if (error) {
//     return NextResponse.json({ error }, { status });
//   }

//   try {
//     const job = await prisma.job.findUnique({
//       where: { id: parseInt(jobId) },
//     });

//     if (!job) {
//       return NextResponse.json({ error: 'Job not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, job });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   const { error, status, decoded } = await verifyAdmin();
//   if (error) {
//     return NextResponse.json({ error }, { status });
//   }

//   try {
//     const { title, description, category, location, salary } = await req.json();

//     const job = await prisma.job.create({
//       data: {
//         title,
//         description,
//         category,
//         location,
//         salary,
//         postedById: decoded?.id, 
//       },
//     });

//     return NextResponse.json({ success: true, message: 'Job created successfully', job });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   const { error, status } = await verifyAdmin();
//   if (error) {
//     return NextResponse.json({ error }, { status });
//   }

//   try {
//     const body = await req.json();
//     const updatedJob = await prisma.job.update({
//       where: { id: body.id },
//       data: body,
//     });
//     return NextResponse.json({ success: true, message: 'Job updated successfully', job: updatedJob });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   const { error, status } = await verifyAdmin();
//   if (error) {
//     return NextResponse.json({ error }, { status });
//   }

//   try {
//     const { id } = await req.json();
//     await prisma.job.delete({ where: { id } });
//     return NextResponse.json({ success: true, message: 'Job deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const verifyAdmin = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, id: number };
    if (decoded.role !== 'ADMIN') {
      return { error: 'Only admins can perform this action', status: 403 };
    }
    return { decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
};

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  const { error, status } = await verifyAdmin();
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(params.jobId) },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { error, status, decoded } = await verifyAdmin();
  if (error) {
    return NextResponse.json({ error }, { status });
  }

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
  const { error, status } = await verifyAdmin();
  if (error) {
    return NextResponse.json({ error }, { status });
  }

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
  const { error, status } = await verifyAdmin();
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { id } = await req.json();
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}