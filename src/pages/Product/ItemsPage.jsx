import { useState } from "react";
import ChatHelp from "../../components/ChatHelp";
import Filter from "../../components/Filter";
import Items from "../../components/Items";
import PageNav from "../../components/PageNav";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";

const ItemsPage = () => {
  const { houses, isLoading, filter } = UseHouses();
  const { location, budget, propertyType } = filter;
  const [visibleCount, setVisibleCount] = useState(20); // Pagination state

  // 🏠 Apply Smart Filtering (Respect Budget!)
  const filteredHouses = houses.data
    .filter((house) => {
      // ✅ Budget Constraint: Only show houses ≤ budget
      if (budget && house.totalPrice > parseFloat(budget)) return false;
      return true;
    })
    .map((house) => {
      let matchScore = 0;

      // ✅ Location Match (partial word match)
      const houseLocation = house.address.toLowerCase();
      const searchLocation = location?.toLowerCase();
      const locationMatches =
        searchLocation &&
        searchLocation.split(" ").some((word) => houseLocation.includes(word));

      if (locationMatches) matchScore += 2;

      // ✅ Budget Match (house price ≤ budget)
      const budgetMatches = budget
        ? house.totalPrice <= parseFloat(budget)
        : true;
      if (budgetMatches) matchScore += 1;

      // ✅ Property Type Match
      const typeMatches = propertyType
        ? house.propertyType.toLowerCase() === propertyType.toLowerCase()
        : true;
      if (typeMatches) matchScore += 1;

      return { house, matchScore };
    })
    .filter(({ matchScore }) => matchScore > 0) // Show results only if at least one filter is used
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by relevance
    .map(({ house }) => house);

  // Slice results for pagination
  const paginatedHouses = filteredHouses.slice(0, visibleCount);

  return (
    <div>
      <PageNav />
      <div className="w-full">
        <Filter />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 md:gap-2 px-0 sm:px-10">
          {paginatedHouses.length > 0 ? (
            paginatedHouses.map((house) => (
              <Items house={house} key={house.id} />
            ))
          ) : (
            <div className="text-center text-red-600 font-semibold my-10">
              ❌ No items fit your description. Please try different filters.
            </div>
          )}
        </div>
      )}

      {/* ✅ Active Filters Feedback */}
      <div className="text-center my-5">
        {location && (
          <span className="text-green-600 mx-2">✅ Location: {location}</span>
        )}
        {budget && (
          <span className="text-green-600 mx-2">✅ Max Budget: ₦{budget}</span>
        )}
        {propertyType && (
          <span className="text-green-600 mx-2">✅ Type: {propertyType}</span>
        )}
        {!location && !budget && !propertyType && (
          <span className="text-red-600 mx-2">
            ❌ No filters applied. Showing all houses.
          </span>
        )}
      </div>

      {/* ✅ View More Button */}
      {filteredHouses.length > visibleCount && (
        <div className="text-center my-5">
          <button
            onClick={() => setVisibleCount(visibleCount + 10)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            View More
          </button>
        </div>
      )}

      <ChatHelp />
    </div>
  );
};

export default ItemsPage;
