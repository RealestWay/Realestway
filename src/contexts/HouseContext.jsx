import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();

// const BASEURL = "https://realestway.com/.netlify/functions/api";
// const BASEURL = "http://localhost:9000";

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});

  async function fetchHouses() {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        // const res = await fetch(`${BASEURL}/houses`);
        const res = await fetch(
          "https://realestway-backend.up.railway.app/api/listings"
        );
        const data = await res.json();
        setHouses(data);
      } catch {
        alert("there was an error loading your data...");
      } finally {
        setIsLoading(false);
      }
    }, 5000);
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
        filter,
        setFilter,
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
