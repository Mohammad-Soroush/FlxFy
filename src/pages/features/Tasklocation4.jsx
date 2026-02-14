import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskLocation4() {
    const navigate = useNavigate();
    const [mountOption, setMountOption] = useState(""); // start with nothing selected
    const [error, setError] = useState(""); // for showing message

    const handleContinue = () => {
        if (!mountOption) {
            setError("Please select a TV mount option before continuing.");
            return;
        }
        navigate("/task-location/5"); // go to the next page
    };

    const options = [
        { id: "yes-mount", label: "Yes, I already have a TV mount" },
        { id: "no-mount", label: "No, I need one provided" },
        { id: "not-sure", label: "I'm not sure" },
    ];

    return (
        <div className="bg-gray-100 md:flex md:justify-center md:items-center md:min-h-screen">
            {/* Main container */}
            <div className="w-full min-h-screen bg-white flex flex-col md:max-w-lg md:min-h-0 md:shadow-lg md:rounded-xl md:my-8">

                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-200 md:p-6">
                    <button className="text-gray-600" onClick={() => navigate(-1)}>
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

                    <h1 className="text-lg font-semibold text-gray-800 text-center md:text-xl">
                        About your task
                    </h1>

                    <button className="text-sm text-gray-500 md:text-base" onClick={() => navigate("/home")}>
                        Cancel
                    </button>
                </header>

                {/* Progress Bar */}
                <div className="px-4 pt-4 md:px-6">
                    <div className="flex items-center space-x-1.5 my-4">
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full" />
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-grow p-4 md:p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 md:text-2xl">
                        Do you already have a TV mount, or do you need one provided?
                    </h2>

                    <form>
                        <fieldset className="space-y-5">
                            <legend className="sr-only">TV mount options</legend>
                            {options.map((option) => (
                                <div key={option.id} className="flex items-center">
                                    <input
                                        id={option.id}
                                        name="mount-option"
                                        type="radio"
                                        value={option.id}
                                        checked={mountOption === option.id}
                                        onChange={() => {
                                            setMountOption(option.id);
                                            setError(""); // clear error on selection
                                        }}
                                        className="focus:ring-green-500 h-5 w-5 border-gray-300 accent-green-500"
                                    />
                                    <label
                                        htmlFor={option.id}
                                        className="ml-3 block text-base text-gray-700 md:text-lg cursor-pointer"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </fieldset>

                        {/* Error message */}
                        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                    </form>
                </main>

                {/* Footer */}
                <footer className="p-4 mt-auto border-t border-gray-200 md:p-6">
                    <button
                        onClick={handleContinue}
                        disabled={!mountOption}
                        className={`w-full text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2
                           focus:ring-offset-2 focus:ring-blue-500 md:text-lg ${
                               mountOption ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                           }`}
                    >
                        Continue
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TaskLocation4;
