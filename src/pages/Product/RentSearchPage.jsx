import { useEffect, useState } from "react";
import ChatHelp from "../../components/ChatHelp";
import Filter from "../../components/Filter";
import Items from "../../components/Items";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import { useChats } from "../../contexts/ChatsContext";
import { useAuth } from "../../contexts/AuthContext";
import { shuffleArray } from "../../service/shuffle";
import HouseRequestPopup from "../../components/HouseRequestPopup";

const RentSearchPage = () => {
  const { houses, isLoading, filter } = UseHouses();
  const {
    location,
    minBudget,
    budget: maxBudget,
    propertyType,
    bedrooms,
    bathrooms,
    rentDuration,
  } = filter;

  const [visibleCount, setVisibleCount] = useState(20);
  const { fetchChats } = useChats();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const hasLocation = Boolean(location);
  const hasMinBudget = minBudget !== null && minBudget !== undefined;
  const hasMaxBudget = maxBudget !== null && maxBudget !== undefined;
  const hasBudgetRange = hasMinBudget || hasMaxBudget;
  const hasPropertyType = Boolean(propertyType);
  const hasBedrooms =
    bedrooms !== null && bedrooms !== undefined && bedrooms !== "";
  const hasBathrooms =
    bathrooms !== null && bathrooms !== undefined && bathrooms !== "";
  const hasRentDuration = Boolean(rentDuration);
  const hasFilters =
    hasLocation ||
    hasBudgetRange ||
    hasPropertyType ||
    hasBedrooms ||
    hasBathrooms ||
    hasRentDuration;

  // Filtering and scoring logic
  let exactMatches = [];
  let relatedMatches = [];
  // const availableHouses = houses?.data?.filter(
  //   (house) => house?.availability === "available"
  // );
  // const shufflehouse = shuffleArray(availableHouses);

  if (!hasFilters) {
    exactMatches = houses?.data || [];
  } else {
    const scoredHouses = (houses.data || []).map((house) => {
      let matchScore = 0;
      let locationMatches = false;
      let budgetMatches = false;
      let typeMatches = false;
      let bedroomMatches = false;
      let bathroomMatches = false;
      let durationMatches = false;

      // Location matching
      if (hasLocation) {
        const houseLocation =
          house.location.address?.toLowerCase() +
            " " +
            house.location.city?.toLowerCase() +
            " " +
            house.location.state?.toLowerCase() || "";

        const searchWords = location.toLowerCase().split(" ");
        locationMatches = searchWords.some((word) =>
          houseLocation.includes(word)
        );
        if (locationMatches) matchScore += 2;
      }

      // Budget matching
      const housePrice = house.totalPrice;
      if (hasBudgetRange) {
        budgetMatches =
          (!hasMinBudget || housePrice >= parseFloat(minBudget)) &&
          (!hasMaxBudget || housePrice <= parseFloat(maxBudget));
        if (budgetMatches) matchScore += 1;
      }

      // Property type matching
      if (hasPropertyType) {
        typeMatches =
          house.propertyType.toLowerCase() === propertyType.toLowerCase();
        if (typeMatches) matchScore += 1;
      }
      // Bedrooms matching
      if (hasBedrooms) {
        const minBedrooms = parseInt(bedrooms);
        bedroomMatches = house.bedrooms >= minBedrooms;
        if (bedroomMatches) matchScore += 1;
      }

      // Bathrooms matching
      if (hasBathrooms) {
        const minBathrooms = parseInt(bathrooms);
        bathroomMatches = house.bathrooms >= minBathrooms;
        if (bathroomMatches) matchScore += 1;
      }

      // Rent Duration matching
      if (hasRentDuration && house.minTenancyPeriod) {
        // Extract numerical value from minTenancyPeriod
        const houseMonths = parseInt(house.minTenancyPeriod.split(" ")[0]) || 0;
        const filterMonths = parseInt(rentDuration) || 0;

        durationMatches = houseMonths <= filterMonths;
        if (durationMatches) matchScore += 1;
      }

      const isExactMatch =
        (!hasLocation || locationMatches) &&
        (!hasBudgetRange || budgetMatches) &&
        (!hasPropertyType || typeMatches) &&
        (!hasBedrooms || bedroomMatches) &&
        (!hasBathrooms || bathroomMatches) &&
        (!hasRentDuration || durationMatches);

      return { ...house, matchScore, isExactMatch };
    });

    exactMatches = scoredHouses
      .filter((item) => item.isExactMatch)
      .sort((a, b) => b.matchScore - a.matchScore);

    relatedMatches = scoredHouses
      .filter((item) => !item.isExactMatch && item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  const exactMatchesCount = exactMatches.length;
  const totalMatches = [...exactMatches, ...relatedMatches];
  const paginatedExact = exactMatches.slice(0, visibleCount);
  const paginatedRelated = relatedMatches.slice(
    0,
    Math.max(0, visibleCount - exactMatchesCount)
  );

  useEffect(() => {
    if (token) fetchChats();
  }, [token]);
  // useEffect(() => {
  //   fetchHouses();
  // }, []);

  return (
    <div>
      <div className="w-full">
        <Filter />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* No results */}
          {exactMatchesCount === 0 && relatedMatches?.length === 0 && (
            <div className="text-center text-red-600 font-semibold my-10 col-span-full">
              {hasFilters
                ? "❌ No properties match your criteria. Try adjusting filters."
                : "🏠 No filters applied. Showing all properties."}
            </div>
          )}

          {/* Exact Matches */}
          {paginatedExact.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-center w-[95%] md:w-5/6 m-auto my-3">
                {hasFilters ? (
                  <>
                    <p className="font-semibold text-lg">
                      Showing{" "}
                      {
                        paginatedExact.filter(
                          (house) => house.availability === "available"
                        ).length
                      }{" "}
                      results for{" "}
                      <i>{`"${
                        location ? location : "all locations available"
                      }"`}</i>
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-lg">{`Showing all properties`}</p>
                )}
                <select className="border-[1px] rounded-md p-3">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-around md:px-20 sm:flex sm:flex-wrap gap-auto px-0 sm:px-10">
                {paginatedExact.map(
                  (house, index) =>
                    house.availability === "available" && (
                      <Items house={house} key={index} />
                    )
                )}
              </div>
            </div>
          )}
          {exactMatchesCount === 0 && (
            <div className="text-center text-[#100073] my-10 col-span-full p-10">
              {hasFilters ? (
                <>
                  {!open ? (
                    <p>
                      Sorry, No exact match for your search criteria. <br />{" "}
                      Please kindly <b>Make a Request</b>, we will get back
                      soon.
                    </p>
                  ) : (
                    ""
                  )}{" "}
                  <HouseRequestPopup open={open} setOpen={setOpen} />
                </>
              ) : (
                "🏠 No filters applied. Showing all properties."
              )}
            </div>
          )}
          {/* Related Matches */}
          {paginatedRelated.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-center mb-4 text-blue-700 p-5">
                🔍 Related Houses
              </h2>
              <div className="w-full flex flex-col md:flex-row justify-around md:px-20 sm:flex sm:flex-wrap gap-auto px-0 sm:px-10">
                {paginatedRelated.map(
                  (house) =>
                    house.availability === "available" && (
                      <Items house={house} key={house.uniqueId} />
                    )
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Active filter tags */}
      {/* <div className="text-center my-5">
        {hasLocation && (
          <span className="text-green-600 mx-2">📍 {location}</span>
        )}
        {hasMinBudget && (
          <span className="text-green-600 mx-2">
            💸 Min: ₦{Number(minBudget).toLocaleString()}
          </span>
        )}
        {hasMaxBudget && (
          <span className="text-green-600 mx-2">
            💰 Max: ₦{Number(maxBudget).toLocaleString()}
          </span>
        )}
        {hasPropertyType && (
          <span className="text-green-600 mx-2">🏘 {propertyType}</span>
        )}
      </div>
      */}
      {/* View More  */}
      {totalMatches.length > visibleCount && (
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

export default RentSearchPage;
