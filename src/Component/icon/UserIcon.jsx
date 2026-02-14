// In src/components/icons/UserIcon.js

import React from 'react';

function UserIcon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      // I've used the exact size classes from your original code
      className={`w-6 sm:w-8 md:w-9 ${className}`} 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

export default UserIcon;
