'use client'; // Mark this as a Client Component

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout", {}, { withCredentials: true });
  
      if (response.status === 200) {
        toast.success("Logout successful!");
        localStorage.removeItem("token"); 
        router.push("/auth/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error( "Something went wrong. Please try again.");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
      
        <Link href="/" className="text-xl font-bold">
          Job Portal
        </Link>

      
        <div className="flex items-center space-x-4">
          <Link href="/admin/view_jobs" className="hover:text-gray-200">
            Jobs
          </Link>
          <Link href="/admin/dashboard" className="hover:text-gray-200">
            Admin Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}