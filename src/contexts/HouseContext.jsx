import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();
const BASE = "https://backend.realestway.com/api";
const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState({});
  const [favHouse, setFavHouse] = useState();
  const [agentHouses, setAgentHouse] = useState();
  const [house, setRemoteHouse] = useState();

  // fetch all houses
  async function fetchHouses(num = 20) {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE}/listings?per_page=${num}`);
        const data = await res.json();
        setHouses(data);
        setFilteredHouses(data); // Initialize filteredHouses with all houses
        localStorage.setItem("houses", JSON.stringify(data));
      } catch {
        alert("Please check your network, page could not load properly...");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  }

  // fetch filtered houses
  async function fetchFilteredHouses(filterParams = {}) {
    setIsLoading(true);
    try {
      // Build query string from filter parameters
      const queryParams = new URLSearchParams();

      // Add all filter parameters that have values
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      // Add default parameters if not provided
      if (!filterParams.per_page) {
        queryParams.append("per_page", "15");
      }
      if (!filterParams.sort) {
        queryParams.append("sort", "price_desc");
      }

      const url = `${BASE}/listings?${queryParams.toString()}`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setFilteredHouses(data);
      return data;
    } catch (error) {
      console.error("Error fetching filtered houses:", error);
      alert("Failed to fetch filtered results. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // fetch agent's houses
  async function fetchAgentHouses(id) {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE}/listings/agents/${id}`);
        const data = await res.json();
        setAgentHouse(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  }

  // Add house to favorite
  const favoritedHouse = async (id, token) => {
    try {
      const res = await fetch(`${BASE}/favourites/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        console.log("error trying");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Remove House from Favorite
  const removeFavoritedHouse = async (id, token) => {
    try {
      const res = await fetch(`${BASE}/favourites/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete House
  const deleteHouse = async (id, token) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE}/listings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setSuccess("Successful!");
    }
  };

  // Show all favorite houses
  const [loadingFav, setLoadingFav] = useState(false);
  const showFavoritedHouse = async (token) => {
    setLoadingFav(true);
    try {
      const res = await fetch(`${BASE}/favourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavHouse(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingFav(false);
    }
  };

  // Update House
  async function updateHouse(id, token, formData) {
    setIsLoading(true);
    formData.append("_method", "PATCH");

    try {
      const res = await fetch(`${BASE}/listings/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setSuccess("Successful!");
    }
  }

  useEffect(() => {
    const cached = localStorage.getItem("houses");
    if (cached) {
      const parsedData = JSON.parse(cached);
      setHouses(parsedData);
      setFilteredHouses(parsedData); // Initialize filtered houses from cache
    }
    fetchHouses();
  }, []);

  return (
    <HouseContext.Provider
      value={{
        houses,
        filteredHouses,
        isLoading,
        fetchHouses,
        fetchFilteredHouses,
        fetchAgentHouses,
        agentHouses,
        deleteHouse,
        updateHouse,
        filter,
        setFilter,
        favoritedHouse,
        removeFavoritedHouse,
        favHouse,
        showFavoritedHouse,
        loadingFav,
        success,
        setSuccess,
        house,
        setRemoteHouse,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

const UseHouses = () => {
  const Houses = useContext(HouseContext);
  if (Houses === undefined)
    throw new Error("Houses context was used outside its provider");
  return Houses;
};

export { HouseProvider, UseHouses };
