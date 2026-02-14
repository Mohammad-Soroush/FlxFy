import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react"; 
import { useAuth } from "../../userContext/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { signup, error } = useAuth(); // We'll handle loading locally

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("customer"); 
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    setFormError("");
    setIsLoading(true);

    try {
      await signup(name, email, password, userRole);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">Create Your Account 🚀</h1>
            <p className="text-lg text-white/90">
              Join us and start managing your tasks smarter and faster.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="p-6 sm:p-8 lg:p-10">
            <header className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-800 lg:hidden">Create Account</h2>
              <p className="text-gray-500 mt-2">Join us to manage your tasks efficiently!</p>
            </header>

            <form onSubmit={handleSignUp}>
              {(error || formError) && (
                <div className="mb-4 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700 text-sm">
                  {error || formError}
                </div>
              )}

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                      tabIndex="-1"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Account Type Toggle */}
                <div className="flex items-center justify-between mt-4">
                  <label className="text-sm font-medium text-gray-700">Account Type</label>
                  <div className="flex">
                    <label
                      className={`cursor-pointer px-4 py-2 rounded-full ${
                        userRole === "customer" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => setUserRole("customer")}
                    >
                      Customer
                    </label>
                    <label
                      className={`cursor-pointer px-4 py-2 rounded-full ml-2 ${
                        userRole === "technician" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => setUserRole("technician")}
                    >
                      Technician
                    </label>
                  </div>
                </div>
              </div>

              {/* Signup Button with Loading */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 rounded-lg bg-blue-600 py-3 font-bold text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
  