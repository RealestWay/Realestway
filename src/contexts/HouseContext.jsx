import { createContext, useContext, useEffect, useState } from "react";

const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});

  // fetch all houses
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

  // fetch a particular house
  // const fetchHouse = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://realestway-backend.up.railway.app/api/listings/${id}`
  //     );
  //     const data = await res.json();
  //     setHouse(data.data);
  //     console.log(house);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
