import React, { useState } from "react";

import { useAuth } from "../../userContext/AuthContext"; // adjust path if needed
import api from "../../api/axiosConfig"; // same axios you already use
import { useNavigate } from "react-router-dom";

function AddNewAddress() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // we’ll update user after save
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSaveAddress = async () => {
  if (!street || !city) {
    alert("Street and city are required");
    return;
  }

  setLoading(true);

  const fullAddress = `${street}, ${city}${zip ? `, ${zip}` : ""}`;

  try {
  const res = await api.put("/v1/user/address", {
    address: fullAddress,
  });

  // ✅ SUCCESS CASE (200)
  setUser(res.data.user);
  alert("Address saved successfully");
  navigate(-1);

} catch (error) {

  // ❌ SAME ADDRESS (409)
  if (error.response?.status === 409) {
    alert("Your address already exists");
  } else if(error.response?.status === 400) {
    alert("Failed to save address");
  }

} finally {
  setLoading(false);
}
};

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="text-gray-600 hover:text-gray-800" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800"> Manage Address</h1>
        </div>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label
              htmlFor="street-address"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Street address
            </label>
            <input
              type="text"
              placeholder="Street address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              City
            </label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

          </div>

          <div className="mb-6">
            <label
              htmlFor="zip-code"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              ZIP code
            </label>
            <input
              type="text"
              placeholder="ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={handleSaveAddress}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-700 text-sm font-medium">
              Set as primary address
            </span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="primary-address-toggle"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewAddress;
