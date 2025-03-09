// import ImageCarousel from "./ImageCarousel";

import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Items = ({ house }) => {
  const { title, price, images, location, id } = house;
  const { isAuthenticated } = useAuth();

  const itemStyle = `rounded-xl w-full items-center justify-center h-[200px]`;

  return (
    <div className="w-[95%] sm:w-[30%] min-w-[300px] p-4 flex-col justify-around shadow-2xl drop-shadow-lg rounded-xl mx-3">
      <div
        className={itemStyle}
        style={{
          background: `url(../src/images${images[0]})`,
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
      <div className="w-full flex justify-between text-sm py-2">
        <p>{title}</p>
        <p>{location.address}</p>
      </div>
      <div className="flex justify-between py-2">
        {isAuthenticated ? (
          <Link
            to={`/ItemView/${id}`}
            className="text-lg sm:text-xl text-blue-600 font-bold hover:text-blue-300"
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
        <div>30 views</div>
      </div>
      <p className="text-xs py-2">
        Exotic and more, kilo tun fe mo? kosewe kosegbo, intact and elegant.
        Tadah!
      </p>
      <div className="items-center flex py-3">
        <span className="m-auto">
          <span className="text-2xl font-bold w-1/4">#{price}</span>
          <span className="text-sm">/year</span>
        </span>
      </div>
    </div>
  );
};

export default Items;
