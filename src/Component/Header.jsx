import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 w-full">
      <div className="container mx-auto max-w-screen-xl">
        {/* Location & Notification */}
        <div className="locationNotif flex justify-between items-center sm:px-10  px-4 py-3">
          <div className="location flex items-center gap-2">
            <img src="src/assets/Location icon.png" className="w-5 h-5" alt="location" />
            <p className="text-white text-sm sm:text-base md:text-lg">New York</p>
          </div>
          <img src="src/assets/Frame 1890165669.png" className="w-5 sm:w-5 md:w-5" alt="notification" />
        </div>

        {/* Search Bar */}
        <div className="searchbarwithtxt px-4 sm:px-10 mt-6 sm:mt-10 pb-9">
          <h2 className="text-white font-bold mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            I need help with
          </h2>
          <div className="seachbar flex items-center bg-white px-3 py-2 rounded-3xl w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
            <img src="src/assets/MagnifyingGlass.png" className="w-5 h-5 mr-2" alt="search" />
            <input
              type="search"
              name="search"
              placeholder="What do you need help with"
              className="w-full outline-none text-sm sm:text-base md:text-lg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;