import React, { useState } from "react";

const ReadMore = ({ text = "", maxLength = 120 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxLength;
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength) + "...";

  return (
    <div className="cursor-pointer">
      <p className="text-gray-600 mt-2 leading-relaxed">{displayText || "No description provided."}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-cyan-600 font-semibold mt-1 inline-block hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
