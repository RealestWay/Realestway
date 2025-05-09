import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [favHouse, setFavHouse] = useState();

  // fetch all houses
  async function fetchHouses() {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch("https://backend.realestway.com/api/listings");
        const data = await res.json();
        setHouses(data);
      } catch {
        alert("there was an error loading your data...");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  }

  // Add house to favorite
  const favoritedHouse = async (id, token) => {
    try {
      const res = await fetch(
        `https://backend.realestway.com/api/favourite/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
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
      const res = await fetch(
        `https://backend.realestway.com/api/favourite/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Show all favorite houses
  const [loadingFav, setLoadingFav] = useState(false);
  const showFavoritedHouse = async (token) => {
    setLoadingFav(true);
    try {
      const res = await fetch(`https://backend.realestway.com/api/favourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavHouse(data.favourites);
      setLoadingFav(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);
  return (
    <HouseContext.Provider
      value={{
        houses,
        isLoading,
        fetchHouses,
        filter,
        setFilter,
        favoritedHouse,
        removeFavoritedHouse,
        favHouse,
        showFavoritedHouse,
        loadingFav,
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
