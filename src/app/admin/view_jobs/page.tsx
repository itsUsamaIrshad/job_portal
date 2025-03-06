// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import AdminNavbar from '../adminNavbar/page';


// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   location: string;
//   description?: string;
//   salary?: number;
// }

// const JobList = () => {
//   const [jobs, setJobs] = useState<Job[]>([]); // ✅ Job List State
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null); // ✅ Selected Job State
//   const [modalOpen, setModalOpen] = useState(false); // ✅ Modal State
//   const [loading, setLoading] = useState(false); // ✅ Loading State

  
//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/admin/jobs');
//       if (response.data.success) {
//         setJobs(response.data.jobs);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//       toast.error('Error fetching jobs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

  
//   const removeJob = async (id: number) => {
//     try {
//       const response = await axios.post('/api/admin/jobs', { id });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setJobs(jobs.filter((job) => job.id !== id)); 
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting job:', error);
//       toast.error('Error deleting job');
//     }
//   };

  
//   const openEditModal = (job: Job) => {
//     setSelectedJob(job);
//     setModalOpen(true);
//   };


//   const updateJob = async () => {
//     if (!selectedJob) return;
  
//     try {
//       const response = await axios.put('/api/admin/jobs', selectedJob);
  
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setJobs(jobs.map((job) => (job.id === selectedJob.id ? selectedJob : job)));
//         setModalOpen(false);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating job:', error);
//       toast.error('Error updating job');
//     }
//   };
//   return (
//     <>
//       <AdminNavbar />
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 min-h-screen p-6">
//         <p className="mb-6 text-2xl font-bold text-center text-white">
//            Job Listings
//         </p>

    
//         {loading ? (
//           <p className="text-center text-white">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map((job) => (
//               <div
//                 key={job.id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//               >
//                 <h3 className="text-xl font-bold text-purple-600">{job.title}</h3>
//                 <p className="text-gray-700 mt-2">
//                   <span className="font-semibold"> Location:</span> {job.location}, {job.category}
//                 </p>
//                 {job.salary && (
//                   <p className="text-gray-700 mt-2">
//                     <span className="font-semibold"> Salary:</span> ${job.salary}
//                   </p>
//                 )}
//                 {job.description && (
//                   <p className="text-gray-700 mt-2">
//                     <span className="font-semibold">Description:</span> {job.description}
//                   </p>
//                 )}

//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => openEditModal(job)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                   >
//                      Edit
//                   </button>
//                   <button
//                     onClick={() => removeJob(job.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                   >
//                      Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {modalOpen && selectedJob && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Edit Job</h3>
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full p-2 border rounded mb-3"
//               value={selectedJob.title}
//               onChange={(e) =>
//                 setSelectedJob({ ...selectedJob, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               className="w-full p-2 border rounded mb-3"
//               value={selectedJob.category}
//               onChange={(e) =>
//                 setSelectedJob({ ...selectedJob, category: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Location"
//               className="w-full p-2 border rounded mb-3"
//               value={selectedJob.location}
//               onChange={(e) =>
//                 setSelectedJob({ ...selectedJob, location: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Salary"
//               className="w-full p-2 border rounded mb-3"
//               value={selectedJob.salary || ''}
//               onChange={(e) =>
//                 setSelectedJob({ ...selectedJob, salary: Number(e.target.value) })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               className="w-full p-2 border rounded mb-3"
//               value={selectedJob.description || ''}
//               onChange={(e) =>
//                 setSelectedJob({ ...selectedJob, description: e.target.value })
//               }
//             />
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition"
//               >
//                  Cancel
//               </button>
//               <button
//                 onClick={updateJob}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//               >
//                  Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default JobList;