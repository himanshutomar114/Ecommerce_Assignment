import React from "react";
import StarRating from "./StarRating";
import FilterToggle from "./FilterToggle";

const RatingFilter = ({ minRating, setMinRating }) => (
  <FilterToggle title="Minimum Rating">
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <label key={rating} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            checked={minRating === rating}
            onChange={() => setMinRating(rating)}
          />
          <StarRating rating={rating} />
        </label>
      ))}
    </div>
  </FilterToggle>
);

export default RatingFilter;
