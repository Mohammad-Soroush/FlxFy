import React from "react";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
    const navigate = useNavigate();
    return (
    
    <div className="bg-gray-100 flex justify-center items-start md:items-center min-h-screen p-4">
      {/* App Container */}
      <div className="w-full max-w-sm md:max-w-2xl bg-white min-h-screen md:min-h-[85vh] md:rounded-2xl md:shadow-xl overflow-hidden font-sans">
        
        {/* Header */}
        <header className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-gray-800" onClick={()=>navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h1 className="text-xl font-semibold text-gray-800 text-center flex-grow">
              Terms & Conditions
            </h1>

            <div className="w-6"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 bg-white overflow-y-auto">
          <div className="p-6 md:p-8 rounded-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">FIXIFY</h2>
            <p className="text-sm text-gray-500 mt-1 mb-8">
              Last Updated: November 08, 2024
            </p>

            {/* Definitions */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-3">1. Definitions</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li><strong>Application:</strong> Refers to the FIXIFY software application.</li>
                <li><strong>User:</strong> A person who has registered in the application and uses its services.</li>
                <li><strong>Service Provider:</strong> A person who offers their services through the application.</li>
                <li><strong>Services:</strong> Services provided by service providers through the application.</li>
                <li><strong>Reservation:</strong> Requesting to receive services through the application.</li>
              </ul>
            </section>

            {/* Membership */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-3">2. Membership Conditions</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Users must be at least 18 years old.</li>
                <li>Users must enter accurate and complete information during registration.</li>
                <li>Each user is responsible for maintaining the security of their user account.</li>
              </ul>
            </section>

            {/* Reservation */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">3. Reservation Conditions</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Users can reserve their desired services through the application.</li>
                <li>Users must read the terms and conditions of the service provider before making a reservation.</li>
                <li>Reservation cancellation is done according to the terms and conditions of the service provider.</li>
                <li>Payment for services is done through secure payment gateways.</li>
                <li>Users are obligated to pay the service fee according to the set tariffs.</li>
                <li>After completing the reservation, the final confirmation will be sent to the registered email or phone number.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TermsAndConditions;
