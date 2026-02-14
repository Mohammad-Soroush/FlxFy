import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CostumerServices() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can book a service directly through the app by choosing a task and confirming your schedule.",
    },
    {
      question: "Can I cancel or reschedule?",
      answer:
        "Yes, you can cancel or reschedule your service before it starts without any extra charge.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center min-h-screen p-4">
      {/* App Container */}
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white min-h-screen md:min-h-[85vh] md:rounded-2xl md:shadow-xl font-sans">
        
        {/* Header */}
        <header className="relative flex items-center justify-center p-4 border-b">
          <button className="absolute left-4"   onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Customer Services</h1>
        </header>

        {/* Search */}
        <div className="px-4 mt-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
            <input
              type="text"
              placeholder="Typing..."
              className="ml-3 bg-transparent outline-none text-sm text-gray-700 w-full"
            />
          </div>
        </div>

        {/* FAQ */}
        <div className="px-4 mt-6 space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-100 rounded-xl">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-4 flex justify-between items-center"
              >
                <span className="text-gray-800 text-sm font-medium">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 px-4 ${
                  openIndex === index ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us */}
        <div className="mt-8 px-4 pb-6">
          <p className="text-center text-sm text-gray-500 mb-4">Contact Us</p>
          <div className="flex justify-between">
            <button className="flex-1 mx-1 bg-gray-100 rounded-xl py-3 flex justify-center">📞</button>
            <button className="flex-1 mx-1 bg-gray-100 rounded-xl py-3 flex justify-center">✉️</button>
            <button className="flex-1 mx-1 bg-gray-100 rounded-xl py-3 flex justify-center">💬</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostumerServices;
