import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileText, MoreVertical, ChevronLeft, MessageSquare, Info, CheckCircle2 } from "lucide-react";

// --- ACTION SHEET ---
const ActionSheet = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 md:p-6 text-left">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-full md:max-w-[420px] bg-white rounded-t-[32px] md:rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-200 md:hidden" />
        <button onClick={onClose} className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div className="flex flex-col items-center space-y-1 py-4">
          <button className="w-full py-4 text-xl font-semibold text-gray-800 hover:bg-gray-50 rounded-2xl px-4 text-left">Reschedule</button>
          <div className="h-[1px] w-full bg-gray-100" />
          <button className="w-full py-4 text-xl font-semibold text-red-600 hover:bg-red-50 rounded-2xl px-4 text-left">Cancel this task</button>
        </div>
      </div>
    </div>
  );
};

// --- PRICE DETAILS ---
const PriceDetails = ({ taskData, onConfirm, loading, navigate }) => {
  const isFinalized = taskData?.status?.toLowerCase() === "finalinvoice";
  const hourlyRate = parseFloat(taskData?.hourly_rate || 0);
  const total = parseFloat(taskData?.total_price || 0);

  return (
    <div className="mt-10 md:mt-0 space-y-6 bg-gray-50 md:bg-white md:border md:border-gray-200 p-6 md:p-8 rounded-3xl sticky top-10 text-left shadow-sm">
      <h3 className="text-xl font-black text-gray-800 tracking-tight">Price Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-500 font-bold">
          <span>Service Rate</span>
          <span className="text-gray-900">${hourlyRate.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500 font-bold">
          <span>Trust & Support Fee</span>
          <span className="text-gray-900">$16.24</span>
        </div>
        <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
          <span className="text-gray-900 font-black text-xl">Total Due</span>
          <span className="text-[#709500] font-black text-3xl">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {!isFinalized ? (
        <button 
          onClick={onConfirm} 
          disabled={loading}
          className={`w-full text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 flex justify-center items-center gap-3 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#709500] hover:bg-[#5d7c00] shadow-green-100"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle2 size={22} />
              Confirm Completion
            </>
          )}
        </button>
      ) : (
        <button 
          onClick={() => navigate("/payment", { state: { task: taskData } })}
          className="w-full bg-white text-[#709500] py-5 rounded-2xl font-black text-lg text-center border-2 border-[#709500] hover:bg-green-50 transition-all flex items-center justify-center gap-3"
        >
          <FileText size={22} />
          See Invoice
        </button>
      )}
      <p className="text-[10px] text-gray-400 font-medium text-center leading-relaxed">
        By confirming, you agree that the service has been completed to your satisfaction.
      </p>
    </div>
  );
};

// --- MAIN PAGE ---
const TaskInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState(location.state?.task);

  if (!currentTask) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-gray-400 font-bold">Task data missing!</p>
        <button onClick={() => navigate("/mytasks")} className="text-[#709500] font-black underline">Go back to My Tasks</button>
      </div>
    );
  }

  const handleConfirmTask = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://fixfy.liara.run/api/v1/bookings/${currentTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "FinalInvoice" }),
      });

      if (response.ok) {
        // پس از آپدیت موفق در دیتابیس، کاربر را به صفحه تسک‌ها می‌فرستیم
        navigate("/mytask", { replace: true });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-0 md:p-6">
      <div className="w-full max-w-6xl bg-white min-h-screen md:min-h-0 md:rounded-[48px] shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* Navigation Header */}
        <header className="px-8 py-8 flex items-center justify-between bg-white">
          <button onClick={() => navigate(-1)} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors border border-gray-100">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Review & Confirm</h1>
          <button onClick={() => setIsMenuOpen(true)} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors">
            <MoreVertical size={24} className="text-gray-400" />
          </button>
        </header>

        {/* Tab Selector */}
        <div className="flex bg-white px-8">
          <div className="flex gap-8 border-b border-gray-100 w-full">
            <button className="py-4 text-lg font-black text-[#709500] border-b-4 border-[#709500] flex items-center gap-2">
              <Info size={18} /> Details
            </button>
            <button 
              onClick={() => navigate('/chat', { state: { receiverId: currentTask.technician_id } })} 
              className="py-4 text-lg font-bold text-gray-300 hover:text-gray-500 transition-colors flex items-center gap-2"
            >
              <MessageSquare size={18} /> Chat
            </button>
          </div>
        </div>

        <main className="p-8 md:p-16 md:grid md:grid-cols-3 md:gap-16 items-start text-left">
          <div className="md:col-span-2 space-y-12">
            {/* Technician Profile Card */}
            <div className="flex items-center gap-6 p-2">
              <div className="relative">
                <img 
                  src={currentTask.avatar} 
                  alt={currentTask.techName} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] object-cover bg-gray-50 shadow-lg border-4 border-white" 
                />
                <div className="absolute -bottom-2 -right-2 bg-[#709500] p-2 rounded-xl text-white shadow-lg">
                  <CheckCircle2 size={16} />
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">{currentTask.techName}</h2>
                <div className="flex items-center gap-2 mt-2">
                   <span className="bg-green-50 text-[#709500] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Verified Expert</span>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-gray-900">{currentTask.specialty}</h3>
              <div className="grid grid-cols-1 gap-1">
                {[
                  ["Appointment Date", currentTask.date],
                  ["Service Time", currentTask.time],
                  ["Current Status", currentTask.status],
                  ["Service Address", currentTask.address || "Client Location"]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-6 border-b border-gray-50 items-center">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{label}</span>
                    <span className={`font-black text-lg ${label.includes("Status") ? "text-[#2D6A9F]" : "text-gray-900"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Component */}
          <PriceDetails 
            taskData={currentTask} 
            onConfirm={handleConfirmTask} 
            loading={loading} 
            navigate={navigate} 
          />
        </main>

        <ActionSheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </div>
  );
};

export default TaskInformation;