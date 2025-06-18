import { useState } from "react";

const DualRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(50000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const min = 50000;
  const max = 10000000;

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  const minPercent = getPercent(minPrice);
  const maxPercent = getPercent(maxPrice);

  return (
    <div className="relative w-full mx-auto z-50">
      {/* Slider Track Background */}
      <div className="relative h-2 rounded bg-[#00a256]">
        {/* Active Range Color */}
        <div
          className="absolute h-2 bg-[#00a256] rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
      </div>

      {/* Range Inputs */}
      <input
        type="range"
        min={min}
        max={max}
        step="10000"
        value={minPrice}
        onChange={(e) =>
          setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 10000))
        }
        className="absolute top-0 h-2 w-full appearance-none pointer-events-none "
        style={{ zIndex: minPrice > max - 100000 ? 5 : 3 }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step="10000"
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 10000))
        }
        className="absolute top-0 h-2 w-full appearance-none pointer-events-none"
        style={{ zIndex: 4 }}
      />

      {/* Thumbs via Tailwind in index.css */}
      <style>
        {`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #00a256;
          cursor: pointer;
          pointer-events: all;
          margin-top: -8px;
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #00a256;
          cursor: pointer;
          pointer-events: all;
          border: 2px solid white;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          background: transparent;
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
        }
      `}
      </style>

      {/* Price display (optional) */}
      <div className="flex justify-between mt-3 text-sm text-gray-700">
        <span>₦{minPrice.toLocaleString()}</span>
        <span>₦{maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
