import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../userContext/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth(); // We'll manage loading locally

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("customer");
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [loginPopup, setloginPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(" ");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopupMessage("Please enter both email and password.");
      setloginPopup(true);
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password, userRole);
    } catch (err) {
      setPopupMessage(err.message);
      setloginPopup(true);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(loginPopup)
  
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
          {/* Left Side (Desktop) */}
          <div className="hidden lg:flex flex-col justify-center px-10 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
            <p className="text-lg text-white/90">
              Log in to manage your tasks and continue your journey.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="p-6 sm:p-8 lg:p-10">
            <header className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-800 lg:hidden">
                Welcome Back!
              </h2>
              <p className="text-gray-500 mt-2">
                Log in to continue your journey.
              </p>
            </header>

            <form onSubmit={handleLogin}>
              {(error || formError) && (
                <div className="mb-4 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700 text-sm">
                  {error || formError}
                </div>
              )}

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                      required
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

                {/* Role Toggle */}
                <div className="flex items-center justify-between mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="flex">
                    <label
                      className={`cursor-pointer px-4 py-2 rounded-full ${userRole === "customer"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-700"
                        }`}
                      onClick={() => setUserRole("customer")}
                    >
                      Customer
                    </label>
                    <label
                      className={`cursor-pointer px-4 py-2 rounded-full ml-2 ${userRole === "technician"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-700"
                        }`}
                      onClick={() => setUserRole("technician")}
                    >
                      Technician
                    </label>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 rounded-lg bg-blue-600 py-3 font-bold text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {loginPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-sm rounded-3xl shadow-2xl p-7 text-center animate-fadeIn">

            <div className="text-red-500 mb-3 flex justify-center">
              ⚠️
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Login Failed
            </h2>

            <p className="text-gray-600 mb-6">
              {popupMessage}
            </p>

            <button
              onClick={() => setloginPopup(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition active:scale-95"
            >
              Try Again
            </button>

          </div>
        </div>
      )}
    </div>
    
  );
}

export default Login;
