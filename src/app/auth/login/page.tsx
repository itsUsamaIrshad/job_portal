'use client'; // Mark this as a Client Component

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';

// Define the schema for form validation
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  

const onSubmit = async (data) => {
  try {
    const response = await axios.post("/api/auth/login", data, { withCredentials: true });

    if (response.status === 200) {
      const result = response.data;
      toast.success("Login successful!");

      localStorage.setItem("token", result.token);

      if (result.user.role === "ADMIN") {
        setTimeout(() => router.push("/admin/create"), 2000);
      } else {
        setTimeout(() => router.push("/jobs"), 2000);
      }
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    toast.error( "Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

        
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 disabled:bg-purple-600"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-purple-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}