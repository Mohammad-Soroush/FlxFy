import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex text-sm cursor-pointer">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${i < rating ? "fill-green-500 text-green-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
