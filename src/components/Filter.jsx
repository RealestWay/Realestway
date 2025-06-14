import { useState } from "react";
import { UseHouses } from "../contexts/HouseContext";

const Filter = () => {
  const { filter, setFilter } = UseHouses();
  const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleFilter = () => {
    const parsedMin = minBudget ? parseFloat(minBudget) : null;
    const parsedMax = maxBudget ? parseFloat(maxBudget) : null;

    setFilter({
      ...filter,
      location: location ? location.toLowerCase() : null,
      minBudget: parsedMin,
      maxBudget: parsedMax,
      propertyType: propertyType !== "Select" ? propertyType : null,
    });
  };

  const clearFilter = () => {
    setFilter({});
    setLocation("");
    setMinBudget("");
    setMaxBudget("");
    setPropertyType("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full sm:w-4/6">
      <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        Find Your Perfect Property
      </h3>

      {/* Filter Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="location"
            className="text-gray-700 font-medium mb-2 block"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter Location"
            className="p-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="minBudget"
            className="text-gray-700 font-medium mb-2 block"
          >
            Min Budget (₦)
          </label>
          <input
            type="number"
            id="minBudget"
            placeholder="Minimum Budget"
            className="p-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="maxBudget"
            className="text-gray-700 font-medium mb-2 block"
          >
            Max Budget (₦)
          </label>
          <input
            type="number"
            id="maxBudget"
            placeholder="Maximum Budget"
            className="p-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="propertyType"
            className="text-gray-700 font-medium mb-2 block"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            className="p-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option>Select Property Type</option>
            <option value="Self Contain">Self Contain</option>
            <option value="Office">Office</option>
            <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
            <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
            <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
            <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
            <option value="Boysquarter">Boysquarter</option>
            <option value="Duplex">Duplex</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around items-center space-x-4">
        <button
          className="bg-[#100073] font-montserrat text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleFilter}
        >
          Apply Filter
        </button>
        <button
          className="bg-[#00A256] font-montserrat text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={clearFilter}
        >
          Clear Filters
        </button>
      </div>

      {/* Active Filters Display */}
      <div className="mt-6">
        {location && (
          <span className="text-green-600 text-sm font-medium mr-2">
            ✅ Location: {location}
          </span>
        )}
        {minBudget && (
          <span className="text-green-600 text-sm font-medium mr-2">
            ✅ Min Budget: ₦{minBudget}
          </span>
        )}
        {maxBudget && (
          <span className="text-green-600 text-sm font-medium mr-2">
            ✅ Max Budget: ₦{maxBudget}
          </span>
        )}
        {propertyType && propertyType !== "Select" && (
          <span className="text-green-600 text-sm font-medium mr-2">
            ✅ Type: {propertyType}
          </span>
        )}
        {!location && !minBudget && !maxBudget && !propertyType && (
          <span className="text-red-600 text-xs font-medium">
            ❌ No filters applied
          </span>
        )}
      </div>
    </div>
  );
};

export default Filter;
