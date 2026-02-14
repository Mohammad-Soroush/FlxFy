import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function StarRating({ label, value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <span className="text-lg font-medium text-gray-600">{label}</span>
            <div className="flex space-x-1 text-gray-200">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => onChange(star)}
                        className={`transition ${star <= (hovered || value) ? "text-yellow-400" : ""}`}
                    >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}

function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-sm rounded-[3rem] p-10 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-[#709500] rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">Thank you!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    The task is now marked as <span className="font-bold text-gray-800">TaskCompleted</span> and moved to your history.
                </p>
                <button 
                    onClick={() => navigate("/mytask")} 
                    className="w-full bg-[#2D6A9F] text-white font-black py-4 rounded-2xl hover:bg-[#1e4b72] transition-all shadow-md active:scale-95"
                >
                    Back to My Tasks
                </button>
            </div>
        </div>
    );
}

export default function LeaveReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const task = location.state?.task;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [ratings, setRatings] = useState({
        overall: 0,
        reliability: 0,
        punctuality: 0,
        solution: 0,
        payout: 0
    });

    const handleRatingChange = (category, value) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    };

    const handleSubmit = async () => {
        if (ratings.overall === 0) {
            alert("Please provide at least an Overall Service rating.");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            // ۱. ثبت نظر (Review)
            const reviewResponse = await fetch("https://fixfy.liara.run/api/v1/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    booking_id: task?.id,
                    technician_id: task?.technician_id,
                    rating: ratings.overall,
                    reliability: ratings.reliability,
                    punctuality: ratings.punctuality,
                    solution: ratings.solution,
                    payout: ratings.payout,
                    review_text: comment
                }),
            });

            if (reviewResponse.ok) {
                // ۲. آپدیت وضعیت به TaskCompleted (دقیقاً مشابه دیتابیس)
                const updateStatusResponse = await fetch(`https://fixfy.liara.run/api/v1/bookings/${task.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status: "TaskCompleted" }), // <--- اینجا از حروف بزرگ استفاده شد
                });

                if (updateStatusResponse.ok) {
                    setIsModalOpen(true);
                } else {
                    alert("Review submitted, but task status update failed.");
                }
            } else {
                const result = await reviewResponse.json();
                alert(result.message || "Review submission failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Connection error. Check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    if (!task) return <div className="p-20 text-center font-bold text-xl">Loading Task Data...</div>;

    return (
        <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center p-4">
            <div className={`bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500 ${isModalOpen ? 'scale-95 blur-sm' : ''}`}>
                <div className="flex items-center px-10 py-8 border-b border-gray-100">
                    <button onClick={() => navigate(-1)} className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="flex-1 text-center text-2xl font-black text-gray-900 pr-12">Review Your Experience</h1>
                </div>

                <div className="px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="text-left">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">Your feedback matters</h2>
                        <p className="text-gray-500 text-xl mb-12 font-medium">How would you rate <span className="text-[#2D6A9F]">{task.techName}</span>?</p>
                        
                        <div className="space-y-8">
                            {['overall', 'reliability', 'punctuality', 'solution', 'payout'].map((cat) => (
                                <StarRating 
                                    key={cat}
                                    label={cat.charAt(0).toUpperCase() + cat.slice(1)} 
                                    value={ratings[cat]} 
                                    onChange={(v) => handleRatingChange(cat, v)} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col text-left">
                        <label className="text-2xl font-black text-gray-900 mb-4">Tell us more</label>
                        <textarea
                            rows={8}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full flex-1 border-2 border-gray-100 rounded-[2rem] p-7 focus:ring-4 focus:ring-blue-50 focus:border-[#2D6A9F] outline-none text-lg transition-all"
                            placeholder="Describe your experience with the service..."
                        />
                    </div>
                </div>

                <div className="px-12 pb-12">
                    <button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className={`w-full py-5 rounded-2xl text-2xl font-black shadow-xl transition-all active:scale-[0.98] ${
                            loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#709500] hover:bg-[#5d7c00] text-white'
                        }`}
                    >
                        {loading ? "SAVING..." : "SUBMIT & CLOSE TASK"}
                    </button>
                </div>
            </div>

            <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}