'use client'; 

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const ApplyFormPage = () => {
  const { jobId } = useParams(); 
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: '',
    cover_letter: '',
    resume: null as File | null, 
  });
  const [loading, setLoading] = useState(false); 

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('cover_letter', formData.cover_letter);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume); 
      }
  
      
      console.log('Job ID:', jobId);
  
      const response = await axios.post(`/api/jobs/${jobId}/apply`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      if (response.data.success) {
        toast.success('Application submitted successfully!');
        router.push('/jobs');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error submitting application');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">Apply for Job</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={5}
                required
              />
            </div>

          
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                Upload Resume (PDF only)
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                accept=".pdf"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyFormPage;
