import React from 'react';
import { Vector, Baker, Fixer, } from '../contast';
function Categories() {
  return (
    <div className="categories mt-10 mb-72">
      <h1 className="font-bold text-2xl sm:text-3xl mb-5 ml-2">Categories</h1>

      <div className="itemcategories grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Home repairs</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Baker} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Baking</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Fixer} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Fixing</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Repairs</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Plumbing</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Electric</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Carpentry</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Painting</p>
        </div>
        <div className="Homerepairs bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <img src={Vector} alt="" className="w-12 mx-auto mb-2 max-w-full h-auto" />
          <p>Painting</p>
        </div>
      </div>
    </div>
  );
}

export default Categories;  