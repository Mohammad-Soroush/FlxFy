import React from 'react';
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight, ClipboardList, Calendar } from "lucide-react";
import { ClipboardText, CalendarDots } from '../../assetsJS';
import { useUserContext } from '../../userContext/Usercontext';

function Tasks({ taskData, dbData }) {
  if (!taskData || taskData.status === "TaskCompleted" || taskData.status === "canceled") return null;
  const taskName = taskData.tasker?.specialty || "Task Session";

  const isConfirmed = taskData.status === "finalInvoice";
  const isUpcoming = taskData.status === "Booked";

  const navigatebum = useNavigate(); 
  return (
    <div
      className={`bg-white shadow-md border-l-4 py-8 px-6 sm:px-10 rounded-2xl mt-6 cursor-pointer ${isConfirmed ? "border-[#73a32a]" : "border-blue-500"
        }`}
      onClick={() => navigate("/mytask", { state: taskData })}
    >
      <div className="flex gap-3 items-center mb-4">
        {isConfirmed ? (
          <>
            <ClipboardList className="w-6 h-6 text-[#73a32a]" strokeWidth={2.5} />
            <h2 className="text-[#73a32a] text-lg sm:text-xl font-bold tracking-tight">
              Final Invoice
            </h2>
          </>
        ) : (
          <>
            <img className="w-5 h-6" src={ClipboardText} alt="Task Icon" />
            <h2 className="text-blue-600 text-lg sm:text-xl font-bold tracking-tight">
              Upcoming Task
            </h2>
          </>
        )}
      </div>

      <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 capitalize">
        {taskName}
      </p>

      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
          <div className={`flex gap-2 items-center px-4 py-2 rounded-xl border ${isConfirmed ? "bg-green-50 text-green-900 border-green-100" : "bg-blue-50 text-blue-900 border-blue-100"
            }`}>
            <img className="w-4 h-4" src={CalendarDots} alt="Date" />
            <p className="text-sm sm:text-base font-bold">{taskData.schedule?.date}</p>
          </div>

          {isUpcoming && (
            <div className="flex items-center gap-2 text-blue-900 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
              <Clock className="w-4 h-4 text-blue-500" />
              <p className="text-sm sm:text-base font-bold">{taskData.schedule?.time}</p>
            </div>
          )}
        </div>

        {/* دکمه جزئیات / View Invoice */}
        <button
          className={`flex items-center gap-1 group px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider ${isConfirmed ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-500"
            }`}
          onClick={() => navigatebum("/mytask")}
        >
          {isConfirmed ? "View Invoice" : "Details"}
          <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
}

export default Tasks