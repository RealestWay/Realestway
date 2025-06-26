import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UseHouses } from "../contexts/HouseContext";
import { useEffect, useState } from "react";
import { SaveAdd, SaveMinus } from "iconsax-reactjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faHome } from "@fortawesome/free-solid-svg-icons";

const BASE = "https://backend.realestway.com/api";

const Items = ({ house, children }) => {
  // const { title, totalPrice, images, uniqueId } = house;
  const { favoritedHouse, removeFavoritedHouse } = UseHouses();
  const { title, priceBreakdown, bathrooms, bedrooms, priceType, id, medias } =
    house;

  const [isFav, setIsFav] = useState(false);
  const { user, token } = useAuth();

  async function favh(id, tok) {
    try {
      const res = await fetch(`${BASE}/favourites/${id}/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${tok}`,
        },
      });
      const data = await res.json();
      setIsFav(data.data.is_favourited);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) user?.companyName ? "" : favh(id, token);
  }, [token, id]);

  const itemStyle = `rounded-xl w-full items-center justify-center h-[250px] md-[300px] relative`;

  return (
    <div className="min-w-[350px] w-[98%] md:w-[46%] p-3 pb-1 flex-col gap-4 justify-around shadow-2xl drop-shadow-lg rounded-lg mx-3">
      <div
        className={itemStyle}
        style={{
          // background: `url(../src/images${images[0].src})`,
          background: `url(https://backend.realestway.com/storage/${medias[0].path})`,
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
          {!user?.role === "agent" ? (
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
                  <SaveMinus color="#00A256" />
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
                  <SaveAdd color="#100073" /> <span>save</span>
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <p className="text-sm text-gray-500">{house?.location?.address}</p>
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
          to={`/property/${id}`}
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

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { SaveAdd, SaveMinus } from "iconsax-reactjs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBathtub,
//   faBed,
//   faHome,
//   faLink,
// } from "@fortawesome/free-solid-svg-icons";

// const Items = () => {
//   const dummyUser = {
//     id: "U123",
//     fullName: "John Doe",
//     email: "user@example.com",
//     phone: "08000000000",
//     companyName: null, // Add company name to simulate agent
//     nin: null, // Add NIN to simulate agent
//   };

//   const [isFav, setIsFav] = useState(false);

//   const house = {
//     title: "Modern 2 Bedroom Apartment in Lekki",
//     priceBreakdown: {
//       basicRent: 300000,
//     },
//     bathrooms: 2,
//     bedrooms: 2,
//     priceType: "yearly",
//     id: "dummy-001",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1613977257363-dbb3d7c31880?w=600",
//       },
//     ],
//     propertyType: "apartment",
//     availability: "available",
//     location: {
//       address: "Lekki Phase 1, Lagos",
//     },
//   };

//   useEffect(() => {
//     if (!dummyUser?.companyName) {
//       setIsFav(false);
//     }
//   }, []);

//   const itemStyle = `rounded-xl w-full items-center justify-center h-[250px] md-[300px] relative`;

//   return (
//     <div className="min-w-[350px] w-[98%] md:w-[46%] p-3 pb-1 flex-col gap-4 justify-around shadow-2xl drop-shadow-lg rounded-lg mx-3">
//       <div
//         className={itemStyle}
//         style={{
//           background: `url(${house.images[0]?.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             color: house.availability === "available" ? "white" : "red",
//           }}
//           className="bg-white flex justify-center font-Poppins bg-opacity-30 rounded-lg px-2 py-1 right-0 w-1/4 top-0 text-sm absolute"
//         >
//           {house.availability === "available" ? "Available" : "Not available"}
//         </div>
//       </div>

//       <div className="w-full justify-center flex flex-col text-sm py-2">
//         <div className="flex justify-between items-center">
//           <p className="text-lg font-semibold text-[#262626]">
//             {house.title.split(" ").slice(0, 4).join(" ")}{" "}
//             {house.title.split(" ").length > 4 ? "..." : ""}
//           </p>
//           {!dummyUser?.nin && (
//             <>
//               {isFav ? (
//                 <button
//                   onClick={() => setIsFav(false)}
//                   className="flex gap-2 justify-center text-[#00A256] py-3"
//                 >
//                   <SaveMinus color="#00A256" />
//                   <span> saved</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsFav(true)}
//                   className="flex gap-1 justify-center py-3 text-[#100073]"
//                 >
//                   <SaveAdd color="#100073" /> <span>save</span>
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//         <p className="text-sm text-gray-500">{house.location.address}</p>
//       </div>

//       <div className="flex justify-between text-sm">
//         <div className="bg-[#F0F0F7] border-1 border-[#DCDCEB] rounded-xl py-1 px-2">
//           <FontAwesomeIcon icon={faBed} color="#0A0D17" /> {house.bedrooms}
//           -bedrooms
//         </div>
//         <div className="bg-[#F0F0F7] border-1 border-[#DCDCEB] rounded-xl p-1">
//           <FontAwesomeIcon icon={faBathtub} color="#0A0D17" /> {house.bathrooms}
//           -bathrooms
//         </div>
//         <div className="bg-[#F0F0F7] border-1 border-[#DCDCEB] rounded-xl p-1">
//           <FontAwesomeIcon icon={faHome} color="#0A0D17" />{" "}
//           {house.propertyType.toLowerCase() === "office"
//             ? "Office"
//             : "Apartment"}
//         </div>
//       </div>

//       <div className="flex justify-between items-center pt-2">
//         <div className="flex flex-col gap-1">
//           <span className="text-gray-500 text-xs">Price</span>
//           <div className="items-center flex">
//             <span className="m-auto">
//               <span className="text-xl font-bold w-1/4">
//                 #{Number(house.priceBreakdown?.basicRent).toLocaleString()}
//               </span>
//               <span className="text-sm">
//                 /{house.priceType === "yearly" && "yr"}
//                 {house.priceType === "monthly" && "mnt"}
//                 {house.priceType === "daily" && "day"}
//               </span>
//             </span>
//           </div>
//         </div>
//         <Link
//           to={`/property/${house.uniqueId}`}
//           className="bg-[#00A256] w-[60%] flex items-center justify-center text-white py-2 mt-2 px-4 text-sm rounded-lg font-bold hover:text-green-300"
//         >
//           View Property Details
//         </Link>
//       </div>

//       <div className="flex flex-col gap-5 justify-around mt-3">
//         {/* Optional children */}
//         <button
//           className="bg-[#100073] font-montserrat text-white px-7 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
//           // onClick={() => {
//           //   const val =
//           //     hous.availability === "available"
//           //       ? "not-available"
//           //       : "available";
//           //   const formData = new FormData();
//           //   formData.append("availability", val);
//           //   updateHouse(hous.uniqueId, token, formData);
//           // }}
//         >
//           Click to change {"available"}
//         </button>
//         <span className="flex justify-between">
//           <button
//             // onClick={() => {
//             //   navigator.clipboard.writeText(window.location.href);
//             //   alert("Link copied to clipboard!");
//             // }}
//             className="bg-[#00a256] w-max-[100px] text-xs text-white p-2 py-2 rounded-lg"
//           >
//             <FontAwesomeIcon icon={faLink} /> Share Link
//           </button>
//           <button
//             className="bg-red-500 font-montserrat text-white px-5 py-1 rounded-lg hover:bg-red-600 transition duration-300"
//             // onClick={() => {
//             //   setOpenDelete(true);
//             //   setDeleteHouseId(hous.uniqueId);
//             // }}
//           >
//             Delete
//           </button>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Items;
