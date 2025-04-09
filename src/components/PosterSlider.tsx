import React, { useState } from "react";
import "../styles/posterSlider.css";

const PosterSlider: React.FC = () => {
    const posters = ["poster1.png", "poster2.png", "poster3.png", "poster4.png"];
  
    return (
      <div className="overflow-x-auto whitespace-nowrap py-4">
        {posters.map((src, index) => (
          <img
            key={index}
            src={`/assets/${src}`}
            alt={`Movie Poster ${index + 1}`}
            className="inline-block h-60 w-auto mx-2 rounded shadow"
          />
        ))}
      </div>
    );
  };
  
  export default PosterSlider;
  