import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../assetsJS";
import Cookies from "js-cookie"; // npm install js-cookie
import Onboardingpage6 from "./Onboardingpages6";

function Onboardingpage5() {
  const [step, setStep] = useState(5);
  const navigate = useNavigate();

  // Function to get location
  const handleAllowLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use a reverse geocoding API to get city name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village;

          // Save city in cookie
          Cookies.set("userCity", city, { expires: 7 }); // expires in 7 days

          // Go to homepage
          navigate("/home");
        } catch (error) {
          alert("Could not get your location city. Please enter manually.");
          console.error(error);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location access denied. Please enter manually.");
        } else {
          alert("Could not get your location. Please enter manually.");
        }
      }
    );
  };

  if (step === 6) return <Onboardingpage6 />;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 sm:px-6">
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md p-6">

        {/* Image */}
        <img
          src={Container}
          alt="Fixfly Logo"
          className="w-64 sm:w-72 md:w-80 lg:w-96 max-h-64 object-contain mb-8 mx-auto"
        />

        {/* Text */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">
            What is your Location?
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            We need access to your location to suggest relevant nearby services
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <button
            onClick={handleAllowLocation}
            className="border-2 border-blue-500 text-blue-500 rounded-xl
                       py-3 sm:py-4 text-sm sm:text-base
                       hover:bg-blue-500 hover:text-white
                       active:bg-blue-800 transition w-full"
          >
            Allow Location Access
          </button>

          <button
            onClick={() => setStep(6)}
            className="text-blue-500 rounded-md
                       py-3 sm:py-4 text-sm sm:text-base
                       hover:text-blue-300 active:text-blue-200 transition w-full"
          >
            Enter Location Manually
          </button>
        </div>

      </main>
    </div>
  );
}

export default Onboardingpage5;
