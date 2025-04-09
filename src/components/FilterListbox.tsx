import React, { useState } from "react";
import "../styles/filterListbox.css";

const FilterListbox: React.FC = () => {
  const [filter, setFilter] = useState("today");

  const filters = ["today", "upcoming", "out-dated"];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">🎬 Filter Movies</h2>
      <div className="flex gap-4">
        {filters.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 rounded ${
              filter === item ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterListbox;
