import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskLocation3() {
    const navigate = useNavigate();
    const [wallType, setWallType] = useState(""); // no default selection
    const [error, setError] = useState(""); // for showing message

    const handleContinue = () => {
        if (!wallType) {
            setError("Please select a wall type before continuing.");
            return;
        }
        navigate("/task-location/4"); // go to the next page
    };

    const options = [
        { id: "drywall", label: "Drywall" },
        { id: "brick", label: "Brick or stone" },
        { id: "concrete", label: "Concrete" },
        { id: "wood", label: "Wood" },
        { id: "other", label: "Other / I'm not sure" },
    ];

    return (
        <div className="bg-gray-100 md:flex md:justify-center md:items-center md:min-h-screen">
            {/* Main Container */}
            <div className="w-full min-h-screen bg-white flex flex-col md:max-w-lg md:min-h-0 md:shadow-lg md:rounded-xl md:my-8">

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

                    <h1 className="text-lg font-semibold text-gray-800 text-center md:text-xl">
                        About your task
                    </h1>

                    <button className="text-sm text-gray-500 md:text-base" onClick={() => navigate("/home")}>
                        Cancel
                    </button>
                </header>

                {/* Progress Bar */}
                <div className="px-4 pt-4 md:px-6">
                    <div className="flex items-center space-x-1.5">
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full" />
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full" />
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-grow p-4 md:p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 md:text-2xl">
                        What type of wall will the TV be mounted on?
                    </h2>

                    <form>
                        <fieldset className="space-y-5">
                            <legend className="sr-only">Wall type options</legend>
                            {options.map((option) => (
                                <div key={option.id} className="flex items-center">
                                    <input
                                        id={option.id}
                                        name="wall-type"
                                        type="radio"
                                        value={option.id}
                                        checked={wallType === option.id}
                                        onChange={() => {
                                            setWallType(option.id);
                                            setError(""); // clear error on selection
                                        }}
                                        className="h-5 w-5 border-gray-300 focus:ring-green-500 accent-green-500"
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
                        disabled={!wallType}
                        className={`w-full text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2
                           focus:ring-offset-2 focus:ring-blue-500 md:text-lg ${
                               wallType ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                           }`}
                    >
                        Continue
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TaskLocation3;
