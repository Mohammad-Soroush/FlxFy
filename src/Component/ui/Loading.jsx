// LoadingProfile.jsx
import React from "react";
import { User, Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  justify-center bg-sky-100">
      {/* Animated avatar placeholder */}
      <div className="relative w-28 h-28 rounded-full bg-gray-200 overflow-hidden animate-pulse shadow-lg">
        <User className="w-16 h-16 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Loading text */}
      <h2 className="mt-6 text-2xl font-bold text-gray-700 animate-pulse">
        Loading ...
      </h2>

      {/* Spinner */}
      <div className="mt-4">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>

      {/* Optional: subtle dots animation */}
      <div className="mt-2 flex space-x-1 text-cyan-500">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce animation-delay-200">.</span>
        <span className="animate-bounce animation-delay-400">.</span>
      </div>
    </div>
  );
};

export default Loading;
