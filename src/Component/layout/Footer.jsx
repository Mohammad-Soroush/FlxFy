// In /components/Footer.js

import React from 'react';
// 1. Import hooks from react-router-dom
import { useNavigate, useLocation } from 'react-router-dom';

// Import your icon components
// import HouseIcon from './icons/HouseIcon';
// import TodolistIcon from './icons/TodolistIcon';
// import UserIcon from './icons/UserIcon';
import HouseIcon from '../icon/HouseIcon';
import TodolistIcon from '../icon/TodolistIcon';
import UserIcon from '../icon/UserIcon';
function Footer() {
  // 2. Get the navigate function and location object
  const navigate = useNavigate();
  const location = useLocation();

  // 3. Determine the active button based on the current URL path
  //    No more useState! The URL is now the "source of truth".
  const activeButton = location.pathname;

  const activeClasses = "bg-blue-700 p-4 sm:p-5 rounded-full hover:bg-blue-600 active:bg-blue-400 transition duration-200";
  const inactiveClasses = "p-4";

  return (
    <footer className="fixed bottom-4 mb-3 left-0 w-full bg-white border border-blue-500 rounded-full sm:rounded-2xl md:rounded-2xl lg:rounded-2xl py-3">
      <div className="container mx-auto max-w-screen-xl">
        <div className="footercollec flex justify-around items-center">
          
          <button
            // 4. Use navigate() in the onClick handler
            onClick={() => navigate('/home')}
            // 5. Check against the path to set the style
            className={activeButton === '/home' ? activeClasses : inactiveClasses}
          >
            <HouseIcon 
              className={activeButton === '/home' ? 'text-white cursor-pointer' : 'text-blue-700 cursor-pointer'} 
            />
          </button>
          
          <button
            onClick={() => navigate('/mytask')} // Assuming a /todolist page exists
            className={activeButton === '/mytask' ? activeClasses : inactiveClasses}
          >
            <TodolistIcon 
              className={activeButton === '/mytask' ? 'text-white cursor-pointer' : 'text-blue-700 cursor-pointer'} 
            />
          </button>

          <button
            // This now navigates to the /profile page!
            onClick={() => navigate('/profile')}
            className={activeButton === '/profile' ? activeClasses.replace('p-4', 'p-3') : "p-3"}
          >
            <UserIcon 
              className={activeButton === '/profile' ? 'text-white cursor-pointer' : 'text-blue-700 cursor-pointer'} 
            />
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
