import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@components/layout/Footer";
import { UserCircle } from "lucide-react";


function ProfileGuest() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="bg-sky-100 min-h-screen mb-20">
      <div className="container mx-auto max-w-md md:max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="text-center py-8 md:py-12">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        </header>
        <main className="pb-32">
          <div className="flex flex-col items-center pt-4 pb-8">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-200">
              <UserCircle className="w-20 h-20 text-gray-400" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Welcome, Guest!
            </h2>
            <p className="text-base text-gray-500">
              Log in to manage your profile and tasks.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-3 shadow-md">
            <button
              onClick={handleLoginRedirect}
              className="w-full flex items-center justify-center p-4 rounded-lg bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition"
            >
              Login / Sign Up
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileGuest;
