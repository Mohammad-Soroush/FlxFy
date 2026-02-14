import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, MapPin, ChevronLeft, ShieldCheck, AlertCircle } from "lucide-react";

export default function TaskDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [taskerDbInfo, setTaskerDbInfo] = useState(null);
  const [duplicatePopup, setDuplicatePopup] = useState(false);
  useEffect(() => {
    const fetchTaskerInfo = async () => {
      if (!state?.tasker?.id) return;
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://fixfy.liara.run/api/v1/usermains/${state.tasker.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setTaskerDbInfo(result.data);
        }
      } catch (err) {
        console.error("Error fetching tasker info:", err);
      }
    };
    fetchTaskerInfo();
  }, [state]);

  if (!state || !state.tasker) {
    navigate("/");
    return null;
  }
  const handleCancelBooking = async () => {
    if (!state?.booking_id) {
      alert("Booking not found");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this task?")) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://fixfy.liara.run/api/v1/bookings/${state.booking_id}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "canceled",
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Cancel failed");
      }

      // بعد از موفقیت
      navigate("/mytasks");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };



  const currentTasker = taskerDbInfo || state.tasker;
  const hourlyRate = parseFloat(currentTasker.hourly_rate || currentTasker.price || 0);
  const supportFee = 16.24;
  const totalEstimate = hourlyRate + supportFee;

  // --- منطق سخت‌گیرانه برای جلوگیری از رزرو تکراری ---
  const handleConfirmBooking = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // ۱. چک کردن رزروهای قبلی کاربر
      const checkResponse = await fetch("https://fixfy.liara.run/api/v1/bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (!checkResponse.ok) throw new Error("Could not verify booking history");

      const bookingsData = await checkResponse.json();
      const userBookings = bookingsData.data || [];

      // بررسی اینکه آیا رزروی با این تکنسین (که لغو نشده باشد) وجود دارد؟
      const isDuplicate = userBookings.some(
        (b) => String(b.technician_id) === String(currentTasker.id) && b.status.toLowerCase() !== "cancelled"
      );

      if (isDuplicate) {
        setDuplicatePopup(true);
        setLoading(false);
        return;
      }

      // ۲. در صورت تکراری نبودن، اقدام به رزرو می‌کنیم
      const bookingData = {
        technician_id: currentTasker.id,
        service_id: currentTasker.service_id || null,
        status: "booked",
        scheduled_time: `${state.schedule.date} ${state.schedule.time}`,
        address: state.schedule.location || "Default Address",
        total_price: totalEstimate,
      };

      const response = await fetch("https://fixfy.liara.run/api/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("lastBookedTask", JSON.stringify({
          ...state,
          booking_id: result.data.id,
          status: "booked"
        }));
        navigate("/payment", { state: { ...state, booking_id: result.data.id, status: "booked" } });
      } else {
        alert(result.message || "Failed to register booking in database");
      }
    } catch (err) {
      alert(err.message || "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FC] flex justify-center items-center min-h-screen p-4 md:p-8 font-sans text-left">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-gray-100">

        <div className="p-8">
          <header className="flex items-center justify-between mb-10">
            <button className="p-3 hover:bg-gray-100 rounded-2xl transition-all border border-gray-50" onClick={() => navigate(-1)}>
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Booking Summary</h1>
            <div className="w-10" /> {/* Spacer */}
          </header>

          {/* Technician Profile Card */}
          <div className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-transparent rounded-[2rem] mb-10 border border-gray-50">
            <div className="relative">
              <img
                className="w-20 h-20 rounded-3xl border-4 border-white shadow-md object-cover"
                src={currentTasker.profile_picture_url || currentTasker.avatar || `https://ui-avatars.com/api/?name=${currentTasker.name}`}
                alt={currentTasker.name}
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-1.5 rounded-xl text-white shadow-lg">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="ml-6">
              <p className="text-2xl font-black text-gray-900 tracking-tighter">{currentTasker.name}</p>
              <p className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mt-1">
                {currentTasker.specialty || "Professional Tasker"}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Date", val: state.schedule.date, icon: <Calendar size={16} /> },
              { label: "Time", val: state.schedule.time, icon: <Clock size={16} /> },
              { label: "Address", val: state.schedule.location, icon: <MapPin size={16} /> }
            ].map((item, idx) => (
              <div key={idx} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                <p className="font-bold text-gray-800 truncate">{item.val}</p>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-50">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Tasker Hourly Rate</span>
                <span className="text-gray-900">${hourlyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Trust & Support Fee</span>
                <span className="text-gray-900">$16.24</span>
              </div>
              <div className="pt-6 mt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-gray-900">Total</span>
                  <AlertCircle size={14} className="text-gray-300" />
                </div>
                <span className="text-3xl font-black text-[#709500] tracking-tighter">${totalEstimate.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 pt-0 flex flex-col gap-4">
          <button
            className={`w-full text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              }`}
            onClick={handleConfirmBooking}
            disabled={loading}
          >
            {loading ? "Validating & Saving..." : "Confirm & Book Now"}
          </button>
          <button
            className="w-full bg-white text-gray-400 font-bold py-4 rounded-2xl hover:text-red-500 transition-colors"
            onClick={handleCancelBooking}
            disabled={loading}
          >
            {loading ? "Processing..." : "Cancel Request"}
          </button>

        </div>
      </div>
      {duplicatePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          {/* Modal */}
          <div className="bg-white w-[90%] max-w-md rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">

            <div className="mb-4 text-red-500 flex justify-center">
              <AlertCircle size={42} />
            </div>

            <h2 className="text-xl font-black text-gray-900 mb-3">
              Duplicate Booking
            </h2>

            <p className="text-gray-500 font-bold mb-6 leading-relaxed">
              You already have an active booking with this technician.
              Only one booking per technician is allowed.
            </p>

            <button
              onClick={() => setDuplicatePopup(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition"
            >
              Got it
            </button>

          </div>
        </div>
      )}
    </div>
  );
}