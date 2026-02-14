import React from "react";

const SortReviewsModal = ({ onClose, onSort }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-end z-[110]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-[40px] p-8 md:w-[500px] shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900">Sort Reviews</h3>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400">&times;</button>
        </div>
        <ul className="space-y-3">
          {["Latest", "Highest Rated", "Lowest Rated", "Most Detailed"].map(option => (
            <li
              key={option}
              className="py-4 text-center text-lg font-bold border border-gray-50 cursor-pointer hover:bg-cyan-50 hover:text-cyan-600 rounded-2xl transition-all"
              onClick={() => { onSort(option); onClose(); }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortReviewsModal;
