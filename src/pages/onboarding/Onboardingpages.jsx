import React, { useState } from 'react';
import { Logo1 } from '../../assetsJS';
import { useNavigate } from 'react-router-dom'; // <--- import this
import Onboardingpages2 from './Onboardingpages2';

function Onboardingpages() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // <--- create navigate function

  const handleTaskerClick = () => {
    // Navigate directly to home
    navigate('/home');
  };

  const handleLookingClick = () => {
    setStep(2);
  };

  return (
    <>
      {step === 1 && (
        <div className="bg-white flex items-center justify-center min-h-screen">
          <main className="w-96 max-w-md p-6 mt-12">
            <div className="text-center mb-56">
              <img
                src={Logo1}
                alt="Fixfly Logo"
                className="w-64 sm:w-72 md:w-80 lg:w-96 max-h-64 object-contain mx-auto mb-4"
              />
              <p className="text-gray-500 text-base sm:text-lg mb-8">Your Home, Fixed Fast</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="border-2 border-blue-500 text-blue-500 rounded-md py-3 hover:bg-blue-500 hover:text-white active:bg-blue-800 transition"
                onClick={handleLookingClick}
              >
                Looking for Tasker
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 rounded-md py-3 hover:bg-blue-500 hover:text-white active:bg-blue-800 transition"
                onClick={handleTaskerClick} // <--- navigate to /home
              >
                I am a Tasker
              </button>
            </div>
          </main>
        </div>
      )}

      {step === 2 && <Onboardingpages2 />}
    </>
  );
}

export default Onboardingpages;
