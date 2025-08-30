import { useEffect, useState } from "react";
import ChatHelp from "../../components/ChatHelp";
import Filter from "../../components/Filter";
import Items from "../../components/Items";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import { useChats } from "../../contexts/ChatsContext";
import { useAuth } from "../../contexts/AuthContext";
import HouseRequestPopup from "../../components/HouseRequestPopup";

const RentSearchPage = () => {
  const {
    houses,
    filteredHouses,
    isLoading,
    filter,
    fetchFilteredHouses,
    fetchHouses,
  } = UseHouses();
  const {
    location,
    minBudget,
    budget: maxBudget,
    propertyType,
    bedrooms,
    bathrooms,
    rentDuration,
  } = filter;

  const { fetchChats } = useChats();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [perPage, setPerPage] = useState(20);

  const hasFilters = Boolean(
    location ||
      minBudget ||
      maxBudget ||
      propertyType ||
      bedrooms ||
      bathrooms ||
      rentDuration
  );

  // Display houses based on filter state
  const displayHouses = hasFilters
    ? filteredHouses?.data || []
    : houses?.data || [];
  const availableHouses = displayHouses.filter(
    (house) => house?.availability === "available"
  );

  // Fetch houses when filters change
  useEffect(() => {
    const fetchData = async () => {
      if (hasFilters) {
        // Fetch filtered houses
        const filterParams = {
          per_page: perPage,
          sort: "price_desc",
        };

        if (location) {
          filterParams.search = location;
          filterParams.location = location;
        }
        if (minBudget) filterParams.min_price = minBudget;
        if (maxBudget) filterParams.max_price = maxBudget;
        if (propertyType) filterParams.property_type = propertyType;
        if (bedrooms) filterParams.bedrooms = bedrooms;
        if (bathrooms) filterParams.bathrooms = bathrooms;
        if (rentDuration) filterParams.availability = "available";

        try {
          await fetchFilteredHouses(filterParams);
          // Check if we might have more houses (if we got exactly what we asked for, there might be more)
          setHasMore(availableHouses.length === perPage);
        } catch (error) {
          console.error("Error fetching filtered houses:", error);
          setHasMore(false);
        }
      } else {
        // Fetch all houses with pagination
        try {
          await fetchHouses(perPage);
          // Check if we might have more houses
          setHasMore(availableHouses.length === perPage);
        } catch (error) {
          console.error("Error fetching houses:", error);
          setHasMore(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [
    location,
    minBudget,
    maxBudget,
    propertyType,
    bedrooms,
    bathrooms,
    rentDuration,
    hasFilters,
    perPage,
  ]);

  // Load more houses
  const loadMoreHouses = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPerPage = perPage + 10;
      setPerPage(nextPerPage);

      if (hasFilters) {
        // Load more filtered houses
        const filterParams = {
          per_page: nextPerPage,
          sort: "price_desc",
        };

        if (location) {
          filterParams.search = location;
          filterParams.location = location;
        }
        if (minBudget) filterParams.min_price = minBudget;
        if (maxBudget) filterParams.max_price = maxBudget;
        if (propertyType) filterParams.property_type = propertyType;
        if (bedrooms) filterParams.bedrooms = bedrooms;
        if (bathrooms) filterParams.bathrooms = bathrooms;
        if (rentDuration) filterParams.availability = "available";

        await fetchFilteredHouses(filterParams);
      } else {
        // Load more regular houses
        await fetchHouses(nextPerPage);
      }

      // Check if we might have more houses to load
      setHasMore(availableHouses.length === nextPerPage);
    } catch (error) {
      console.error("Error loading more houses:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (token) fetchChats();
  }, [token]);

  return (
    <div>
      <div className="w-full">
        <Filter />
      </div>

      {isLoading && !availableHouses.length ? (
        <Spinner />
      ) : (
        <div>
          {/* No results */}
          {availableHouses.length === 0 && (
            <div className="text-center text-red-600 font-semibold my-10 col-span-full">
              {hasFilters ? (
                <div className="text-center text-[#100073] my-10 col-span-full p-10">
                  {!open && (
                    <p>
                      No properties match your criteria. <br />
                      Please <b>Make a Request</b>, we'll find matches for you.
                    </p>
                  )}
                  <HouseRequestPopup open={open} setOpen={setOpen} />
                </div>
              ) : (
                "No properties available at the moment."
              )}
            </div>
          )}

          {/* Display Houses */}
          {availableHouses.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-center w-[95%] md:w-5/6 m-auto my-3">
                <p className="font-semibold text-lg">
                  {hasFilters ? (
                    <>
                      Showing {availableHouses.length} results{" "}
                      {location && (
                        <>
                          for <i>"{location}"</i>
                        </>
                      )}
                    </>
                  ) : (
                    `Showing ${availableHouses.length} properties`
                  )}
                </p>
                <select className="border-[1px] rounded-md p-3">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              <div className="w-full flex flex-col md:flex-row justify-around md:px-20 sm:flex sm:flex-wrap gap-auto px-0 sm:px-10">
                {availableHouses.map((house, index) => (
                  <Items house={house} key={index} />
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && availableHouses.length > 0 && (
            <div className="text-center my-8">
              <button
                onClick={loadMoreHouses}
                disabled={loadingMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loadingMore ? (
                  <div className="flex items-center justify-center">
                    <Spinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  "Load More Properties"
                )}
              </button>
            </div>
          )}

          {/* No more houses indicator */}
          {!hasMore && availableHouses.length > 0 && (
            <div className="text-center my-5 text-gray-500">
              All properties loaded
            </div>
          )}
        </div>
      )}

      <ChatHelp />
    </div>
  );
};

export default RentSearchPage;
