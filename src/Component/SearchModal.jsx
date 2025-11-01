import React, { useEffect, useState, useTransition } from "react";
import Data from "../data/data";
import { MagnifyingGlass } from "../assetsJS";
function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isPending, startTransiTion] = useTransition();
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
    return query.toLowerCase().split(' ').every(qWord => cat.name.toLowerCase().split(' ').some(nWord => nWord.startsWith(qWord)));
  })
  return (
    <div className={`fixed inset-0 bg-opacity-40 flex justify-center items-start  z-50 transition-opacity duration-500 ${show ? "opacity-100 " : "opacity-0"} `}>
      <div className={`bg-white w-full h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full rounded-none shadow-none p-5  transform transition-transform duration-500 ${show ? 'scale-100' : 'scale-95'}`}>

        {/* Input */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-3 sm:px-5 sm:py-3">
          <img
            src={MagnifyingGlass}
            className="w-5 h-5 mr-3 sm:w-8 sm:h-8 cursor-pointer"
            alt="search"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a service..."
            className="w-full outline-none text-gray-700 text-md sm:text-xl md:text-2xl"
            autoFocus
          />
          <button
            className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer sm:w-10 h-10"
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
                className="flex gap-3 py-2  bg-gray-50 mb-4  transition  hover:shadow-xl  hover:bg-gray-100 px-2 rounded-lg cursor-pointer"
              >
                <div key={i} className="imageandword flex  gap-3  items-center ">
                  <img src={cat.icon} className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-17" alt={cat.name} />
                </div>
                <div>
                  <p className="text-gray-700 text-sm sm:text-lg md:text-xl">{cat.name}</p>
                  <p className="text-gray-500 text-sm sm:text-lg ">{cat.description}</p>
                </div>


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
