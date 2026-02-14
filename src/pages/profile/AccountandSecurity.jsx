import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSecurity() {
  const navigate = useNavigate();

  const [faceId, setFaceId] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center min-h-screen ">
      {/* App Container */}
      <div className="w-full max-w-md lg:max-w-lg bg-white min-h-screen md:min-h-[70vh] md:rounded-2xl md:shadow-xl font-sans">

        {/* Header */}
        <header className="relative flex items-center justify-center p-4 border-b md:border-none">
          <button
            className="absolute left-4"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="text-xl font-semibold text-slate-800">
            Account & Security
          </h1>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">

          {/* Face ID */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Face ID</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={faceId}
                onChange={() => setFaceId(!faceId)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border after:border-gray-300 after:rounded-full
                after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full">
              </div>
            </label>
          </div>

          {/* Two-Factor Authentication */}
          <div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">
                Two-Factor authentication
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:border after:border-gray-300 after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full">
                </div>
              </label>
            </div>

            {twoFactor && (
              <div className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md space-y-1">
                <p>Your two-factor authentication is active.</p>
                <p>The code will be sent to +1 (954) 673-7677.</p>
                <p>
                  To update this number, please{" "}
                  <button className="text-green-600 font-medium hover:underline">
                    contact customer service
                  </button>.
                </p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

export default AccountSecurity  ;
