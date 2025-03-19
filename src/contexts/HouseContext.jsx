import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();
const BASEURL = "https://realestway.com/.netlify/functions/api";

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});

  async function fetchHouses() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASEURL}/houses`);
      const data = await res.json();
      setHouses(data);
    } catch {
      alert("there was an error loading your data...");
    } finally {
      setIsLoading(false);
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
