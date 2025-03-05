import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/banner.png"
        alt="image"
        className="object-cover w-full h-full"
        width={1550}
        height={550}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950 opacity-50"></div>

      {/* Content */}
      <div className="absolute flex flex-col items-center text-center px-4 w-full">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-[90%] sm:max-w-[70%]">
          The #1 Job Board for <br />
          Hiring or Finding Your Next Job Usama
        </h2>

        {/* Search Bar */}
        <form action="" className="w-full flex justify-center mt-6">
          <Input
            type="search"
            placeholder="Search"
            className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] text-gray-700 bg-white p-4 sm:p-5 border-0 outline-0 rounded-md shadow-md"
          />
        </form>
      </div>
    </div>
    
  );
};

export default Hero;
