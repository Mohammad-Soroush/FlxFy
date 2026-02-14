import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, MessageSquare, Info, Headset, Star } from "lucide-react";
import axios from "axios";

export default function FinalInvoice() {
  const navigate = useNavigate();
  const location = useLocation();

  const [booking, setBooking] = useState(location.state?.task || null);
  const [loading, setLoading] = useState(!booking);

  

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://fixfy.liara.run/api/v1/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const currentId = location.state?.task?.id;
        const allBookings = response.data.data;

        const latestBooking = currentId
          ? allBookings.find(b => b.id === currentId)
          : allBookings[allBookings.length - 1];
        console.log("API response:", response.data);
        if (latestBooking) {
          setBooking(latestBooking);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [location.state?.task?.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black">Loading...</div>;
  if (!booking) return <div className="min-h-screen flex items-center justify-center font-black">No Data Found</div>;

  const technician = booking.technician || {};
  const hourlyRate = parseFloat(technician.hourly_rate || 0);
  const supportFee = 16.24;
  const totalPrice = parseFloat(booking.total_price || (hourlyRate + supportFee));
  console.log("Technician Image URL:", technician.profile_picture_url);


  return (
    <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100">

        {/* Header - No changes */}
        <div className="px-8 py-8 flex items-center justify-between bg-white relative">
          <button onClick={() => navigate("/mytask")} className="p-3 rounded-2xl hover:bg-gray-50 border border-gray-100 transition">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Final Invoice</h1>
          <div className="w-12"></div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white px-8">
          <button className="flex-1 py-4 text-lg font-black text-[#709500] border-b-4 border-[#709500] flex items-center justify-center gap-2">
            <Info size={20} /> Invoice Info
          </button>
          <button
            onClick={() => navigate('/chat', { state: { task: booking } })}
            className="flex-1 py-4 text-lg font-bold text-gray-300 hover:text-gray-600 flex items-center justify-center gap-2"
          >
            <MessageSquare size={20} /> Chat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

          {/* Left Side: Price Details */}
          <div className="p-8 lg:p-14 space-y-10 text-left">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Price Details</h2>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400 font-bold">
                  {technician.specialty || 'Service'} Rate
                </span>
                <span className="text-gray-900 font-black">${hourlyRate.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400 font-bold">Trust & Support Fee</span>
                <span className="text-gray-900 font-black">${supportFee.toFixed(2)}</span>
              </div>

              <div className="pt-8 border-t border-dashed border-gray-200">
                <h3 className="font-black text-gray-400 mb-6 uppercase text-[10px] tracking-[0.2em]">
                  Service Provider
                </h3>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {/* ✅ اصلاح آدرس تصویر: استفاده از فیلد append شده در مدل لاراول */}
                  <img
                    src={technician.profile_picture || 'https://via.placeholder.com/150'}
                    className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    alt="tech"
                  />
                  <div>
                    <p className="font-black text-gray-900">{technician.name || 'Tasker'}</p>
                    <p className="text-xs text-gray-400 font-bold">{technician.specialty || 'Expert'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Total & Status */}
          <div className="p-8 lg:p-14 bg-gray-50/30 flex flex-col justify-between text-left">
            <div>
              <div className="flex justify-between items-end mb-12">
                <span className="text-2xl font-black text-gray-900 tracking-tighter">Total Payable</span>
                <span className="text-5xl font-black text-[#709500] tracking-tighter">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-6 text-gray-400 font-bold leading-relaxed">
                <p className="text-lg">
                  Address: <span className="text-gray-900 font-black">{booking.address}</span>
                </p>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">Current Status</p>
                  <span className="px-4 py-1.5 bg-green-100 text-[#709500] rounded-full text-sm font-black uppercase">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-16 space-y-4">


              <button
                onClick={() => navigate("/Leavereview", { state: { task: booking } })}
                className="w-full bg-[#709500] text-white font-black py-5 rounded-2xl text-xl hover:bg-[#5d7c00] transition-all active:scale-95 shadow-xl shadow-green-100 flex items-center justify-center gap-3"
              >
                <Star size={24} fill="white" />
                Leave A Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}