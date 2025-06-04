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
  const [visibleCount, setVisibleCount] = useState(20);

  // Determine active filters
  const hasLocation = Boolean(location);
  const hasBudget = Boolean(budget);
  const hasPropertyType = Boolean(propertyType);
  const hasFilters = hasLocation || hasBudget || hasPropertyType;

  // Calculate maximum possible score based on active filters
  const maxPossibleScore =
    (hasLocation ? 2 : 0) + (hasBudget ? 1 : 0) + (hasPropertyType ? 1 : 0);

  // Filtering and scoring logic
  let filteredHouses = [];
  let exactMatchesCount = 0;

  if (!hasFilters) {
    filteredHouses = houses.data || [];
  } else {
    const scoredHouses = (houses.data || []).map((house) => {
      let matchScore = 0;
      let locationMatches = false;
      let budgetMatches = false;
      let typeMatches = false;

      // Location matching
      if (hasLocation) {
        const houseLocation = house.location.address?.toLowerCase() || "";
        const searchWords = location.toLowerCase().split(" ");
        locationMatches = searchWords.some((word) =>
          houseLocation.includes(word)
        );
        if (locationMatches) matchScore += 2;
      }

      // Budget matching
      if (hasBudget) {
        budgetMatches = house.totalPrice <= parseFloat(budget);
        if (budgetMatches) matchScore += 1;
      }

      // Property type matching
      if (hasPropertyType) {
        typeMatches =
          house.propertyType.toLowerCase() === propertyType.toLowerCase();
        if (typeMatches) matchScore += 1;
      }

      // Check exact match
      const isExactMatch =
        (!hasLocation || locationMatches) &&
        (!hasBudget || budgetMatches) &&
        (!hasPropertyType || typeMatches);

      return { ...house, matchScore, isExactMatch };
    });

    // Split into exact and related matches
    const exactMatches = scoredHouses
      .filter((item) => item.isExactMatch)
      .sort((a, b) => b.matchScore - a.matchScore);

    const relatedMatches = scoredHouses
      .filter((item) => !item.isExactMatch && item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    exactMatchesCount = exactMatches.length;
    filteredHouses = [...exactMatches, ...relatedMatches];
  }

  // Pagination
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
        <div>
          {hasFilters && exactMatchesCount === 0 && (
            <div className="col-span-full text-center text-orange-500 my-4">
              No exact matches found. Showing related properties:
            </div>
          )}
          {paginatedHouses.length > 0 ? (
            <div className="w-full grid md:px-20 md:grid-cols-3 lg:grid-cols-3 sm:flex sm:flex-wrap md:gap-2 px-0 sm:px-10">
              {paginatedHouses.map((house) => (
                <Items house={house} key={house.uniqueId} />
              ))}
            </div>
          ) : (
            <div className="text-center text-red-600 font-semibold my-10 col-span-full">
              {hasFilters
                ? "❌ No properties match your criteria. Try adjusting filters."
                : "🏠 No filters applied. Showing all properties."}
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      <div className="text-center my-5">
        {hasLocation && (
          <span className="text-green-600 mx-2">📍 {location}</span>
        )}
        {hasBudget && <span className="text-green-600 mx-2">💰 ₦{budget}</span>}
        {hasPropertyType && (
          <span className="text-green-600 mx-2">🏘 {propertyType}</span>
        )}
      </div>

      {/* View more button */}
      {filteredHouses.length > visibleCount && (
        <div className="text-center my-5">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View More Properties
          </button>
        </div>
      )}

      <ChatHelp />
    </div>
  );
};

export default ItemsPage;
