import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UseHouses } from "../contexts/HouseContext";
import { useEffect, useState } from "react";
import { Lock1, SaveAdd, SaveMinus } from "iconsax-reactjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faHome } from "@fortawesome/free-solid-svg-icons";

const BASE = "https://backend.realestway.com/api";

const Items = ({ house, children }) => {
  // const { title, totalPrice, images, uniqueId } = house;
  const { favoritedHouse, removeFavoritedHouse } = UseHouses();
  const {
    title,
    priceBreakdown,
    bathrooms,
    bedrooms,
    priceType,
    uniqueId,
    images,
  } = house;

  const [isFav, setIsFav] = useState(false);
  const { user, token } = useAuth();

  async function favh(id, tok) {
    try {
      const res = await fetch(`${BASE}/favourite/check/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${tok}`,
        },
      });
      const data = await res.json();
      setIsFav(data.isFavourited);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) user?.companyName ? "" : favh(uniqueId, token);
  }, [token, uniqueId]);

  const itemStyle = `rounded-xl w-full items-center justify-center h-[250px] md-[300px] relative`;

  return (
    <div className="min-w-[350px] w-[98%] md:w-[46%] p-3 pb-1 flex-col gap-4 justify-around shadow-2xl drop-shadow-lg rounded-lg mx-3">
      <div
        className={itemStyle}
        style={{
          // background: `url(../src/images${images[0].src})`,
          background: `url(https://backend.realestway.com/storage/${images[0].src})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        {" "}
        <div
          style={{
            color: house?.availability === "available" ? "white" : "red",
          }}
          className="bg-white flex justify-center font-Poppins bg-opacity-30 rounded-lg px-2 py-1 right-0 w-1/4 top-0 text-sm absolute"
        >
          {house?.availability === "available" ? "Available" : "Not available"}
        </div>
      </div>

      <div className="w-full justify-center flex flex-col text-sm py-2">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-[#262626]">
            {title?.split(" ").slice(0, 4).join(" ")}{" "}
            {title?.split(" ").length > 4 ? "..." : ""}
          </p>
          {!user?.nin ? (
            <>
              {isFav ? (
                <button
                  onClick={() => {
                    removeFavoritedHouse(uniqueId, token);
                    setIsFav(false);
                  }}
                  style={{ alignItems: "center" }}
                  className="flex gap-2 justify-center text-[#00A256] py-3"
                >
                  <SaveMinus color="#00A256" />
                  <span> saved</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    favoritedHouse(uniqueId, token);
                    setIsFav(true);
                  }}
                  style={{ alignItems: "center" }}
                  className="flex gap-1 justify-center py-3 text-[#100073]"
                >
                  <SaveAdd color="#100073" /> <span>save</span>
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <p className="text-sm text-gray-500">{house?.location.address}</p>
      </div>

      {/*         
          <div className="flex items-center justify-around">
            <div className="relative text-lg sm:text-xl text-gray-300 font-bold hover:text-blue-300">
              <p> View Details</p>
            </div>
            <span className="absolute  sm:text-lg text-gray-600 font-bold">
              <Lock1 size={18} />
            </span>
          </div> */}
      <div className="flex justify-between text-sm">
        <div className="bg-[#F0F0F7] border-1 shadow-none border-[#DCDCEB] text-#0A0D17 rounded-xl py-1 px-2">
          <FontAwesomeIcon icon={faBed} color="#0A0D17" /> {bedrooms}-bedrooms
        </div>
        <div className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
          <FontAwesomeIcon icon={faBathtub} color="#0A0D17" /> {bathrooms}
          -bathrooms
        </div>
        <div className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
          <FontAwesomeIcon icon={faHome} color="#0A0D17" />{" "}
          {house.propertyType.toLowerCase() === "office"
            ? "Office"
            : "Apartment"}
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-xs">Price</span>
          <div className="items-center flex">
            <span className="m-auto ">
              <span className="text-xl font-bold w-1/4">
                #{Number(priceBreakdown.basicRent).toLocaleString()}
              </span>
              <span className="text-sm">
                /{priceType === "yearly" && "yr"}
                {priceType === "monthly" && "mnt"}
                {priceType === "daily" && "day"}
              </span>
            </span>
          </div>
        </div>
        <Link
          to={`/property/${uniqueId}`}
          className="bg-[#00A256] w-[60%] flex items-center justify-center text-white py-2 mt-2 px-4 text-sm rounded-lg font-bold hover:text-green-300"
        >
          View Property Details
        </Link>
      </div>
      <div className="flex flex-col gap-5 justify-around mt-3 border-red-600">
        {children}
      </div>
    </div>
  );
};

export default Items;
