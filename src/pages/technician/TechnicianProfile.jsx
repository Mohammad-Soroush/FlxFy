import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, DollarSign, Save, Star, User, ArrowLeft } from "lucide-react";
import useTechnicianProfile from "@hooks/useTechnicianData";
import BackButton from "@components/ui/BackButton";

const TechnicianAdminPanel = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    formData,
    setFormData,
    reviews,
    averageRating,
    reviewsCount,
    loading,
    handleSave,
    renderStars,
  } = useTechnicianProfile({
    profileApi: "https://fixfy.liara.run/api/v1/technician/profile",
    reviewsApi: "https://fixfy.liara.run/api/v1/technician/reviews",
    token,
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackButton/>
          <h1 className="text-xl font-black text-gray-800">Account Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-4">
                <User size={20} />
                Edit Public Profile
              </h2>

              <div className="space-y-5">
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Full Name"
                />
                <input
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Specialty"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    className="p-2.5 border rounded-lg"
                    placeholder="Hourly Rate"
                  />
                  <input
                    value={formData.minHours}
                    onChange={(e) => setFormData({ ...formData, minHours: e.target.value })}
                    className="p-2.5 border rounded-lg"
                    placeholder="Min Hours"
                  />
                </div>
                <textarea
                  rows="5"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Bio"
                />

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full py-3 bg-cyan-600 text-white rounded-xl font-bold flex justify-center gap-2"
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                Customer Ratings
              </h2>

              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black">{averageRating}</span>
                <span className="text-xs text-gray-400">
                  based on {reviewsCount} reviews
                </span>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-sm">{review.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.review_text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      by {review.customer?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianAdminPanel;
