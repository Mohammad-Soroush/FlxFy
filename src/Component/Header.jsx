import React, { useState } from "react";
import SearchModal from "./SearchModal";
import { LocationIcon, Frame,MagnifyingGlass } from "../assetsJS";
function Header({ location }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="bg-blue-600 w-full pb-8">
      <div className="container mx-auto max-w-screen-xl">
        {/* Location & Notification */}
        <div className="flex justify-between items-center sm:px-10 px-4 py-3 mb-3">
          <div className="flex items-center gap-2">
            <img src={LocationIcon} className="w-5 h-5" alt="location" />
            <p className="text-white text-sm sm:text-base md:text-lg">
              {location[0].name}
            </p>
          </div>
          <img src={Frame} className="w-6 sm:w-5 md:w-6" alt="notification" />
        
        </div>
        <h2 className="text-3xl font-bold  ml-5 sm:ml-10 md:ml-10 mb-12 text-amber-50">I need help with</h2>

        {/* Search bar trigger */}
        
        <div
          className="flex items-center bg-white px-4 py-3 rounded-3xl w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 mx-4 sm:mx-10 cursor-pointer"
           onClick={() => setIsModalOpen(true)} 
        >
          <img
            src={MagnifyingGlass}
            className="w-5 h-5 mr-3 cursor-pointer"
            alt="search"
          />
          <input
            type="text"
            placeholder="What do you need help with"
            className="w-full text-sm sm:text-base md:text-lg outline-none bg-transparent pointer-events-none"
            readOnly
          />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default Header;
