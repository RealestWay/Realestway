/* eslint-disable react/prop-types */
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect } from "react";
import { UseHouses } from "../../contexts/HouseContext";

const ItemView = () => {
  const { houses, fetchHouses } = UseHouses();
  const location = useLocation();
  const { id } = useParams();
  const house = houses.find((h) => h.id === id);
  const { images } = house;

  const navItems = [
    { name: "About", path: `/ItemView/${id}` },
    { name: "On map", path: `/ItemView/${id}/mapDetails` },
  ];
  useEffect(() => {
    if (!houses) console.log("there's no house in cached");
    fetchHouses();
  }, [houses]);
  return (
    <div>
      <div>
        <div
          className="w-full py-4"
          style={{
            background: `url('../src/images${images[0]}')`,
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <div
            className="mx-auto mb-0 h-5/6 w-5/6 p-2 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`../src/images${img}`}
                    alt={`House image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="w-3/5 m-auto mt-5 justify-between flex border border-blue-500 border-[2px] rounded-xl">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`w-[50%] text-center text-blue-500 ${
                location.pathname && item.path === `/ItemView/${id}`
                  ? "py-2 border border-r-2 border-blue-500 border-0 rounded-l-lg"
                  : "py-2 border rounded-r-lg border-l-2 border-0 border-blue-500"
              } ${
                location.pathname === item.path ? "text-white bg-blue-500" : ""
              } py-2 border border-blue-500 border-0`}
            >
              {" "}
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="sm:flex py-4 w-full sm:flex-wrap gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ItemView;
