/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import ChatHelp from "../../components/ChatHelp";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBathtub,
  faBed,
  faEnvelope,
  faHouse,
  faLink,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import { useChats } from "../../contexts/ChatsContext";
import { useAuth } from "../../contexts/AuthContext";
import PageNav from "../../components/PageNav";
import {
  ArrowLeft,
  ArrowLeft2,
  ArrowRight2,
  Message,
  Ruler,
} from "iconsax-reactjs";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import Items from "../../components/Items";
import ChatBox from "../../Chat/ChatBox";

const ItemView = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [house, setHouse] = useState();
  const [loading, setLoading] = useState(true);
  const { setRemoteHouse, houses } = UseHouses();
  const [chatbox, setChatBox] = useState(false);
  const { fetchChats } = useChats();
  const [loadingChats, setLoadingChats] = useState(true);

  useEffect(() => {
    const fetchAllChats = async () => {
      await fetchChats();
      setLoadingChats(false);
    };
    fetchAllChats();
  }, [token]);
  // fetch a particular house

  useEffect(() => {
    if (house?.location?.address) {
      document.title = `${house.location.address} - Realestway`;
    }
  }, [house]);

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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHouse();
  }, [id]);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const { fetchChat, setChat, chats, createChat } = useChats();

  const [selectedImage, setSelectedImage] = useState(null);
  const availableHouses = houses?.data?.filter(
    (house) => house.availability === "available"
  );

  const styleclasses =
    "flex gap-4 pb-10 w-[100%] overflow-x-auto scroll-smooth scrollbar-hide snap-x";

  useEffect(() => {
    if (!loadingChats && chats && house?.user.id) {
      const existingChat = chats?.find(
        (chat) => chat.agent_id === house.user.id
      );
      if (existingChat) setChat(existingChat);
    }
  }, [loadingChats, chats, house, setChat]);

  if (!house) {
    return <Spinner />;
  }

  const {
    priceType,
    bedrooms,
    bathrooms,
    dimension,
    description,
    propertyType,
    totalPrice,
    furnishing,
    amenities,
    medias,
    priceBreakdown,
    minTenancyPeriod,
    location,
  } = house;

  const minTPnum = Number(minTenancyPeriod.split(" ")[0]);

  // const validChats = chats?.filter((chat) => chat?.messages?.length > 0);
  const existingChat = chats?.find(
    (chat) => chat?.support?.id === house?.user.id
  );

  const images = medias.filter((media) => media.type === "image");
  if (loading) return <Spinner />;
  return (
    <div>
      {chatbox && <ChatBox setChatBox={setChatBox} house={house} />}
      <div className="w-[88%] mx-auto dark:text-white">
        <PageNav home={false} />
        <div className="w-full px-6 md:px-10 flex justify-between items-center text-[#00a256] ">
          <button
            className="flex items-center gap-3 px-4 py-2 transition-all"
            onClick={() => navigate("/search")}
          >
            <ArrowLeft color="#00a256" size={24} /> <span>Back</span>
          </button>
        </div>

        {/*Primary Picture and Details*/}
        <div className="flex md:flex-row justify-between gap-3 flex-col">
          <div className="md:w-[55%] w-full py-2 rounded-2xl px-5">
            <Swiper
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".custom-pagination" }}
              modules={[Autoplay, Pagination, Navigation]}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`https://backend.realestway.com/storage/${img.path}`}
                    alt={`House image ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}

              {/* Dots Pagination */}
              <div className="custom-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2"></div>
            </Swiper>
          </div>

          <div className="flex flex-col gap-1 text-lg w-full md:w-[37%] p-4 px-6 shadow-md">
            <span className="flex justify-between items-center">
              {" "}
              <h2 className="text-2xl mb-3">{propertyType}</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="text-[#00a256] gap-1 p-1 justify-items-center justify-center flex hover:bg-[#e8f2ed] text-xs"
              >
                <span>
                  <FontAwesomeIcon icon={faLink} size="30px" />
                </span>{" "}
                <span>Copy link</span>
              </button>
            </span>
            <p className="text-4xl font-semibold text-[#00a256]">
              #{totalPrice.toLocaleString()}
            </p>
            <div className="flex flex-col mb-2">
              <i className="text-gray-400 text-sm">
                Renew with: #
                {Number(priceBreakdown?.basicRent)?.toLocaleString()} /{" "}
                {priceType}
              </i>
            </div>
            <p className="text-lg mb-4">{location?.address}</p>
            <div className="border-b-[1px] flex gap-3 py-2 w-full text-[#808080] border-[#D9D9D9]">
              <FontAwesomeIcon size={24} icon={faBed} color="#808080" />
              <span>
                {" "}
                {bedrooms}-Bedroom{bedrooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="border-b-[1px] flex gap-3 py-2 w-full text-[#808080] border-[#D9D9D9]">
              <FontAwesomeIcon size={24} icon={faBathtub} color="#808080" />
              <span>
                {" "}
                {bathrooms}-Bathroom{bathrooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="border-b-[1px] flex gap-3 py-2 w-full text-[#808080] border-[#D9D9D9]">
              <FontAwesomeIcon size={24} icon={faHouse} color="#808080" />
              <span>
                {" "}
                {propertyType.toLowerCase() === "office"
                  ? "Office"
                  : "Apartment"}
              </span>
            </div>
            <div className="mb-11 flex gap-3 py-2 w-full text-[#808080] border-[#D9D9D9]">
              <Ruler variant="Bold" size={24} color="#808080" />
              <span> {dimension}-sqFts</span>
            </div>
            <div className="w-full flex justify-center">
              <Link
                to={"/order"}
                className="bg-[#00a256] w-full gap-1 p-4 justify-items-center justify-center flex hover:bg-[#7ff3bd] text-lg text-white rounded-lg"
              >
                <span>Secure Apartment</span>
              </Link>
            </div>
            <Link className="text-[#00a256] flex justify-center items-center w-full py-4">
              <u>View on Map</u>
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="py-6 w-full text-black">
          <h3 className="text-xl py-2">Description</h3>
          <p className="text-justify">{description}</p>
        </div>

        {/* Features */}
        <div className="flex w-full gap-3 flex-col md:flex-row md:justify-between">
          <div className="md:w-[50%] w-full">
            <h3 className="text-xl py-2">Features</h3>
            <ul
              className={`text-[#262626] mb-5 ${
                amenities.length > 6 ? "grid grid-cols-2" : "flex flex-col"
              } gap-2`}
            >
              {amenities.map((item) => (
                <li
                  className="p-3 pl-4 border-l-2 border-[#00a256] flex gap-3"
                  key={item}
                >
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.6152 0.0949517C11.9165 0.262894 12.0643 0.614627 11.9736 0.947364L9.98195 8.25003H17.25C17.5487 8.25003 17.8188 8.42721 17.9379 8.70111C18.0569 8.97502 18.0021 9.29344 17.7983 9.51176L7.29831 20.7618C7.06298 21.0139 6.68604 21.073 6.38481 20.9051C6.08357 20.7372 5.9357 20.3854 6.02644 20.0527L8.01808 12.75H0.750016C0.451369 12.75 0.181182 12.5728 0.062156 12.2989C-0.0568695 12.025 -0.00204776 11.7066 0.201725 11.4883L10.7017 0.238287C10.937 -0.0138462 11.314 -0.0729909 11.6152 0.0949517Z"
                      fill="#0A0D17"
                    />
                  </svg>
                  <span> {item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* More Details */}

          <div className="md:w-[50%] w-full">
            <h3 className="text-xl py-2">More Details</h3>
            <ul className="flex flex-col mb-5 gap-2 text-[#262626] ">
              {priceBreakdown?.basicRent && (
                <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                  <span> Basic Rent</span>{" "}
                  <span>
                    #{Number(priceBreakdown.basicRent).toLocaleString()}
                  </span>
                </li>
              )}
              {priceBreakdown?.agreementFee && (
                <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                  <span> Agreement Fee</span>{" "}
                  <span>
                    #{Number(priceBreakdown.agreementFee).toLocaleString()}
                  </span>
                </li>
              )}
              {priceBreakdown?.cautionFee && (
                <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                  <span> Caution Fee</span>{" "}
                  <span>
                    #{Number(priceBreakdown.cautionFee).toLocaleString()}
                  </span>
                </li>
              )}
              {priceBreakdown?.agentFee && (
                <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                  <span> Agent Fee</span>
                  <span>
                    {" "}
                    #{Number(priceBreakdown.agentFee).toLocaleString()}
                  </span>
                </li>
              )}
              <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                <span> Furnished</span>
                <span>
                  {" "}
                  {furnishing === "not-furnished"
                    ? "Not Furnished"
                    : furnishing}
                </span>
              </li>
              <li className="border-b-[1px] border-[#D9D9D9] flex justify-between w-full py-2">
                <span> Minimum Tenancy</span>
                <span>
                  {minTPnum < 12 ? minTPnum : minTPnum / 12}{" "}
                  {minTPnum < 12 ? (
                    <> month {minTPnum === 1 ? "" : "s"}</>
                  ) : (
                    <>year {minTPnum / 12 === 1 ? "" : "s"}</>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Agents and contact */}
        <div className="mt-2 text-black">
          <h3 className="text-xl py-3">Listing Agent</h3>
          {/* <div className="flex flex-col md:flex-row gap-3 "> */}
          <div className="flex gap-3 md:gap-5 w-full items-center">
            <img
              src="/cs-realestway.png"
              alt="agent"
              className="rounded-[50%] hidden md:inline"
              height={150}
              width={180}
            />{" "}
            <img
              src="/cs-realestway.png"
              alt="agent"
              className="rounded-[60%] md:hidden"
              height={100}
              width={120}
            />
            <span className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
              <span className="flex flex-col gap-2 text-lg justify-between py-4">
                <h4>{house.user.fullName}</h4>
                <span className="flex items-center text-[0.95em] md:text-[1em] gap-2 md:gap-3">
                  <FontAwesomeIcon icon={faPhone} color="#00a256" />
                  {house.user.phone}
                </span>
                <span className="flex items-center text-[0.95em] md:text-[1em] gap-2 md:gap-3">
                  <FontAwesomeIcon icon={faEnvelope} color="#00a256" />
                  {house.user.email}
                </span>
              </span>
              {isAuthenticated ? (
                <>
                  {user.role === "user" &&
                    (house?.availability === "available" ? (
                      <button
                        className="bg-[#00a256] text-white rounded-md w-48 md:px-10 md:w-60 p-4 flex gap-2"
                        onClick={() => {
                          setChatBox(true);
                          if (existingChat) {
                            fetchChat(existingChat.id);
                          } else {
                            createChat(
                              house.user.id,
                              house.id,
                              "house_inquiry"
                            );
                          }
                        }}
                      >
                        <Message color="#fff" /> Contact Agent
                      </button>
                    ) : (
                      <button
                        className="bg-[#c4dfd2] text-white text-sm rounded-md w-48 md:px-10 md:w-60 p-4 flex gap-2"
                        disabled
                      >
                        <Message color="#fff" /> Contact Agent
                      </button>
                    ))}
                </>
              ) : (
                <Link to={`/login`}>
                  <button className="bg-[#00a256] text-white text-sm rounded-lg w-48 md:w-60 md:px-10 p-4">
                    Sign In
                  </button>
                </Link>
              )}
            </span>
          </div>
        </div>

        {/* Gallery */}

        <div className="mt-4">
          <h3 className="text-xl py-3">Gallery</h3>
          <div className="relative w-full">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow">
              <ArrowLeft2 size="24" color="white" />
            </button>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow">
              <ArrowRight2 size="24" color="white" />
            </button>
            <div className="w-full flex justify-between flex-row flex-nowrap gap-3 overflow-x-auto scroll-smooth scrollbar-hide snap-x px-0">
              {medias.map((img, index) => (
                <img
                  key={index}
                  src={`https://backend.realestway.com/storage/${img.path}`}
                  alt={`House ${index + 1}`}
                  className="w-64 h-72 object-cover rounded-lg cursor-pointer"
                  onClick={() =>
                    setSelectedImage(
                      `https://backend.realestway.com/storage/${img.path}`
                    )
                  }
                />
              ))}
            </div>
          </div>
          {/* View picture */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black z-[999] bg-opacity-75 flex items-center justify-center">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full max-h-[95vh] rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
        <div className=" my-5 w-full ">
          <h3 className="text-xl py-3">View Property on Map</h3>
          <Map house={house} />
        </div>
        <div className=" my-5 w-full ">
          <div className="flex justify-between items-center">
            <span>
              {" "}
              <h2 className="text-sm text-[#00a256]">FEATURED LISTINGS</h2>
              <h3 className="text-2xl py-3font-semibold">More Like These</h3>
            </span>{" "}
            <button className="p-3 border-[1px] mt-3 border-[#00a256] rounded">
              <Link to={"/search"}>View All Properties</Link>
            </button>
          </div>
          <div className={styleclasses}>
            {availableHouses?.filter((h) => h.id !== house.id)?.length === 0 ? (
              <i className="p-3 mt-4">
                No related houses available right now..
              </i>
            ) : (
              availableHouses
                ?.filter((h) => h.id !== house.id)
                .slice(0, 5)
                .map((hous) => <Items house={hous} key={hous?.id} />)
            )}
          </div>
        </div>
      </div>

      <div className="sm:flex py-4 w-full sm:flex-wrap gap-4">
        <ChatHelp />
      </div>
      <Footer />
    </div>
  );
};

export default ItemView;
