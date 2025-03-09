import { useState } from "react";
import { UseHouses } from "../contexts/HouseContext";

const Filter = () => {
  const { filter, setFilter } = UseHouses();
  const [location, setLocation] = useState();
  const [budget, setBudget] = useState();
  const [propertyType, setPropertyType] = useState();
  const handleFilter = () => {
    setFilter({ ...filter, location, budget, propertyType });
  };
  const clearFilter = () => {
    setFilter({});
  };
  return (
    <div className="sm:w-4/6 w-5/6 my-5 items-center mx-auto bg-blue-50 px-10 py-5 rounded-xl">
      <h3 className="m-auto w-full sm:w-3/5 font-semibold sm:text-xl">
        Search to Locate a Perfect Apartment For You
      </h3>
      <div className="my-5 sm:flex gap-2 sm:justify-between">
        <input
          placeholder="Type Location"
          className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Budget"
          className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <select
          placeholder="Apartment type"
          className="rounded-lg px-3 py-1 my-2 sm:my-0 w-full"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option>Select</option>
          <option>Duplex </option>
          <option>Bungalow</option>
          <option>Flat</option>
          <option>Office</option>
        </select>
        <button
          className="bg-blue-400 hover:bg-green-800 py-3 px-5 rounded-xl text-white font-sm"
          onClick={handleFilter}
        >
          Search
        </button>
      </div>
      <button
        className="bg-red-400 hover:bg-gray-800 py-2 px-3 rounded-2xl text-white font-sm"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default Filter;
