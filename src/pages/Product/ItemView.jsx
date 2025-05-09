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

const ItemView = () => {
  const location = useLocation();
  const { id } = useParams();
  const [house, setHouse] = useState();
  const [loading, setLoading] = useState(true);

  // fetch a particular house

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await fetch(
          `https://backend.realestway.com/api/listings/${id}`
        );
        const data = await res.json();
        setHouse(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHouse();
  }, []);

  // const images = [
  //   {
  //     src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1616593918824-4fef16054381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     scr: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     scr: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1628744448839-a475cc0e90c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdXNlJTIwZXh0ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  //   },
  // ];

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
            // background: `url('../src/images${images[0].src}')`,
            background: `url(backend.realestway.com/${house.images[0].src})`,
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
                    src={img.src}
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
              {" "}
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
