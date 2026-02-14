import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchModal from "../modals/SearchModal";
import { MagnifyingGlass } from "../../assetsJS";
import { MapPin, Bell } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCity, setUserCity] = useState(null);
  
  // 1. State to check if there are unread notifications
  // Set to 'true' by default to show the dot initially
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const city = Cookies.get("userCity");
    if (city) {
      setUserCity(city);
    }
  }, []);

  const handleLocationClick = () => {
    if (userCity) {
      navigate("/onboarding/5");
    } else {
      navigate("/onboarding/5");
    }
  };

  // 2. Modified click handler to clear the dot when opened
  const toggleNotifications = () => {
    setShowNotification(!showNotification);
    if (!showNotification) {
      setHasNotifications(false); // Remove the red dot when menu opens
    }
  };

  return (
    <header className="bg-blue-600 w-full pb-8">
      <div className="container mx-auto max-w-screen-xl">
        {/* Location & Notification */}
        <div className="flex justify-between items-center sm:px-10 px-4 py-3 mb-3">
          <div
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition"
            onClick={handleLocationClick}
          >
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            {userCity && (
              <p className="text-white text-sm sm:text-base md:text-lg">
                {userCity}
              </p>
            )}
          </div>

          {/* Notification Icon with Dropdown */}
          <div className="relative">
            <Bell 
              className="w-6 sm:w-5 md:w-6 text-white cursor-pointer active:scale-90 transition" 
              onClick={toggleNotifications}
            />
            
            {/* 3. Conditional Red dot indicator */}
            {hasNotifications && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-600"></span>
            )}

            {/* Little Notification Tooltip/Dropdown */}
            {showNotification && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                <p className="px-4 py-2 text-xs text-gray-500 border-b">Notifications</p>
                <div className="px-4 py-3 text-sm text-gray-700">
                  {/* You can change this text based on hasNotifications if you like */}
                  No new notifications
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold ml-5 sm:ml-10 md:ml-10 mb-12 text-amber-50">
          I need help with
        </h2>

        {/* Search bar trigger */}
        <div
          className="flex items-center bg-white px-4 py-3 rounded-3xl w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 mx-4 sm:mx-10 cursor-pointer shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={MagnifyingGlass}
            className="w-5 h-5 mr-3"
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