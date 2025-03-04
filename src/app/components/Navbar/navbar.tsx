"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    setToken(storedToken || null);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        toast.success("Logout successful!");
        Cookies.remove("token");
        setToken(null);
        
      
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="text-2xl font-bold text-purple-600">Jobify</div>

     
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-purple-600">Home</Link>
          <Link href="/jobs" className="text-gray-700 hover:text-purple-600">Jobs</Link>
        </div>

        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link href="/auth/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Register
              </Link>
              <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
