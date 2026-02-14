import React, { useState } from "react";

const ScheduleModal = ({ onClose, taskerName, onContinue }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const timeSlots = ["9:00 AM", "11:00 AM", "1:30 PM", "3:00 PM", "5:30 PM", "7:00 PM"];

  const calendarDays = [
    ...Array(firstDay).fill(<div key={`empty-${Math.random()}`} />),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
      <div
        key={d}
        className={`text-center p-2.5 cursor-pointer rounded-xl font-bold transition-all ${
          selectedDay === d ? "bg-cyan-600 text-white shadow-lg" : "hover:bg-cyan-50 text-gray-700"
        }`}
        onClick={() => setSelectedDay(d)}
      >
        {d}
      </div>
    )),
  ];

  const changeMonth = (offset) => setCurrentDate(new Date(year, month + offset, 1));

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-[150] p-4" onClick={onClose}>
      <div className="bg-white rounded-[40px] p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-black text-center mb-6 text-gray-900">{taskerName}'s Schedule</h2>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full transition">&lt;</button>
            <h3 className="font-black text-cyan-600 uppercase tracking-widest text-xs">{monthName} {year}</h3>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full transition">&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-[10px] font-black text-center text-gray-300 uppercase mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">{calendarDays}</div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Available Times</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedTime === t
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-md"
                    : "bg-white text-gray-500 border-gray-100 hover:border-cyan-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onContinue({ date: `${year}-${month + 1}-${selectedDay}`, time: selectedTime })}
          className="w-full bg-cyan-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-100 hover:bg-cyan-700 transition active:scale-95"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
