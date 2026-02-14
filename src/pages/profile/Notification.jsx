import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();

  // Task updates
  const [emailNotify, setEmailNotify] = useState(false);
  const [smsNotify, setSmsNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(true);

  // Offers
  const [taskIdeas, setTaskIdeas] = useState(false);
  const [promoOffers, setPromoOffers] = useState(false);

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center min-h-screen ">
      {/* App Container */}
      <div className="w-full max-w-md lg:max-w-lg bg-white min-h-screen md:min-h-[80vh] md:rounded-2xl md:shadow-xl font-sans">

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
            Notification
          </h1>
        </header>

        {/* Main Content */}
        <main className="p-6">

          {/* Task Updates */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Task updates</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage how you are notified when you receive an update for your task
              </p>
            </div>

            <div className="space-y-4 pt-2">

              {/* Email */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sarahjohnson@gmail.com</span>
                <Toggle checked={emailNotify} onChange={setEmailNotify} />
              </div>

              {/* SMS */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">(954) 673-7600</span>
                <Toggle checked={smsNotify} onChange={setSmsNotify} />
              </div>

              {/* Push */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">App push notifications</span>
                <Toggle checked={pushNotify} onChange={setPushNotify} />
              </div>

            </div>
          </section>

          {/* Divider */}
          <hr className="my-8" />

          {/* Task Ideas & Offers */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Task ideas and offers
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Receive task recommendations and promotional offers
              </p>
            </div>

            <div className="space-y-4 pt-2">

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Task recommendations</span>
                <Toggle checked={taskIdeas} onChange={setTaskIdeas} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Promotional offers</span>
                <Toggle checked={promoOffers} onChange={setPromoOffers} />
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

/* 🔁 Reusable Toggle Switch */
function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border after:border-gray-300 after:rounded-full
        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full">
      </div>
    </label>
  );
}

export default Notification;
