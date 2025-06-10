import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();
const BASE = "https://backend.realestway.com/api";
const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState({});
  const [favHouse, setFavHouse] = useState();
  const [agentHouses, setAgentHouse] = useState();
  const [house, setRemoteHouse] = useState();

  // fetch all houses
  async function fetchHouses() {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE}/listings`);
        const data = await res.json();
        setHouses(data);
      } catch {
        alert(
          "Please check your network, there was an error loading houses..."
        );
      } finally {
        setIsLoading(false);
      }
    }, 3000);
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
      const res = await fetch(`${BASE}/favourite/${id}`, {
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
      const res = await fetch(`${BASE}/favourite/${id}`, {
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

  //  Update House
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
    fetchHouses();
  }, []);
  return (
    <HouseContext.Provider
      value={{
        houses,
        isLoading,
        fetchHouses,
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
