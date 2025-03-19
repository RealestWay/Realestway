// import { useState } from "react";
// import { UseHouses } from "../contexts/HouseContext";

// const Filter = () => {
//   const { filter, setFilter } = UseHouses();
//   const [location, setLocation] = useState();
//   const [budget, setBudget] = useState();
//   const [propertyType, setPropertyType] = useState();
//   const handleFilter = () => {
//     setFilter({ ...filter, location, budget, propertyType });
//   };
//   const clearFilter = () => {
//     setFilter({});
//   };
//   return (
//     <div className="sm:w-4/6 w-5/6 my-5 items-center mx-auto bg-blue-50 px-10 py-5 rounded-xl">
//       <h3 className="m-auto w-full sm:w-3/5 font-semibold sm:text-xl">
//         Search to Locate a Perfect Apartment For You
//       </h3>
//       <div className="my-5 sm:flex gap-2 sm:justify-between">
//         <input
//           placeholder="Type Location"
//           className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <input
//           placeholder="Budget"
//           className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />
//         <select
//           placeholder="Apartment type"
//           className="rounded-lg px-3 py-1 my-2 sm:my-0 w-full"
//           value={propertyType}
//           onChange={(e) => setPropertyType(e.target.value)}
//         >
//           <option>Select</option>
//           <option>Duplex </option>
//           <option>Bungalow</option>
//           <option>Flat</option>
//           <option>Office</option>
//           <option>Apartment</option>
//         </select>
//         <button
//           className="bg-blue-400 hover:bg-green-800 py-3 px-5 rounded-xl text-white font-sm"
//           onClick={handleFilter}
//         >
//           Search
//         </button>
//       </div>
//       <button
//         className="bg-red-400 hover:bg-gray-800 py-2 px-3 rounded-2xl text-white font-sm"
//         onClick={clearFilter}
//       >
//         Clear Filter
//       </button>
//     </div>
//   );
// };

// export default Filter;
import { useState } from "react";
import { UseHouses } from "../contexts/HouseContext";

const Filter = () => {
  const { filter, setFilter } = UseHouses();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleFilter = () => {
    setFilter({
      ...filter,
      location: location ? location.toLowerCase() : null, // Normalize for partial matching
      budget: budget ? parseFloat(budget) : null, // Convert budget to number
      propertyType: propertyType !== "Select" ? propertyType : null, // Ensure valid property type
    });
  };

  const clearFilter = () => {
    setFilter({});
    setLocation("");
    setBudget("");
    setPropertyType("");
  };

  return (
    <div className="sm:w-4/6 w-5/6 my-5 items-center mx-auto bg-blue-50 px-10 py-5 rounded-xl">
      <h3 className="m-auto w-full sm:w-3/5 font-semibold sm:text-xl">
        Search to Locate a Perfect Apartment For You
      </h3>

      {/* Filter Input Fields */}
      <div className="my-5 sm:flex gap-2 sm:justify-between">
        <input
          type="text"
          placeholder="Type Location"
          className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Budget (₦)"
          className="rounded-lg px-2 py-1 my-2 sm:my-0 w-full"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <select
          className="rounded-lg px-3 py-1 my-2 sm:my-0 w-full"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option>Select Property Type</option>
          <option>Duplex</option>
          <option>Bungalow</option>
          <option>Flat</option>
          <option>Office</option>
          <option>Apartment</option>
        </select>
        <button
          className="bg-blue-400 hover:bg-green-800 py-3 px-5 rounded-xl text-white font-sm"
          onClick={handleFilter}
        >
          Search
        </button>
      </div>

      {/* Active Filters Display */}
      <div className="my-3">
        {location && (
          <span className="text-green-600 text-sm font-medium mx-2">
            ✅ Location: {location}
          </span>
        )}
        {budget && (
          <span className="text-green-600 text-sm font-medium mx-2">
            ✅ Budget: ₦{budget}
          </span>
        )}
        {propertyType && propertyType !== "Select" && (
          <span className="text-green-600 text-sm font-medium mx-2">
            ✅ Type: {propertyType}
          </span>
        )}
        {!location &&
          !budget &&
          (!propertyType || propertyType === "Select") && (
            <span className="text-red-600 text-sm font-medium mx-2">
              ❌ No filters applied
            </span>
          )}
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
