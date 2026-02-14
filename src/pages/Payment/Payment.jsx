import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const API_BASE_URL = "https://fixfy.liara.run/api/v1";

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("zarinpal");
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // استخراج اطلاعات رزرو ارسالی از صفحه قبل
  const { tasker, booking_id } = location.state || {};
  const hourlyRate = parseFloat(tasker?.hourly_rate || 0);
  const supportFee = 16.24;
  const totalPrice = hourlyRate + supportFee;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const refId = params.get("ref_id");

    // سناریو ۱: بازگشت موفقیت‌آمیز از درگاه بانک
    if (status === "success" && refId) {
      setReferenceId(refId);
      setShowSuccessModal(true);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    // سناریو ۲: بازگشت ناموفق از درگاه بانک
    if (status === "failed") {
      setErrorMessage("The transaction was not successful. Please try again.");
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    // سناریو ۳: ورود مستقیم به صفحه بدون دیتا (برگشت به عقب)
    if (!location.state && !status) {
      navigate(-1);
    }
  }, [location, navigate]);

  const handleFinalPayment = async () => {
    if (!selectedMethod || loading) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Authentication required.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      console.log("TOKEN:", token);
      // درخواست لینک درگاه پرداخت از بک‌اِند
      const response = await axios.post(`${API_BASE_URL}/payment/pay`, {
        params: { 
          gateway: selectedMethod,
          booking_id: booking_id,
          amount: totalPrice
        },
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });

      if (response.data.action) {
        // هدایت کاربر به صفحه بانک
        window.location.href = response.data.action;
      } else {
        throw new Error("Could not generate payment link.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Gateway connection error.");
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-50  font-sans text-slate-900 p-4 md:p-8 flex justify-center items-start relative">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-10 p-3 rounded-full bg-white shadow-md text-slate-600 hover:text-blue-600 transition-all active:scale-90"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-6xl grid grid-cols-1  lg:grid-cols-3 gap-8 mt-40 md:mt-40">
        
        {/* Left: Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <header>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Checkout</h2>
            <p className="text-slate-500 mt-2">Choose your payment gateway to complete the booking.</p>
          </header>

          {errorMessage && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl animate-shake">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PaymentOption
              title="ZarinPal"
              subtitle="Shetab Cards (IRT)"
              icon="💳"
              selected={selectedMethod === "zarinpal"}
              onSelect={() => setSelectedMethod("zarinpal")}
            />
            <PaymentOption
              title="PayPal"
              subtitle="International (USD)"
              icon="🌎"
              selected={selectedMethod === "paypal"}
              onSelect={() => setSelectedMethod("paypal")}
            />
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-8">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-slate-50">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Tasker</span>
                <span className="font-semibold text-slate-800">{tasker?.name || "Professional"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Hourly Rate</span>
                <span className="font-semibold text-slate-800">${hourlyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Support Fee</span>
                <span className="font-semibold text-slate-800">${supportFee.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total Price</span>
                <span className="text-2xl font-black text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinalPayment}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                loading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                "Pay and Confirm"
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-md text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Success!</h2>
            <p className="text-slate-500 mb-8">Your booking is confirmed. Our tasker will contact you soon.</p>
            
            <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-1">Reference ID</p>
              <p className="text-xl font-mono font-bold text-blue-600">{referenceId}</p>
            </div>

            <button
              onClick={() => navigate("/mytask")}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
            >
              View My Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



function PaymentOption({ title, subtitle, icon, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative p-6 border-2 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${
        selected
          ? "border-blue-600 bg-white shadow-xl shadow-blue-50"
          : "border-slate-100 bg-white hover:border-slate-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-4xl">{icon}</span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? "border-blue-600 bg-blue-600" : "border-slate-200"}`}>
          {selected && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
      <h4 className="font-bold text-xl text-slate-900">{title}</h4>
      <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}

export default Payment;