// import ImageCarousel from "./ImageCarousel";

import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Items = ({ house }) => {
  // const { title, totalPrice, images, id } = house;

  const { title, totalPrice, id, description } = house;
  const [saved, setSaved] = useState(false);
  const { isAuthenticated } = useAuth();
  const images = [
    {
      src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1616593918824-4fef16054381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      scr: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      scr: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1628744448839-a475cc0e90c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const itemStyle = `rounded-xl w-full items-center justify-center h-[200px]`;

  return (
    <div className="w-[95%] sm:w-[30%] min-w-[300px] p-4 flex-col justify-around shadow-2xl drop-shadow-lg rounded-xl mx-3">
      <div
        className={itemStyle}
        style={{
          // background: `url(../src/images${images[0].src})`,
          background: `url(${images[0].src})`,
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
          <p className="text-lg font-semibold">
            {title.split(" ").slice(0, 4).join(" ")}{" "}
            {title.split(" ").length > 4 ? "..." : ""}
          </p>
          <p className="text-sm text-gray-500">{house.address}</p>
        </div>
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
        {description.split(" ").slice(0, 10).join(" ")}...
      </p>

      {saved ? (
        <button
          onClick={() => {
            // removeItemFromSavedItems(id);
            setSaved(false);
          }}
          className="text-blue-700 py-3"
        >
          <FontAwesomeIcon icon={faPlusCircle} /> saved
        </button>
      ) : (
        <button
          onClick={() => {
            // addItemToSavedItems(id);
            setSaved(true);
          }}
          className=" py-3"
        >
          <FontAwesomeIcon icon={faPlusCircle} /> save
        </button>
      )}
      <div className="items-center flex py-3">
        <span className="m-auto">
          <span className="text-2xl font-bold w-1/4">
            #{totalPrice.toLocaleString()}
          </span>
          <span className="text-sm">/year</span>
        </span>
      </div>
    </div>
  );
};

export default Items;
