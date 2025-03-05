// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import prisma from '@/lib/prisma';

// // ✅ Verify Admin Middleware
// export async function verifyAdmin() {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) {
//     return { error: 'Unauthorized', status: 401 };
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
//     if (decoded.role !== 'ADMIN') {
//       return { error: 'Only admins can perform this action', status: 403 };
//     }
//     return { decoded };
//   } catch (error) {
//     return { error: 'Invalid token', status: 401 };
//   }
// }

// // ✅ Fetch All Applications (GET /api/admin/applications)
// export async function GET() {
//   // **Admin verification**
//   const { error, status, decoded } = await verifyAdmin();
//   if (error) {
//     return NextResponse.json({ error }, { status });
//   }

//   try {
//     // Fetch all applications with user and job details
//     const applications = await prisma.application.findMany({
//       include: {
//         user: true, // Include user details
//         job: true, // Include job details
//       },
//     });

//     return NextResponse.json({ success: true, applications });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ✅ Verify Admin 
export async function verifyAdmin() {
  const token = cookies().get("token")?.value; // Removed await from cookies()
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'ADMIN') {
      return { error: 'Only admins can perform this action', status: 403 };
    }
    return { decoded }; // Only return decoded if it's an admin
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

// ✅ Fetch All Applications (GET /api/admin/applications)
export async function GET() {
  const adminCheck = await verifyAdmin(); // Wait for admin verification

  if (adminCheck.error) {
    return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
  }

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
