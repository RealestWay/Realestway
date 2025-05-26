// import ImageCarousel from "./ImageCarousel";

import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLock,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { UseHouses } from "../contexts/HouseContext";
import { useState } from "react";

const Items = ({ house, children }) => {
  // const { title, totalPrice, images, uniqueId } = house;
  const { favoritedHouse, removeFavoritedHouse } = UseHouses();
  const {
    title,
    priceBreakdown,
    priceType,
    id,
    description,
    images,
    isFavourited,
  } = house;
  const { isAuthenticated, user, token } = useAuth();
  const [isFav, setIsFav] = useState(isFavourited);
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
            to={`/property/${id}`}
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
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
        )}
        <div className="text-green-500 text-sm">{house?.availability}</div>
      </div>
      <p className="text-xs py-2">
        {description?.split(" ").slice(0, 10).join(" ")}...
      </p>

      {!user?.nin ? (
        <>
          {isFav ? (
            <button
              onClick={() => {
                removeFavoritedHouse(id, token);
                setIsFav(false);
              }}
              style={{ alignItems: "center" }}
              className="flex gap-2 justify-center text-[#00A256] py-3"
            >
              <FontAwesomeIcon icon={faRemove} color="#00A256" />
              <span> saved</span>
            </button>
          ) : (
            <button
              onClick={() => {
                favoritedHouse(id, token);
                setIsFav(true);
              }}
              style={{ alignItems: "center" }}
              className="flex gap-1 justify-center py-3 text-[#100073]"
            >
              <FontAwesomeIcon icon={faBookmark} color="#100073" />{" "}
              <span>save</span>
            </button>
          )}
        </>
      ) : (
        ""
      )}
      <div className="items-center flex py-3">
        <span className="m-auto text-[#100073]">
          <span className="text-2xl font-bold w-1/4">
            #{priceBreakdown.basicRent?.toLocaleString()}
          </span>
          <span className="text-sm">
            /{priceType === "yearly" && "year"}
            {priceType === "monthly" && "month"}
            {priceType === "daily" && "day"}
          </span>
        </span>
      </div>
      <div className="flex justify-around border-red-600">{children}</div>
    </div>
  );
};

export default Items;
