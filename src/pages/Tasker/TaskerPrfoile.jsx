import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { ArrowLeft, User, Sliders, ChevronLeft } from "lucide-react";
import StarRating from "@components/ui/StaringRate";
import ReadMore from "@components/ui/ReadMore";
import SortReviewsModal from "@components/modals/SortReviewsModal";
import ScheduleModal from "@components/modals/ScheduleModal";

// --- Import components ---
// import StarRating from "../components/StarRating";
// import ReadMore from "../components/ReadMore";
// import SortReviewsModal from "../components/SortReviewsModal";
// import ScheduleModal from "../components/ScheduleModal";

function TaskerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [tasker, setTasker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const canBook = user && user.role !== "technician";
  const isTechnicianUser = user?.role === "technician";

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return tasker?.rating_average || "0.0";
    return (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1);
  }, [reviews, tasker]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
        const [profileRes, reviewsRes, usersRes] = await Promise.all([
          fetch(`https://fixfy.liara.run/api/v1/technicians/${id}`, { headers }),
          fetch(`https://fixfy.liara.run/api/v1/technicians/${id}/reviews`, { headers }),
          fetch(`https://fixfy.liara.run/api/v1/usermains`, { headers }),
        ]);

        const profileData = await profileRes.json();
        const reviewsData = await reviewsRes.json();
        const usersData = await usersRes.json();
        const taskerProfile = profileData.data;

        taskerProfile.profile_picture_url = taskerProfile.profile_picture
          ? taskerProfile.profile_picture.startsWith("http")
            ? taskerProfile.profile_picture
            : `https://fixfy.liara.run/storage/${taskerProfile.profile_picture}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(taskerProfile.name)}&background=random&color=fff`;

        const enrichedReviews = (reviewsData.data || []).map(rev => ({
          ...rev,
          customerName: rev.customer?.name || "Anonymous User",
          customerAvatar: rev.customer?.customerAvatar,
          displayComment: rev.review_text || "No description provided.",
        }));

        setTasker(taskerProfile);
        setReviews(enrichedReviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleSort = (option) => {
    const sorted = [...reviews];
    if (option === "Highest Rated") sorted.sort((a, b) => b.rating - a.rating);
    else if (option === "Lowest Rated") sorted.sort((a, b) => a.rating - b.rating);
    else if (option === "Most Detailed")
      sorted.sort((a, b) => (b.displayComment?.length || 0) - (a.displayComment?.length || 0));
    else sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setReviews(sorted);
  };

  const handleScheduleContinue = (details) =>
    navigate("/task-detail", { state: { tasker, schedule: details } });

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black text-cyan-600 animate-pulse bg-white text-xl tracking-tighter">
        LOADING TASKER...
      </div>
    );

  if (!tasker)
    return <div className="p-10 text-center font-bold">Technician not found.</div>;

  return (
    <div className="bg-gray-50 lg:bg-gray-100 min-h-screen pb-24 lg:pb-12 font-sans">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header (Mobile) */}
        <header className="p-4 flex items-center lg:hidden bg-white/70 backdrop-blur-md sticky top-0 z-40 rounded-b-3xl mb-4 border-b border-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center cursor-pointer bg-white rounded-xl shadow-sm border border-gray-50 active:scale-90 transition"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-black mx-auto text-gray-900 pr-10">Profile</h1>
        </header>

        {/* Back Button (Desktop) */}
        <div className="hidden lg:block mb-8 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-gray-400 cursor-pointer hover:text-cyan-600 transition-all"
          >
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-50 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-black text-xs uppercase tracking-widest">
              Return to Taskers
            </span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Tasker Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-xl p-8 relative lg:sticky lg:top-10 text-center border border-white">
              {averageRating >= 4.8 && (
                <span className="absolute top-8 right-8 bg-yellow-400 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-lg shadow-yellow-100">
                  Elite Tasker
                </span>
              )}
              <img
                className="h-32 w-32 rounded-[32px] mx-auto object-cover border-4 border-cyan-50 p-1 shadow-inner"
                src={tasker.profile_picture_url}
                alt={tasker.name}
              />
              <h2 className="text-3xl font-black text-gray-900 mt-6 tracking-tight">
                {tasker.name}
              </h2>
              <p className="text-cyan-600 font-black uppercase tracking-widest text-[11px] mt-1 bg-cyan-50 inline-block px-3 py-1 rounded-lg">
                {tasker.specialty || "Pro Service"}
              </p>

              <div className="flex justify-between mt-10 pt-8 border-t border-gray-50">
                <div>
                  <p className="text-2xl font-black text-gray-900">${tasker.hourly_rate}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Hrly</p>
                </div>
                <div className="border-l border-gray-100 px-6">
                  <p className="text-2xl font-black text-gray-900">⭐{averageRating}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">{tasker.min_hours || 1}h</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Min</p>
                </div>
              </div>

              <div className="mt-10 hidden lg:block">
                {/* Book Button */}
                <button
                  disabled={!canBook}
                  onClick={() => {
                    if (!user) {
                      setShowLoginPopup(true);
                    } else if (isTechnicianUser) {
                      return; // تکنسین هیچ کاری نتونه بکنه
                    } else {
                      setScheduleModalOpen(true);
                    }
                  }}
                  className={`w-full font-black py-5 rounded-2xl shadow-2xl transition-all active:scale-95
    ${!canBook
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-100"
                    }`}
                >
                  Book This Technician
                </button>
                {user?.role === "technician" && (
                  <p className="text-xs text-gray-400 mt-3 font-bold">
                    Technicians cannot book other technicians.
                  </p>
                )}
                {showLoginPopup && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl max-w-sm w-full text-center shadow-xl">
                      <h3 className="text-lg font-bold mb-4">Login Required</h3>
                      <p className="text-gray-600 mb-6">You must be logged in to book this technician.</p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setShowLoginPopup(false)}
                          className="px-4 py-2 font-bold rounded-2xl bg-gray-200 hover:bg-gray-300 transition"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => navigate("/login")}
                          className="px-4 py-2 font-bold rounded-2xl bg-cyan-600 text-white hover:bg-cyan-700 transition"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8 mt-8 lg:mt-0">
            {/* Professional Bio */}
            <div className="bg-white rounded-[40px] shadow-sm p-10 border border-white">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <div className="p-2 bg-cyan-50 rounded-xl mr-4">
                  <User className="text-cyan-600" size={20} />
                </div>
                Professional Bio
              </h3>
              <ReadMore text={tasker.bio} />
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-[40px] shadow-sm p-10 border border-white">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-gray-900">Client Reviews</h3>
                <button
                  onClick={() => setSortModalOpen(true)}
                  className="w-12 h-12 bg-gray-50 rounded-2xl text-gray-500 hover:bg-cyan-50 hover:text-cyan-600 flex items-center justify-center transition"
                >
                  <Sliders size={20} />
                </button>
              </div>

              {reviews.length ? (
                <div className="space-y-12">
                  {reviews.slice(0, visibleReviews).map((review, idx) => (
                    <div
                      key={review.id}
                      className={`${idx > 0 ? "border-t border-gray-50 pt-10" : ""} animate-in fade-in duration-500`}
                    >
                      <div className="flex items-start">
                        <img
                          src={review.customerAvatar}
                          alt={review.customerName}
                          className="h-14 w-14 rounded-2xl object-cover shadow-md mr-5 border-2 border-white"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-black text-gray-900 text-lg">{review.customerName}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-gray-600 mt-5 italic leading-relaxed text-sm bg-gray-50/50 p-4 rounded-2xl border border-gray-50/50">
                            "{review.displayComment}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {visibleReviews < reviews.length && (
                    <button
                      onClick={() => setVisibleReviews((v) => v + 3)}
                      className="w-full py-5 font-black text-cyan-600 bg-cyan-50/30 rounded-2xl hover:bg-cyan-50 transition-all uppercase text-xs tracking-widest border border-dashed border-cyan-100"
                    >
                      View More Reviews
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 opacity-40">
                  <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarRating rating={0} />
                  </div>
                  <p className="italic font-bold text-gray-400">No reviews yet for this tasker.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      {user && user.role !== "technician" && (
        <footer className="bg-white/90 backdrop-blur-2xl p-6 border-t border-gray-100 fixed bottom-0 w-full lg:hidden flex items-center justify-between rounded-t-[40px] shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-50 px-10">
          <div>
            <p className="text-3xl font-black text-gray-900 tracking-tighter">
              ${tasker.hourly_rate}
            </p>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              per hour
            </p>
          </div>
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="bg-cyan-600 text-white font-black py-4 px-10 rounded-2xl shadow-2xl shadow-cyan-200 transition active:scale-95"
          >
            Book Now
          </button>
        </footer>
      )}

      {sortModalOpen && <SortReviewsModal onClose={() => setSortModalOpen(false)} onSort={handleSort} />}
      {scheduleModalOpen && (
        <ScheduleModal onClose={() => setScheduleModalOpen(false)} taskerName={tasker.name} onContinue={handleScheduleContinue} />
      )}
    </div>
  );
}

export default TaskerProfile;
