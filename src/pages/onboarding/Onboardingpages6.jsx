import React, { useState } from "react";
import { Logo1 } from "../../assetsJS";
import { useNavigate } from "react-router-dom";

function Onboardingpage6() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate(); // to redirect to homepage

  const handleContinue = () => {
    if (!location) return; // prevent empty input

    // Save location in a cookie (valid for 7 days)
    document.cookie = `userCity=${location}; path=/; max-age=${60 * 60 * 24 * 7}`;

    // Go to homepage
    navigate("/home");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col px-4 sm:px-6">
      <main className="flex-1 flex flex-col items-center justify-start mt-20 sm:mt-32">
        <div className="w-full max-w-md flex flex-col items-center text-center">

          {/* Image */}
          <img
            src={Logo1}
            alt="Logo"
            className="w-40 sm:w-52 mb-6 sm:mb-8"
          />

          {/* Text Section */}
          <div className="w-full mb-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              What is your Location?
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              We need access to your location to suggest relevant nearby services
            </p>
          </div>

          {/* Input */}
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Type your city, street, or postal code"
            className="w-full sm:w-96 border-2 border-gray-500 rounded-lg px-3 py-2 mb-56 text-sm sm:text-base focus:outline-none focus:border-blue-600 transition"
          />

          {/* Button */}
          <button
            onClick={handleContinue}
            disabled={!location} // button disabled if no input
            className={`w-full sm:w-96 rounded-lg py-2 sm:py-3 text-sm sm:text-base transition
              ${location ? "border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-500 active:bg-blue-950 active:border-blue-950"
                        : "border-2 border-gray-400 bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}

export default Onboardingpage6;
