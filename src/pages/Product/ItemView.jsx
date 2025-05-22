/* eslint-disable react/prop-types */
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import ChatHelp from "../../components/ChatHelp";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";

const ItemView = () => {
  const location = useLocation();
  const { id } = useParams();
  const [house, setHouse] = useState();
  const [loading, setLoading] = useState(true);
  const { setRemoteHouse } = UseHouses();

  // fetch a particular house

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await fetch(
          `https://backend.realestway.com/api/listings/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setHouse(data.data);
        setRemoteHouse(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHouse();
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { name: "About", path: `/ItemView/${id}` },
    { name: "On map", path: `/ItemView/${id}/mapDetails` },
  ];

  if (loading) return <Spinner />;
  return (
    <div>
      <div>
        <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-[#100073]">
          <button
            className="flex items-center px-4 py-2 bg-[#100073]  hover:bg-blue-300 transition-all"
            onClick={() => navigate("/search")}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
          </button>
        </div>
        <div
          className="w-full py-4"
          style={{
            background: `url(https://backend.realestway.com/storage/${house.images[0].src})`,
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
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] text-[#100073]"
            >
              {house?.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`https://backend.realestway.com/storage/${img.src}`}
                    alt={`House image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="w-3/5 m-auto mt-5 flex border-[#100073] border-[2px] rounded-xl">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`w-[50%] text-center text-[#100073] ${
                location.pathname && item.path === `/ItemView/${id}`
                  ? "py-2 border-r-2 border-0 rounded-l-lg"
                  : "py-2 rounded-r-lg border-l-2 border-0 "
              } ${
                location.pathname === item.path ? "text-white bg-[#100073]" : ""
              } py-2  border-0`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="sm:flex py-4 w-full sm:flex-wrap gap-4">
          <Outlet context={{ house }} />
          <ChatHelp />
        </div>
      </div>
    </div>
  );
};

export default ItemView;
