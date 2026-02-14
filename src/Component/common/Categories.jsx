import React from "react";
import { useNavigate } from "react-router-dom";
import { Vector, Baker, Fixer } from "@assetsJS";
  
function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryText) => {
    // Navigate to /taskerlist, optionally you can pass the category text if needed
    navigate("/taskerlist", { state: { category: categoryText } });
  };

  return (
    <div className="categories mt-10 mb-72">
      <h1 className="font-bold text-2xl sm:text-3xl mb-5 ml-2">Categories</h1>

      <div className="itemcategories grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {[
          { img: Baker, text: "Home repairs" },
          { img: Baker, text: "Baking" },
          { img: Fixer, text: "Fixing" },
          { img: Baker, text: "Repairs" },
          { img: Baker, text: "Plumbing" },
          { img: Baker, text: "Electric" },
          { img: Baker, text: "Carpentry" },
          { img: Baker, text: "Painting" },
          { img: Baker, text: "Painting" },
          { img: Baker, text: "Home repairs" },
          { img: Baker, text: "Baking" },
          { img: Fixer, text: "Fixing" },
          { img: Baker, text: "Repairs" },
          { img: Baker, text: "Plumbing" },
          { img: Baker, text: "Electric" },
          { img: Baker, text: "Carpentry" },
          { img: Baker, text: "Painting" },
          { img: Baker, text: "Painting" },
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCategoryClick(item.text)}
            className="Homerepairs bg-white p-3 sm:p-4 rounded-xl text-center shadow-md transition-transform duration-200 transform active:scale-95 focus-within:shadow-lg hover:shadow-lg cursor-pointer group"
          >
            <img
              src={item.img}
              alt={item.text}
              className="w-10 sm:w-12 md:w-14 mx-auto mb-1 sm:mb-2 max-w-full h-auto transition-transform duration-200 group-hover:scale-110"
            />
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 group-hover:text-blue-500 transition-colors">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
