import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-sky-100 min-h-screen flex justify-center items-center px-4">
      {/* Fixed Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-white transition"
        aria-label="Go back"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="w-full max-w-md lg:max-w-4xl">
        <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side (Desktop only) */}
          <div className="hidden lg:flex flex-col justify-center px-10 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <p className="text-lg text-white/90">
              Looks like you took a wrong turn.
            </p>
          </div>

          {/* Right Side Content */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <header className="text-center lg:text-left mb-6">
              <h2 className="text-3xl font-bold text-gray-800 lg:hidden">
                404
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                Page Not Found
              </h3>
              <p className="text-gray-500 mt-3">
                The page you’re looking for doesn’t exist or was moved.
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/"
                className="w-full sm:w-auto text-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition active:scale-95"
              >
                Go to Home
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Go Back
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NotFound;