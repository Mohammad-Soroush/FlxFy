import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Loader2, Wrench } from "lucide-react";
import Footer from "@components/layout/Footer";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "@context/AuthContext";
import Loading from "@components/ui/Loading";

export default function MyTasks() {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading } = useAuth();
 
  //-----------Auth Check---------
  if (!authUser && !authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please log in to view your tasks
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
        <Footer/>
      </div>
    );
  }
  // ---------------- STATE ----------------
  const [activeTab, setActiveTab] = useState("Current");
  const [isTechnician, setIsTechnician] = useState(false);

  // ---------------- Role Check ----------------
  useEffect(() => {
    if (!authLoading && authUser) {
      setIsTechnician(authUser.role === "technician");
    }
  }, [authLoading, authUser]);

  // ---------------- Fetch Bookings ----------------
  const { data: bookingsData = [], loading: loadingBookings } = useFetchData({
    endpoint: "https://fixfy.liara.run/api/v1/bookings",
    auth: true,
  });

  // ---------------- Normalize Tasks ----------------
  const tasks = bookingsData.map((task) => {
    const tech = task.technician || {};
    const customer = task.customer || {};
    const dateObj = task.scheduled_time ? new Date(task.scheduled_time) : null;

    return {
      ...task,
      techName: tech.name || "Technician",
      specialty: tech.specialty || task.service_name || "Professional Tasker",
      avatar:
        tech.profile_picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(tech.name || "T")}`,
      customerAvatar:
        customer.profile_picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || "C")}`,
      date:
        dateObj && !isNaN(dateObj)
          ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "N/A",
      time:
        dateObj && !isNaN(dateObj)
          ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "N/A",
    };
  });

  const normalizeStatus = (status) =>
    status?.replace(/\s+/g, "").toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const s = normalizeStatus(task.status);
    return activeTab === "Current"
      ? ["booked", "finalinvoice"].includes(s)
      : ["taskcompleted", "canceled", "cancelled"].includes(s);
  });

  const getStatusConfig = (status) => {
    const s = normalizeStatus(status);
    switch (s) {
      case "booked":
      case "finalinvoice":
        return { label: s === "finalinvoice" ? "Final Invoice" : "Booked", bg: "bg-green-500" };
      case "taskcompleted":
        return { label: "Completed", bg: "bg-green-500" };
      case "canceled":
      case "cancelled":
        return { label: "Canceled", bg: "bg-gray-400 text-gray-600" };
      default:
        return { label: status, bg: "bg-gray-200 text-gray-600" };
    }
  };

  const isLoading = authLoading || loadingBookings;

  // ---------------- UI ----------------
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 mb-2 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white min-h-screen shadow-sm flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-center">
          <h1 className="text-xl font-bold">My Tasks</h1>
        </header>

        {/* Tabs OR Technician Buttons */}
        <div className="px-6 mb-4 mt-10">
          {isTechnician ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/technicalprofile")}
                className="w-full py-3 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 transition"
              >
                Create Task
              </button>
              <button
                onClick={() => navigate("/technicalprofile")}
                className="w-full py-3 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                My Profile
              </button>
            </div>
          ) : (
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              {["Current", "Past"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-xl font-bold ${activeTab === tab ? "bg-white shadow" : "text-gray-400"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tasks */}
        <main className="flex-grow px-6 pb-24">
          {filteredTasks.length ? (
            filteredTasks.map((task) => {
              const config = getStatusConfig(task.status);
              const isInvoice = normalizeStatus(task.status) === "finalinvoice";

              return (
                <div key={task.id} className="mb-4 bg-white border rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full text-white ${config.bg}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-400 flex gap-1 items-center">
                      <Calendar size={12} /> {task.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={task.avatar}
                      alt={task.techName}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-black">{task.specialty}</h3>
                      <p className="text-sm text-gray-500">{task.techName}</p>
                    </div>

                    <div className="text-right text-sm text-gray-500">
                      <div className="flex gap-1 items-center justify-end">
                        <Clock size={12} /> {task.time}
                      </div>
                      <p className="font-black text-gray-900">
                        ${task.total_price || "0.00"}
                      </p>
                    </div>
                  </div>

                  {normalizeStatus(task.status) !== "taskcompleted" && (
                    <button
                      onClick={() =>
                        navigate(isInvoice ? "/finalinvoice" : "/taskpage", {
                          state: { task },
                        })
                      }
                      className={`w-full mt-4 py-3 rounded-2xl font-bold ${isInvoice ? "bg-green-500 text-white" : "bg-black text-white"
                        }`}
                    >
                      {isInvoice ? "Final Invoice" : "Task Details"}
                    </button>
                  )}
                  {normalizeStatus(task.status) === "taskcompleted" && (
                    <button
                      disabled
                      className="w-full mt-4 py-3 rounded-2xl font-bold bg-gray-400 text-white cursor-not-allowed"
                    >
                      Task Completed
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            !isTechnician && (
              <div className="flex flex-col items-center py-32 opacity-30">
                <Wrench size={64} />
                <p>No Tasks</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
