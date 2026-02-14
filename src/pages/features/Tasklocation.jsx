import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskLocation() {
    const navigate = useNavigate();

    const [zipCode, setZipCode] = useState("");
    const [street, setStreet] = useState("");

    // Button active if user typed something
    const isActive = zipCode.trim() !== "" || street.trim() !== "";

    const handleContinue = () => {
        if (!isActive) return;
        navigate("/task-location/2");
    };

    return (
        <div className="bg-gray-100 md:flex md:items-center md:justify-center md:min-h-screen">
            <div className="w-full min-h-screen bg-white flex flex-col md:max-w-2xl md:min-h-0 md:rounded-xl md:shadow-2xl md:my-10">

                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-200 md:p-6">
                    <button
                        onClick={() => navigate(-1)} // -1 goes to the previous page in history
                        className="p-1" // optional padding
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h1 className="text-lg font-semibold text-gray-800 md:text-2xl">
                        About your task
                    </h1>

                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => navigate("/home")}
                    >
                        Cancel
                    </button>
                </header>

                {/* Progress */}
                <div className="px-4 pb-4 md:px-8 md:pt-6">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1 md:h-2 bg-green-500 rounded-full" />
                        <div className="flex-1 h-1 md:h-2 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1 md:h-2 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1 md:h-2 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1 md:h-2 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1 md:h-2 bg-gray-200 rounded-full" />
                    </div>
                </div>

                {/* Main */}
                <main
                    className="p-4 flex-grow md:p-8 bg-cover bg-center"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 md:text-4xl md:text-center">
                        What is the task location?
                    </h2>

                    <div className="space-y-6">
                        {/* Zip */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Zip code
                            </label>
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="Enter your zip code"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Street */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                St / Neighborhood <span className="text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                placeholder="Enter your street or neighborhood"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-4 border-t border-gray-200 md:p-6">
                    <button
                        onClick={handleContinue}
                        disabled={!isActive}
                        className={`w-full font-semibold py-3 rounded-lg transition
              ${isActive
                                ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Continue
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TaskLocation;
