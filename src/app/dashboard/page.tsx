'use client'; // Mark this as a Client Component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserNavbar from '@/app/components/Navbar/navbar';


interface Job {
  id: number;
  title: string;
  description?: string;
  category: string;
  location: string;
  salary?: number;
}

const UserDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [loading, setLoading] = useState(false); 
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/jobs');
      if (response.data.success) {
        setJobs(response.data.jobs); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen p-6">
        <p className="mb-6 text-2xl font-bold text-center text-white">
          📌 Available Job Listings
        </p>

        
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-purple-600">{job.title}</h3>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold"> Location:</span> {job.location}
                </p>
                {job.salary && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold"> Salary:</span> ${job.salary}
                  </p>
                )}
                {job.description && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">📝 Description:</span> {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;