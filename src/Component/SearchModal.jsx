import React, { useEffect, useState } from "react";
import Data from "../data/data";

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setTimeout(() => setShow(true), 500)
    }
    else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;
  const filteredCategories = Data.categories.filter((cat) => {
    return cat.name.toLowerCase().includes(query.toLocaleLowerCase());
  })
  return (
    <div className={`fixed inset-0 bg-opacity-40 flex justify-center items-start  z-50 transition-opacity duration-500 ${show ? "opacity-100 " : "opacity-0"} `}>
      <div className={`bg-white w-full h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full rounded-none shadow-none p-5  transform transition-transform duration-500 ${show ? 'scale-100' : 'scale-95'}`}>

        <h2 className="text-xl font-bold text-blue-600 mb-4">Search</h2>

        {/* Input */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-3">
          <img
            src="src/assets/MagnifyingGlass.png"
            className="w-5 h-5 mr-3 cursor-pointer"
            alt="search"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a service..."
            className="w-full outline-none text-gray-700"
            autoFocus
          />
          <button
            className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-full overflow-y-auto">
          {query.length > 0 ? (
            filteredCategories.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 py-2  bg-gray-50 mb-4  transition  hover:shadow-xl  hover:bg-gray-100 px-2 rounded-lg cursor-pointer"
              >
                <div key={i} className="imageandword flex  gap-3  items-center ">
                  <img src={cat.icon} className="w-6 h-6" alt={cat.name} />
                  <p className="text-gray-700">{cat.name}</p>
                </div>
                <p className="text-gray-500">{cat.description}</p>

              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm px-2">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
