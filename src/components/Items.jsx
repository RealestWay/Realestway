// import ImageCarousel from "./ImageCarousel";

import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useAuth } from "../contexts/AuthContext";
import { UseHouses } from "../contexts/HouseContext";
import { useEffect, useState } from "react";
import { Lock1, SaveAdd, SaveMinus } from "iconsax-reactjs";

const BASE = "https://backend.realestway.com/api";

const Items = ({ house, children }) => {
  // const { title, totalPrice, images, uniqueId } = house;
  const { favoritedHouse, removeFavoritedHouse } = UseHouses();
  const { title, priceBreakdown, priceType, uniqueId, description, images } =
    house;
  const [isFav, setIsFav] = useState(false);
  const { isAuthenticated, user, token } = useAuth();

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

  const itemStyle = `rounded-xl w-full items-center justify-center h-[200px]`;

  return (
    <div className="w-[95%] sm:w-[30%] min-w-[300px] p-4 flex-col justify-around shadow-2xl drop-shadow-lg rounded-xl mx-3">
      <div
        className={itemStyle}
        style={{
          // background: `url(../src/images${images[0].src})`,
          background: `url(https://backend.realestway.com/storage/${images[0].src})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div
          className="mx-auto mb-0 h-1/3 w-2/3 p-2 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <ImageCarousel images={images} />
        </div>
      </div>
      <div className="w-full justify-center flex text-sm py-2">
        <div>
          <p className="text-lg font-semibold text-[#100073]">
            {title?.split(" ").slice(0, 4).join(" ")}{" "}
            {title?.split(" ").length > 4 ? "..." : ""}
          </p>
          <p className="text-sm text-gray-500">{house?.location.address}</p>
        </div>
      </div>
      <div className="flex justify-between py-2">
        {isAuthenticated ? (
          <Link
            to={`/property/${uniqueId}`}
            className="text-lg sm:text-xl text-[#00A256] font-bold hover:text-green-300"
          >
            Views Details
          </Link>
        ) : (
          <div className="flex items-center justify-around">
            <div className="relative text-lg sm:text-xl text-gray-300 font-bold hover:text-blue-300">
              <p> View Details</p>
            </div>
            <span className="absolute  sm:text-lg text-gray-600 font-bold">
              <Lock1 size={18} />
            </span>
          </div>
        )}
        <div
          style={{
            color: house?.availability === "available" ? "#00a256" : "red",
          }}
          className=" text-sm"
        >
          {house?.availability}
        </div>
      </div>
      <p className="text-xs py-2">
        {description?.split(" ").slice(0, 10).join(" ")}...
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
      <div className="items-center flex py-3">
        <span className="m-auto text-[#100073]">
          <span className="text-2xl font-bold w-1/4">
            #{Number(priceBreakdown.basicRent).toLocaleString()}
          </span>
          <span className="text-sm">
            /{priceType === "yearly" && "year"}
            {priceType === "monthly" && "month"}
            {priceType === "daily" && "day"}
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-5 justify-around mt-3 border-red-600">
        {children}
      </div>
    </div>
  );
};

export default Items;
