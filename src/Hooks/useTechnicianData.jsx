// src/Hooks/useTechnicianProfile.jsx
import { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";

export default function useTechnicianData({ profileApi, reviewsApi, token }) {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    hourlyRate: "",
    minHours: "",
    bio: "",
  });
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH PROFILE ----------------
  const fetchProfile = async () => {
    try {
      const res = await fetch(profileApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData({
        name: data.name ?? "",
        specialty: data.specialty ?? "",
        hourlyRate: data.hourly_rate ?? "",
        minHours: data.min_hours ?? "",
        bio: data.bio ?? "",
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  // ---------------- FETCH REVIEWS ----------------
  const fetchReviews = async () => {
    try {
      const res = await fetch(reviewsApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReviews(data.reviews ?? []);
      setAverageRating(data.average_rating ?? 0);
      setReviewsCount(data.total_reviews ?? 0);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  // ---------------- SAVE PROFILE ----------------
  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch(profileApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          specialty: formData.specialty,
          hourly_rate: formData.hourlyRate,
          min_hours: formData.minHours,
          bio: formData.bio,
          is_profile_published: true,
        }),
      });
      await fetchProfile();
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RENDER STAR ----------------
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
        ))}
        {halfStar && <Star size={14} className="text-yellow-500 fill-yellow-200" />}
        <span className="ml-1 text-sm font-bold">{rate}</span>
      </div>
    );
  };

  useEffect(() => {
    fetchProfile();
    fetchReviews();
  }, [profileApi, reviewsApi, token]);

  return {
    formData,
    setFormData,
    reviews,
    averageRating,
    reviewsCount,
    loading,
    handleSave,
    renderStars,
  };
}
