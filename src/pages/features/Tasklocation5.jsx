import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskLocation5() {
    const navigate = useNavigate();
    const [taskInfo, setTaskInfo] = useState(""); // starts empty
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(""); // for showing error if empty

    useEffect(() => {
        if (showDropdown) {
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        }
    }, [showDropdown]);

    const handleContinue = () => {
        if (!taskInfo.trim()) {
            setError("Please type some information before continuing.");
            return;
        }
        setError("");
        setShowDropdown(true);
    };

    const handleConfirm = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setShowDropdown(false);
            navigate("/home"); // adjust next route
        }, 300);
    };

    const handleCancel = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setShowDropdown(false);
        }, 300);
    };

    return (
        <div className="bg-[#FFFBF9] font-sans md:flex md:items-center md:justify-center md:min-h-screen">
            {/* Main container */}
            <div className="w-full max-w-sm mx-auto flex flex-col min-h-screen bg-transparent md:bg-white md:shadow-2xl md:max-w-2xl md:min-h-0 md:rounded-2xl md:my-10">
                
                {/* Header */}
                <header className="flex items-center justify-between p-4 md:p-6 md:border-b md:border-gray-200">
                    <button className="text-gray-600 hover:text-gray-800" onClick={() => navigate(-1)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 md:h-7 md:w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold text-[#3D3D3D] md:text-2xl">About your task</h1>
                    <button className="text-gray-500 text-sm md:text-base hover:text-gray-700" onClick={() => navigate("/home")}>
                        Cancel
                    </button>
                </header>

                {/* Progress Bar */}
                <div className="px-6 pt-2 pb-4 md:px-8 md:pt-6">
                    <div className="flex items-center space-x-1.5">
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-grow px-6 py-4 md:p-8">
                    <div className="mb-6 md:mb-8 md:text-center">
                        <h2 className="text-xl font-bold text-[#3D3D3D] leading-tight md:text-3xl">
                            Is there any information your Tasker needs to know?
                            <span className="font-normal text-base text-gray-500 md:block md:mt-2">(Required)</span>
                        </h2>
                    </div>
                    <div>
                        <textarea
                            id="task-info"
                            name="task-info"
                            rows={5}
                            value={taskInfo}
                            onChange={(e) => setTaskInfo(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-400 text-base md:text-lg md:rows-6"
                            placeholder="For example: Any restrictions, gate access, or where to park."
                        />
                        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-5 mt-auto md:p-6 md:border-t md:border-gray-200">
                    <button
                        onClick={handleContinue}
                        className={`w-full bg-[#1A73E8] text-white font-semibold py-3 px-4 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:py-4 md:text-xl md:rounded-xl ${
                            taskInfo.trim() ? "" : "opacity-70 cursor-not-allowed"
                        }`}
                    >
                        Continue
                    </button>
                </footer>
            </div>

            {/* Confirmation Modal */}
            {showDropdown && (
                <div
                    className={`fixed inset-0 z-50 flex items-end backdrop-blur-sm bg-black/30 transition-opacity duration-300 ease-in-out ${
                        isAnimating ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={handleCancel}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full bg-white rounded-t-2xl shadow-xl p-6 mx-auto max-w-2xl transform transition-transform duration-300 ease-in-out ${
                            isAnimating ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-orange-500 text-2xl">!</span>
                            </div>
                        </div>
                        <h2 className="text-center text-gray-800 font-semibold text-lg mb-2">
                            Confirm Your Progress
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-6">
                            Continuing will save this step and move you to the next one.
                        </p>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={handleConfirm}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                            >
                                Save & Continue
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg"
                            >
                                Cancel the progress
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskLocation5;
