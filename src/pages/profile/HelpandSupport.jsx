import React from "react";
import { useNavigate } from "react-router-dom";

function HelpandSupport() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Customer Services", path: "/CostumerServices" },
    { label: "Terms & Conditions", path: "/TermsAndConditions" },
    { label: "Privacy Policy", path: "/TermsAndConditions" },
    { label: "Contact Us", path: "/TermsAndConditions" },
    { label: "About Us", path: "/TermsAndConditions" },
  ];

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center min-h-screen">
      {/* App Container */}
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white min-h-screen md:min-h-[80vh] md:rounded-2xl md:shadow-xl font-sans">
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
          <h1 className="text-xl font-bold text-slate-800">Help & Support</h1>
        </header>

        {/* Menu List */}
        <nav className="mt-2 px-4">
          <ul className="divide-y divide-slate-300/70">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex justify-between items-center py-5 text-left"
                >
                  <span className="text-slate-800">{item.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HelpandSupport;
