import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ✅ Verify Admin Middleware
export async function verifyAdmin() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'ADMIN') {
      return { error: 'Only admins can perform this action', status: 403 };
    }
    return { decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

// ✅ Fetch All Applications (GET /api/admin/applications)
export async function GET() {
  // **Admin verification**
  const { error, status, decoded } = await verifyAdmin();
  if (error) {
    return NextResponse.json({ error }, { status });
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


// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import prisma from '@/lib/prisma';

// // ✅ Internal Helper Function: Verify Admin
// async function verifyAdmin() {
//   const token = (await cookies()).get('token')?.value; // Access the token from cookies
//   if (!token) {
//     return { error: 'Unauthorized', status: 401 }; // No token found
//   }

//   try {
//     // Verify the token and check if the user is an admin
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
//     if (decoded.role !== 'ADMIN') {
//       return { error: 'Only admins can perform this action', status: 403 }; // Not an admin
//     }
//     return { decoded }; // Return decoded token if the user is an admin
//   } catch (error) {
//     return { error: 'Invalid token', status: 401 }; // Token verification failed
//   }
// }

// // ✅ Fetch All Applications (GET /api/admin/applications)
// export async function GET() {
//   // Verify if the user is an admin
//   const adminCheck = await verifyAdmin();

//   // If there's an error in admin verification, return the error response
//   if (adminCheck.error) {
//     return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
//   }

//   try {
//     // Fetch all applications with user and job details
//     const applications = await prisma.application.findMany({
//       include: {
//         user: true, // Include user details
//         job: true, // Include job details
//       },
//     });

//     // Return the applications as a JSON response
//     return NextResponse.json({ success: true, applications });
//   } catch (error) {
//     // Handle any errors that occur during fetching
//     return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
//   }
// }