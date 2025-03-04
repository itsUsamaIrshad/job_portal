import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';


async function getApplications() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/admin/applications`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch applications');
  }

  return res.json();
}

const verifyAdmin = () => {
  const token = cookies().get('token')?.value;
  if (!token) {
    redirect('/login'); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'ADMIN') {
      redirect('/'); 
    }
    return decoded;
  } catch (error) {
    redirect('/login'); 
  }
};

export default async function AdminApplicationsPage() {
  verifyAdmin(); 

  const { applications } = await getApplications();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Job Title</th>
            <th className="py-2 px-4 border">Applicant Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Cover Letter</th>
            <th className="py-2 px-4 border">Resume</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="py-2 px-4 border">{application.job.title}</td>
              <td className="py-2 px-4 border">{application.user.name}</td>
              <td className="py-2 px-4 border">{application.user.email}</td>
              <td className="py-2 px-4 border">{application.cover_letter}</td>
              <td className="py-2 px-4 border">
                <a href={application.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
              <td className="py-2 px-4 border">{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}