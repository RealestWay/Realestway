import { useState } from "react";
import { UseHouses } from "../contexts/HouseContext";
import { SearchNormal1 } from "iconsax-reactjs";

const Filter = () => {
  const { filter, setFilter } = UseHouses();
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(50000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [propertyType, setPropertyType] = useState("");
  const [condition, setCondition] = useState("New");
  const [rentDuration, setRentDuration] = useState("12 months");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilter = () => {
    setFilter({
      ...filter,
      location: location || null,
      minBudget: minPrice,
      maxBudget: maxPrice,
      propertyType: propertyType || null,
      condition,
      rentDuration,
      bedrooms,
      bathrooms,
    });
  };

  const clearFilter = () => {
    setLocation("");
    setMinPrice(50000);
    setMaxPrice(1000000);
    setPropertyType("");
    setCondition("New");
    setRentDuration("12 months");
    setBedrooms("1");
    setBathrooms("1");
    setFilter({});
  };

  return (
    <div className="md:w-5/6 w-[98%] m-auto p-4 flex flex-col gap-3 mt-3">
      {/* Top Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search location..."
          className="w-[80%] p-3 rounded-2xl border border-gray-300 focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-green-600 w-[18%] justify-center text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          <SearchNormal1 size={18} />{" "}
          <span className="hidden md:inline">Search</span>
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-lg shadow-md bg-white text-sm flex flex-col p-2 gap-5 md:gap-2 items-center mb-4">
        <span className="w-full flex justify-between md:block md:text-left">
          <span>Filters</span>{" "}
          {/* Toggle Button for Advanced Filter on small screens */}
          <div className="md:hidden w-full text-right mt-2">
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              {showAdvanced ? "Hide Advanced Filter" : "Advanced Filter"}
            </button>
          </div>
        </span>
        <div className="w-full flex flex-col gap-5 md:flex-row justify-between items-center">
          <div className="flex flex-col w-full md:w-[24%]">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="p-2 border rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full md:w-[24%]">
            <label>Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Select Property Type</option>
              <option>Self Contain</option>
              <option>Office</option>
              <option>1 Bedroom Apartment</option>
              <option>2 Bedroom Apartment</option>
              <option>3 Bedroom Apartment</option>
              <option>4 Bedroom Apartment</option>
              <option>Boysquarter</option>
              <option>Duplex</option>
            </select>
          </div>
          {/* Price Range Slider */}
          <div className="col-span-2 flex flex-col gap-2 w-full md:w-[48%]">
            <label className="text-sm font-medium">Price (₦):</label>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="10000"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="custom-range w-full md:w-[30%] md:hidden inline"
            />
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={minPrice}
                min={0}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="p-2 border rounded-md w-full md:w-[30%]"
              />
              <input
                type="range"
                min="50000"
                max="10000000"
                step="10000"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="custom-range w-full md:w-[30%] hidden md:inline"
              />
              <input
                type="number"
                value={maxPrice}
                max={10000000}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="p-2 border rounded-md w-full md:w-[35%]"
              />
            </div>
          </div>
        </div>

        {/* Advanced Filters - hidden on mobile unless toggled */}
        <div className="w-full grid grid-cols-2 gap-5 md:gap-3 md:flex justify-between items-center ">
          <div
            className={`${
              showAdvanced ? "block" : "hidden"
            } md:flex flex flex-col w-full md:w-[16.5%]`}
          >
            <label>Conditions</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="p-3 border rounded-md"
            >
              <option>New</option>
              <option>Old</option>
            </select>
          </div>
          <div
            className={`${
              showAdvanced ? "block" : "hidden"
            } md:flex flex flex-col w-full md:w-[16.5%]`}
          >
            <label>Rent duration</label>
            <select
              value={rentDuration}
              onChange={(e) => setRentDuration(e.target.value)}
              className="p-3 border rounded-md"
            >
              <option>12 months</option>
              <option>6 months</option>
              <option>3 months</option>
              <option>daily</option>
            </select>
          </div>
          <div
            className={`${
              showAdvanced ? "block" : "hidden"
            } md:flex flex flex-col w-full md:w-[16.5%]`}
          >
            <label>Bedrooms</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="p-3 border rounded-md"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Bedroom{n > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`${
              showAdvanced ? "block" : "hidden"
            } md:flex flex flex-col w-full md:w-[16.5%]`}
          >
            <label>Bathrooms</label>
            <select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="p-3 border rounded-md"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Bathroom{n > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-[#00a256] md:w-[15%] text-white px-6 py-3 rounded-lg hover:bg-green-900 transition"
            onClick={handleFilter}
          >
            Apply Filters
          </button>
          <button
            className="text-red-600 md:w-[15%] text-sm flex items-center justify-center bg-white px-6 py-3 rounded-lg hover:text-red-700 transition"
            onClick={clearFilter}
          >
            ❌ Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
