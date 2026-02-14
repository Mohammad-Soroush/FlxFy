import React, { useState } from "react";
import { Illustration } from "../../assetsJS";
import Onboardingpage5 from "./Onboardingpages5";

function Onboardingpage4({ onNext, onSkip }) {
  const [step, setStep] = useState(4);
  if (step === 5) {
    return <Onboardingpage5 />
  }

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">

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
              className="w-4 h-4 sm:w-5 sm:h-5 fill-black cursor-pointer hover:fill-blue-600 transition"
              aria-hidden="true"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center text-center px-4 sm:px-8">

        {/* Illustration */}
        <img
          src={Illustration}
          alt="people search"
          className="w-64 sm:w-72 md:w-80 lg:w-96 max-h-64 object-contain mb-8"
        />


        {/* Progress Bars */}
        <div className="flex gap-2 mb-6">
          <div className="bg-gray-400 h-1 w-12 sm:w-16 rounded"></div>
          <div className="bg-gray-400 h-1 w-12 sm:w-16 rounded"></div>
          <div className="bg-green-400 h-1 w-12 sm:w-16 rounded"></div>
        </div>

        {/* Text Section */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md mb-6 px-2">
          <h1 className="font-bold text-2xl sm:text-3xl mb-4 leading-tight">
            Stay Connected
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Chat or call your tasker to fine-tune every detail
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setStep(5)}
          className="border-2 border-blue-600 bg-blue-600 text-white rounded-md
                     px-16 sm:px-20 md:px-28 lg:px-32 py-3
                     text-sm sm:text-base font-medium
                     hover:bg-blue-500 hover:border-blue-500
                     active:bg-blue-950 active:border-blue-950
                     transition"
        >
          Next
        </button>
      </main>
    </div>
  );
}

export default Onboardingpage4;
