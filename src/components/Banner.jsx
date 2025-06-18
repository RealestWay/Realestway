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
    console.log(filter);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 sm:gap-3 items-center bg-black bg-opacity-50 text-white text-center">
        <PageNav home={true} />
        <div className="mt-20 flex flex-col gap-7">
          <div>
            <span className="py-2 px-4 rounded-3xl bg-white bg-opacity-30">
              Smart Housing Simplified
            </span>{" "}
          </div>
          <h1
            className="sm:text-4xl text-5xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Find your next home
            <br />
            the smart way
          </h1>
          <div className="pb-20">
            {" "}
            <p className="mt-2 w-5/6 sm:w-1/2 text-[22px] m-auto sm:mb-10">
              Realestway makes finding, renting, or buying a home simple, fast,
              and safe. No scams, no stress; just verified listings and expert
              support.
            </p>
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
    <div className="bg-white w-5/6 sm:w-3/5 sm:flex bg-opacity-90 text-black py-2 px-6 sm:px-10 gap-5 bottom-[-100px] sm:bottom-[-30px] rounded-2xl absolute mt-5 shadow-md">
      <div className="sm:flex flex-col gap-2 sm:flex-row w-[95%] sm:justify-between">
        <div className="flex flex-col">
          <label className="flex justify-start">Location</label>
          <span className="flex text-sm relative items-center">
            {" "}
            <input
              type="text"
              className="border-0 bg-inherit focus:outline-none focus:ring-[0.5px] focus:ring-[#00a256]"
              placeholder="Type your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Location
              color="gray"
              size={15}
              className="absolute inset-y-0 right-4 top-1 flex items-center"
            />
          </span>
        </div>{" "}
        <div className="flex flex-col">
          <label className="flex justify-start">Property Type</label>
          <span className="sm:flex sm:gap-2 sm:ml-[-16px] text-sm text-[#8F90A6]">
            <span className="w-0 sm:w-3"> | </span>
            <select
              type="text"
              className="border-0 bg-inherit focus:outline-none focus:ring-[0.5px] focus:ring-[#00a256]"
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
          <label className="flex justify-start">Price range</label>
          <span className="flex gap-2 ml-[-16px] text-sm text-[#8F90A6]">
            |{" "}
            <input
              type="text"
              className="border-0 bg-inherit focus:outline-none focus:ring-1 focus:ring-[#00a256]"
              placeholder="Type your budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col py-2">
        <Link
          to={"/search"}
          onClick={handleFilter}
          className="p-2 bg-[#00a256] rounded-lg"
        >
          <SearchNormal1 color="white" size={18} />
        </Link>
      </div>
    </div>
  );
};
export default Banner;
