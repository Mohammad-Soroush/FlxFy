import React from 'react';

function Promo() {
  return (
    <div className="promot flex flex-row-reverse sm:flex-row-reverse bg-cyan-50 items-center rounded-2xl p-4 sm:p-6 gap-9 sm:gap-10 md:gap-18">
      <img src="/assets/Banner image.png" className="w-6/12 md:w-6/12 rounded-lg max-w-full h-auto" alt="promo" />
      <div className="promottext text-center sm:text-left md:text-left lg:text-left">
        <div className="off mb-4">
          <h1 className="text-blue-600 text-xl sm:text-3xl md:text-3xl lg:text-7xl font-bold">20% OFF</h1>
          <p className="text-blue-600 text-sm sm:text-base md:text-xl lg:text-5xl">For this seasonal</p>
        </div>
        <div className="OFFcode flex justify-center sm:justify-start md:justify-start lg:justify-start items-center gap-1">
          <img src="/assets/Gift icon.png" className="w-5 h-5 lg:w-15 lg:h-12" alt="gift" />
          <p className="text-xs sm:text-sm md:text-base lg:text-4xl">
            CODE: <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-4xl">FIXEN</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Promo;