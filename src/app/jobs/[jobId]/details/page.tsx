

'use client'; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import UserNavbar from '../../../components/Navbar/navbar';

interface Job {
  id: number;
  title: string;
  description?: string;
  category: string;
  location: string;
  salary?: number;
}

const JobDetailsPage = () => {
  const [job, setJob] = useState<Job | null>(null); 
  const [loading, setLoading] = useState(false); 
  const { jobId } = useParams(); 
  const router = useRouter(); 

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.job); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Error fetching job details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!job) {
    return <p className="text-center text-white">Job not found.</p>;
  }

  return (
    <>
      <UserNavbar />
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">{job.title}</h1>
          <p className="text-gray-700">
            <span className="font-semibold"> Location:</span> {job.location}
          </p>
          {job.salary && (
            <p className="text-gray-700 mt-2">
              <span className="font-semibold"> Salary:</span> ${job.salary}
            </p>
          )}
          {job.description && (
            <p className="text-gray-700 mt-2">
              <span className="font-semibold"> Description:</span> {job.description}
            </p>
          )}

          
          <button
            onClick={() => router.push(`/jobs/${job.id}/apply`)} 
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mt-4"
          >
            Apply Now
          </button>

     
          <button
            onClick={() => router.push('/jobs')}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mt-4"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;