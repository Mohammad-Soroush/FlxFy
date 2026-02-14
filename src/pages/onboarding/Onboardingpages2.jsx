import React, { useState } from 'react';
import { searchpeople } from '@assetsJS/index.js';
import Onboardingpage3 from '@pages/onboarding/Onboardingpages3'
import Onboardingpage5 from '@pages/onboarding/Onboardingpages5';
function Onboardingpages2() {
  const [step, setStep] = useState(2); // current page is 2

  if (step === 3) {
    return <Onboardingpage3 />
  }

  if (step === 5) {
    return <Onboardingpage5 />
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Header */}
      <header className="mb-8 sm:mb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex justify-end items-center mt-4">
            <p
              onClick={() => setStep(5)}
              className="text-gray-700 text-sm sm:text-base mr-1 cursor-pointer hover:underline"
            >
              Skip
            </p>

            {/* Inline SVG Arrow */}
            <svg
              onClick={() => setStep(5)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 sm:w-5 sm:h-5 fill-black cursor-pointer"
              aria-hidden="true"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">

          {/* Image */}
          <img
            src={searchpeople}
            alt="people search"
            className="w-64 sm:w-72 md:w-80 lg:w-96 max-h-64 object-contain mb-8"
          />


          {/* Progress Bars */}
          <div className="flex gap-2 mb-6 sm:mb-8">
            <div className="bg-green-500 h-1 w-10 sm:w-16 rounded"></div>
            <div className="bg-gray-400 h-1 w-10 sm:w-16 rounded"></div>
            <div className="bg-gray-400 h-1 w-10 sm:w-16 rounded"></div>
          </div>

          {/* Text Section */}
          <div className="max-w-xs sm:max-w-sm md:max-w-md mb-8">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4 leading-tight">
              Find Trusted Experts
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Finding the most experienced and trusted people to help you.
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={() => setStep(3)}
            className="border-2 border-blue-600 bg-blue-600 text-white rounded-md
                       px-16 sm:px-24 md:px-32 py-3 text-sm sm:text-base md:text-lg
                       font-medium hover:bg-blue-500 hover:border-blue-500
                       active:bg-blue-950 active:border-blue-950 transition"
          >
            Next
          </button>

        </div>
      </main>
    </div>
  );
}

export default Onboardingpages2;
