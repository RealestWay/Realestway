import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import { Location, SearchNormal1 } from "iconsax-reactjs";
import { UseHouses } from "../contexts/HouseContext";

const bannerImages = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
  "/banner4.png",
  "/banner5.png",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { filter, setFilter } = UseHouses();
  const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleFilter = () => {
    const parsedMin = minBudget ? parseFloat(minBudget) : null;
    const parsedMax = maxBudget ? parseFloat(maxBudget) : null;

    setFilter({
      ...filter,
      location: location ? location.toLowerCase() : null,
      minBudget: parsedMin,
      maxBudget: parsedMax,
      propertyType: propertyType !== "Select" ? propertyType : null,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1200000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-[110vh] md:h-screen bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 sm:gap-3 items-center bg-black bg-opacity-50 text-white text-center">
        <PageNav home={true} />
        <div className="mt-20 mb-5 md:mb-1 flex flex-col gap-7">
          <div>
            <span className="py-2 px-4 rounded-3xl bg-white bg-opacity-30">
              Smart Housing Simplified
            </span>{" "}
          </div>
          <h1
            className="text-4xl font-bold w-[93%] m-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Find your next home
            <br />
            the smart way
          </h1>
          <div className="pb-25 flex flex-col gap-6">
            <p className="mt-2 w-5/6 md:w-1/2 text-[22px] mb-2 m-auto md:mb-10">
              Realestway makes finding, renting, or buying a home simple, fast,
              and safe. No scams, no stress; just verified listings and expert
              support.
            </p>
            <div className="flex justify-between mx-auto mt-6 mb w-4/5 md:w-3/5">
              <Link
                to={"/search"}
                className="bg-[#00a256] w-[45%] text-white px-8 py-3 rounded-md font-medium hover:bg-green-600 transition-colors text-lg"
              >
                RENT
              </Link>
              <Link
                to={"/search/buy"}
                className="bg-white w-[45%] text-[#100073] px-8 py-3 rounded-md font-medium border border-[#100073] hover:bg-gray-50 transition-colors text-lg"
              >
                BUY
              </Link>
            </div>
          </div>
        </div>
        <Filter
          location={location}
          setLocation={setLocation}
          handleFilter={handleFilter}
          propertyType={propertyType}
          setMaxBudget={setMaxBudget}
          setPropertyType={setPropertyType}
          maxBudget={maxBudget}
        />
      </div>
    </div>
  );
};

const Filter = ({
  maxBudget,
  setMaxBudget,
  location,
  setLocation,
  handleFilter,
  propertyType,
  setPropertyType,
}) => {
  return (
    <div className="bg-white w-5/6 md:w-3/5 md:flex md:items-center bg-opacity-90 text-black py-2 px-6 md:px-10 gap-5 bottom-[-100px] md:bottom-[-30px] rounded-2xl absolute mt-5 shadow-md">
      <div className="md:flex flex-col md:items-center gap-4 md:flex-row w-[95%] md:justify-between">
        <div className="flex flex-col">
          <label className="flex justify-start">Location</label>
          <span className="flex text-sm relative items-center border-b-2 md:pr-5 md:border-b-0 md:border-r-2 border-[#8F90A6]">
            {" "}
            <input
              type="text"
              className="border-0 bg-inherit w-full focus:outline-none py-2 focus:ring-[0.5px] focus:ring-[#00a256]"
              placeholder="Type your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Location
              color="gray"
              size={15}
              className="absolute inset-y-0 md:right-5 right-1 top-2 flex items-center"
            />
          </span>
        </div>{" "}
        <div className="flex flex-col">
          <label className="flex justify-start">Property Type</label>
          <span className="md:flex border-b-2 md:border-b-0 border-[#8F90A6] text-sm text-[#8F90A6]">
            <select
              type="text"
              className="border-0 bg-inherit py-2 focus:outline-none w-full focus:ring-[0.5px] focus:ring-[#00a256]"
              placeholder="Select Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option>Select Property Type</option>
              <option value="Self Contain">Self Contain</option>
              <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
              <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
              <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
              <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
              <option value="Boysquarter">Boysquarter</option>
              <option value="Duplex">Duplex</option>
              <option value="Office">Office</option>
            </select>
          </span>
        </div>
        <div className="flex flex-col">
          <label className="flex justify-start md:pl-4">Max Budget</label>
          <span className="flex justify-start md:pl-4 gap-2 md:border-l-2 border-b-2 md:border-b-0 border-[#8F90A6] text-sm text-[#8F90A6]">
            <input
              type="text"
              className="border-0 bg-inherit py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00a256]"
              placeholder="Type your budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
          </span>
        </div>
      </div>
      <div className="flex md:items-center flex-col py-2">
        <Link
          to={"/search"}
          onClick={handleFilter}
          className="p-2 flex items-center gap-3 justify-center text-white bg-[#00a256] rounded-lg"
        >
          <SearchNormal1 color="white" size={20} />{" "}
          <span className="md:hidden text-lg">Search</span>
        </Link>
      </div>
    </div>
  );
};
export default Banner;
