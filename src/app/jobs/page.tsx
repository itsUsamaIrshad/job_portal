"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const JobsList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <>
        
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600 text-xl">No jobs available at the moment. Check back later!</p>
        </div>
      </>
    );
  }

  return (
    <>
    
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {job.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Category:</span> {job.category}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Salary:</span> ${job.salary?.toLocaleString()}
              </p>

              <div className="mt-4 flex gap-3">
              <button
  onClick={() => router.push(`/jobs/${job.id}/details`)} 
  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
>
  View Details
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobsList;