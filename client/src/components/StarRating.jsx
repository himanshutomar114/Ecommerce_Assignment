import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, size = "w-4 h-4", interactive = false, onRate }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} transition-all duration-200 cursor-${interactive ? "pointer" : "default"} ${
            i < Math.floor(interactive && hoveredStar > 0 ? hoveredStar : rating)
              ? "text-yellow-400 fill-current transform scale-110"
              : "text-gray-300 hover:text-yellow-300"
          }`}
          onMouseEnter={() => interactive && setHoveredStar(i + 1)}
          onMouseLeave={() => interactive && setHoveredStar(0)}
          onClick={() => interactive && onRate && onRate(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
