import { createContext, useContext, useEffect, useState } from "react";

const SaleListingsContext = createContext();

const SaleListingsProvider = ({ children }) => {
  const BASE_URL = "https://backend.realestway.com/api";
  const [saleListings, setSaleListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [singleListing, setSingleListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0,
  });

  // Fetch all sale listings
  const fetchSaleListings = async (page = 1, perPage = 15) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/sale-listings?page=${page}&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sale listings");
      }
      const data = await response.json();
      setSaleListings(data.data || []);
      setPagination({
        current_page: data.current_page || 1,
        per_page: data.per_page || perPage,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching sale listings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch filtered sale listings
  const fetchFilteredListings = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      // Construct query string from filters
      const queryParams = new URLSearchParams();

      // Add all valid filters to the query
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      // Ensure pagination is included
      queryParams.append("page", pagination.current_page);
      queryParams.append("per_page", pagination.per_page);

      const response = await fetch(
        `${BASE_URL}/sale-listings?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filtered listings");
      }
      const data = await response.json();
      setFilteredListings(data.data || []);
      setPagination({
        current_page: data.current_page || 1,
        per_page: data.per_page || pagination.per_page,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching filtered listings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch single sale listing by ID
  const fetchSingleListing = async (listingId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/sale-listings/${listingId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch listing details");
      }
      const data = await response.json();
      setSingleListing(data.data || null);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching single listing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Change page
  const changePage = (page) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
    fetchSaleListings(page, pagination.per_page);
  };

  // Change items per page
  const changePerPage = (perPage) => {
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
    fetchSaleListings(1, perPage);
  };

  // Initial fetch
  useEffect(() => {
    fetchSaleListings();
  }, []);

  return (
    <SaleListingsContext.Provider
      value={{
        saleListings,
        filteredListings,
        singleListing,
        isLoading,
        error,
        pagination,
        fetchSaleListings,
        fetchFilteredListings,
        fetchSingleListing,
        changePage,
        changePerPage,
      }}
    >
      {children}
    </SaleListingsContext.Provider>
  );
};

const useSaleListings = () => {
  const context = useContext(SaleListingsContext);
  if (context === undefined) {
    throw new Error(
      "useSaleListings must be used within a SaleListingsProvider"
    );
  }
  return context;
};

export { SaleListingsProvider, useSaleListings };
