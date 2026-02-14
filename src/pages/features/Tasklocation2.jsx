import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskLocation2() {
    const navigate = useNavigate();
    const [tvCount, setTvCount] = useState(""); // start with empty string

    const handleContinue = () => {
        if (!tvCount) {
            alert("Please select the number of TVs before continuing.");
            return;
        }
        navigate("/task-location/3");
    };

    const options = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4 or more", value: "4+" },
    ];

    return (
        <div className="bg-gray-100 md:flex md:items-center md:justify-center md:min-h-screen">
            <div className="w-full min-h-screen bg-white flex flex-col md:max-w-lg md:min-h-0 md:rounded-xl md:shadow-lg md:my-8">
                
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-200 md:p-6">
                    <button onClick={() => navigate(-1)} className="p-1">
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
                    <h1 className="text-lg font-semibold text-gray-800 md:text-xl">About your task</h1>
                    <button
                        className="text-gray-500 text-sm md:text-base hover:text-gray-800"
                        onClick={() => navigate("/home")}
                    >
                        Cancel
                    </button>
                </header>

                {/* Progress Bar */}
                <div className="px-4 pt-4 md:px-6">
                    <div className="flex items-center space-x-1.5">
                        <div className="flex-1 h-1.5 bg-green-400 rounded-full" />
                        <div className="flex-1 h-1.5 bg-green-400 rounded-full" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
                    </div>
                </div>

                {/* Main Content */}
                <main className="p-4 flex-grow md:p-6">
                    <h2 className="text-xl font-bold my-6 text-gray-900 md:text-2xl md:my-8 md:text-center">
                        How many TVs need to be installed?
                    </h2>

                    <form className="space-y-4 md:space-y-5">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center text-base p-3 rounded-lg
                                           md:text-lg md:p-4 md:border md:border-gray-200
                                           md:hover:bg-gray-50 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="tv-count"
                                    value={option.value}
                                    checked={tvCount === option.value}
                                    onChange={() => setTvCount(option.value)}
                                    className="h-5 w-5 md:h-5 md:w-5 accent-green-500"
                                />
                                <span className="ml-3 text-gray-800 md:ml-3">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </form>
                </main>

                {/* Footer */}
                <footer className="p-4 border-t border-gray-200 md:p-6">
                    <button
                        onClick={handleContinue}
                        disabled={!tvCount}
                        className={`w-full text-white font-semibold py-3 rounded-lg md:font-semibold md:py-3 md:rounded-lg md:text-base ${
                            tvCount ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Continue
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TaskLocation2;
