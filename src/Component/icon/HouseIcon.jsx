// فایل: /components/icons/HouseIcon.js

import React from 'react';

// ما className را به عنوان prop دریافت می‌کنیم
function HouseIcon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      // این className به SVG اعمال می‌شود و رنگ آن را تعیین می‌کند
      className={`w-6 sm:w-8 md:w-9 ${className}`} 
      viewBox="0 0 24 24" 
      // نکته: fill="currentColor" باعث می‌شود رنگ SVG از روی رنگ متن (text color) خوانده شود
      fill="currentColor" 
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
    </svg>
  );
}

export default HouseIcon;
