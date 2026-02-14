import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "../../assetsJS";
import useSearch from "../../Hooks/useSearch";

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // --- Fetch search results ---
  const { data: taskers = [], loading } = useSearch({
    endpoint: "http://localhost:8000/api/v1/technicians/search",
    queryKey: "query",
    searchValue: query,
    enabled: query.length > 0,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });

  // --- Animate open/close ---
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setShow(true), 50);
    } else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  // --- Navigate to tasker profile ---
  const handleTaskerClick = (id) => {
    navigate(`/tasker/${id}`);
  };

  // --- Get profile picture ---
  const getProfilePictureUrl = (tasker) => {
    if (tasker.profile_picture) {
      return tasker.profile_picture.startsWith("http")
        ? tasker.profile_picture
        : `https://fixfy.liara.run/storage/${tasker.profile_picture}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      tasker.name
    )}&background=random&color=fff`;
  };

  // --- Filter results to start with query ---
  const filteredTaskers = taskers.filter((tasker) => {
    const lowerQuery = query.toLowerCase();
    return (
      tasker.name?.toLowerCase().startsWith(lowerQuery) ||
      tasker.specialty?.toLowerCase().startsWith(lowerQuery)
    );
  });

  return (
    <div
      className={`fixed inset-0 flex flex-col z-50 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "white" }}
    >
      {/* Top Search Bar */}
      <div className="flex items-center w-full px-5 py-3 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-10 rounded-b-lg">
        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 shadow-inner hover:shadow-md transition-shadow duration-200">
          <img
            src={MagnifyingGlass}
            className="w-5 h-5 mr-3 text-gray-500"
            alt="search"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a service..."
            className="w-full outline-none bg-transparent text-gray-700 text-md placeholder-gray-400"
            autoFocus
          />
          <button
            className="text-gray-500 hover:text-gray-800 text-xl ml-3 cursor-pointer flex-shrink-0"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {query.length > 0 ? (
          filteredTaskers.length > 0 ? (
            filteredTaskers.map((tasker) => (
              <div
                key={tasker.id}
                onClick={() => handleTaskerClick(tasker.id)}
                className="flex gap-3 py-3 px-3 mb-4 bg-gray-50 hover:bg-gray-100 hover:shadow-md rounded-xl cursor-pointer transition-all duration-200"
              >
                <img
                  src={getProfilePictureUrl(tasker)}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl object-cover"
                  alt={tasker.name}
                />
                <div>
                  <p className="text-gray-700 text-sm sm:text-lg md:text-xl font-bold">
                    {tasker.name || "Unnamed"}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    {tasker.specialty || "Specialty not provided"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No taskers found</p>
          )
        ) : (
          <p className="text-gray-500 text-sm">Start typing to search</p>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
