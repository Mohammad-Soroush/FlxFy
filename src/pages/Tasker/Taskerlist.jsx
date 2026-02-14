import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@components/ui/BackButton";
import useFetchData from "@hooks/useFetchData";

function TaskerList() {
  const navigate = useNavigate();

  const { data: taskersData, loading, error } = useFetchData({
    endpoint: "https://fixfy.liara.run/api/v1/usermains",
  });

  // Filter & normalize taskers
  const taskers = taskersData
    .filter((user) => user.role === "technician" && user.is_profile_published)
    .map((t) => ({
      id: t.id,
      name: t.name,
      role: t.specialty || "Professional Tasker",
      price: t.hourly_rate || 0,
      rating: t.rating_average || 0,
      minHours: t.min_hours || 1,
      avatar: t.profile_picture
        ? t.profile_picture.startsWith("http")
          ? t.profile_picture
          : `https://fixfy.liara.run/storage/${t.profile_picture}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            t.name
          )}&background=random&color=fff`,
    }));

  const handleClick = (tasker) => {
    navigate(`/tasker/${tasker.id}`, { state: tasker });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-800">Available Technicians</h1>
        <div className="w-10"></div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Loading verified technicians...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-center mb-6">
          Failed to load taskers. Please check your connection.
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && taskers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Loading verified technicians...</p>
        </div>
      )}

      {/* Tasker Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {taskers.map((tasker) => (
          <div
            key={tasker.id}
            onClick={() => handleClick(tasker)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <img
                src={tasker.avatar}
                alt={tasker.name}
                className="w-16 h-16 rounded-full object-cover shadow-inner"
              />
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-lg">{tasker.name}</h2>
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-tighter">
                  {tasker.role}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  ${tasker.price} <span className="text-xs font-normal">/ hr</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t border-gray-50">
              <div className="flex items-center text-amber-500 font-bold text-sm">
                ⭐ <span className="ml-1 text-gray-700">{tasker.rating > 0 ? tasker.rating : "New"}</span>
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tasker.minHours}h minimum
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskerList;
