"use client";
import React, { useEffect, useState } from "react";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/admin/applications", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();
        setApplications(data.applications);
        console.log(data.applications)
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;

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
          {applications.map((app , i) => (
            <tr key={i}>
              <td className="py-2 px-4 border">{app.job.title}</td>
              <td className="py-2 px-4 border">{app.user.name}</td>
              <td className="py-2 px-4 border">{app.user.email}</td>
              <td className="py-2 px-4 border">{app.cover_letter}</td>
              <td className="py-2 px-4 border">
                <a href={app.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
              <td className="py-2 px-4 border">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
