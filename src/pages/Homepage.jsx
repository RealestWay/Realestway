import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Items from "../components/Items";
import { UseHouses } from "../contexts/HouseContext";
import Spinner from "../components/Spinner";
import ChatHelp from "../components/ChatHelp";
import { useAuth } from "../contexts/AuthContext";
import { useChats } from "../contexts/ChatsContext";
import { useEffect } from "react";
import {
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowLeft2,
  ArrowRight2,
  House,
  House2,
  I24Support,
  Like1,
  Location,
  Messenger,
  SearchFavorite1,
  SearchNormal1,
  ShieldTick,
} from "iconsax-reactjs";
import { shuffleArray } from "../service/shuffle";

const Homepage = () => {
  const { houses, isLoading, filter, setFilter } = UseHouses();
  const { token, user, fetchAgent } = useAuth();
  const { fetchChats } = useChats();

  const availableHouses = houses?.data?.filter(
    (house) => house?.availability === "available"
  );

  const shufflehouse = shuffleArray(availableHouses);

  const locationsListings = [
    {
      location: "Ile-Ife",
      img: "https://i0.wp.com/www.travelwaka.com/wp-content/uploads/2020/10/tour-59.jpg?w=1500&ssl=1",
      listings: availableHouses?.filter(
        (house) => house.location.city === "Ile-Ife"
      ).length,
    },
    {
      location: "Lagos",
      img: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      listings: availableHouses?.filter(
        (house) => house.location.state === "Lagos"
      ).length,
    },
    {
      location: "Abuja",
      img: "https://images.unsplash.com/photo-1721642472312-cd30e9bd7cac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJ1amF8ZW58MHx8MHx8fDA%3D",
      listings: availableHouses?.filter(
        (house) => house.location.state === "Abuja"
      ).length,
    },
    {
      location: "Port-Harcourt",
      img: "/P-H.png",
      listings: availableHouses?.filter((house) =>
        house.location.state.toLowerCase().includes("port-harcourt")
      ).length,
    },
    {
      location: "Akure",
      img: "https://media.istockphoto.com/id/1043971852/photo/idanre-hill-ondo-state-nigeria.webp?a=1&b=1&s=612x612&w=0&k=20&c=URNMDb2LzKyqAjGVvqdfMH5Iokun1ASh0NgPsSckd8g=",
      listings: availableHouses?.filter(
        (house) => house.location.city === "Akure"
      ).length,
    },
    {
      location: "Ibadan",
      img: "https://media.gettyimages.com/id/86045164/photo/aerial-view-dated-on-april-14-2009-shows-port-harcourt-in-river-state-the-commercial-capital.jpg?s=612x612&w=0&k=20&c=O1orhME7wgpUnlTCdb0mOuBiSbQ68ulVjwEiH_qAmcU=",
      listings: availableHouses?.filter(
        (house) => house.location.city === "Ibadan"
      ).length,
    },
  ];

  const styleclasses =
    "flex gap-4 pb-10 w-[100%] overflow-x-auto scroll-smooth scrollbar-hide snap-x";

  useEffect(() => {
    if (token) fetchChats();
    if (user?.role === "agent") fetchAgent(user.id);
  }, [fetchAgent, fetchChats, token, user]);
  return (
    <div className="w-[100vw]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Banner />
          <div className="sm:my-15 mt-28 sm:mt-20 mx-auto sm:flex sm:gap-5 w-5/6">
            <div className="sm:w-1/2 relative p-5">
              <div className="absolute z-999 font-poppins font-bold items-center right-5 flex gap-3 p-2 rounded-md bg-slate-50 top-0 shadow shadow-[#00a256]">
                <span className="rounded-[50%] p-1 border-r-[#00a256] border-x-[1px] bg-white border-l-[#00a256]">
                  <SearchNormal1 color="#00a256" />
                </span>
                <span>Search Smarter</span>
              </div>
              <div
                style={{ backgroundImage: "url(/banner3.jpg)" }}
                className="rounded-lg sm:w-[410px] sm:h-[400px] w-[300px] h-[350px] bg-cover"
              ></div>
              <div className="absolute z-999 font-poppins font-bold items-center left-[0] flex gap-3 p-2 rounded-md bg-slate-50 bottom-0 shadow shadow-[#00a256]">
                <span className="rounded-[50%] p-1 border-r-[#00a256] border-x-[1px] bg-white border-l-[#00a256]">
                  <House variant="Bold" color="#00a256" />
                </span>
                <span>Find Your Dream Home</span>
              </div>
            </div>
            <div className="sm:w-1/2 p-3 sm:pt-6 flex flex-col gap-4">
              <h2 className="text-[#00a256] text-xl font-Helvetica">
                REALESTWAY- REDEFINING REAL ESTATE
              </h2>
              <p className="text-xl mb-4 text-justify">
                Realestway was created to take the stress, confusion, and risk
                out of finding a place to live. Whether you’re a student
                relocating for school, a young professional starting fresh, or a
                landlord searching for genuine tenants, we’re here to make the
                process seamless. With a combination of smart technology and
                trusted human support, we help you search smarter, connect
                faster, and move confidently.{" "}
              </p>
              <span>
                <button className="text-white py-3 px-16 bg-[#00a256] rounded-md">
                  <Link to={"/about"}>Learn more</Link>
                </button>
              </span>
            </div>
          </div>
          <div className="sm:flex sm:gap-4 mx-auto w-5/6 my-16">
            <div className="flex flex-col w-full sm:w-[28%]">
              <h2 className="text-[#00a256] font-bold text-xl">
                AVAILABLE NATIONWIDE
              </h2>
              <h2 className="text-2xl">Explore Locations</h2>
              <p className="text-justify">
                Discover verified homes across multiple cities and communities.
                Whether you’re moving for school, work, or a fresh start,
                Realestway connects you to trusted listings wherever you’re
                headed.
              </p>
            </div>
            <div className="relative w-full md:w-[70%]">
              <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow">
                <ArrowLeft2 size="24" color="white" />
              </button>

              <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow">
                <ArrowRight2 size="24" color="white" />
              </button>

              {/* Scrollable Content */}
              <div className="w-full flex justify-between flex-row flex-nowrap gap-3 overflow-x-auto scroll-smooth scrollbar-hide snap-x">
                {locationsListings.map((city) => (
                  <>
                    {" "}
                    <Link
                      to={"/search"}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          location: city.location || null,
                        })
                      }
                    >
                      {" "}
                      <div
                        key={city.location}
                        className="rounded-2xl bg-cover w-[240px] h-[260px] relative flex flex-col justify-end p-3 text-white snap-start shrink-0"
                        style={{ backgroundImage: `url(${city.img})` }}
                      >
                        <span className="text-xl font-bold">
                          {city.location}
                        </span>
                        <span>{city.listings ?? 0} listings</span>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className=" mx-auto w-5/6 my-16">
            <div className="flex flex-col w-full justify-center">
              <h2 className="text-[#00a256] font-bold flex justify-center">
                BUILT FOR YOUR JOURNEY
              </h2>
              <h2 className="text-2xl flex justify-center">
                What You Can DO With Realestway
              </h2>
              <p className="flex text-lg justify-center">
                Whether you&apos;re searching for a new place, listing your property,
                or relocating to a new city, Realestway gives you the tools and
                support you need to make smart housing decisions — stress-free.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-2 flex flex-col gap-6 rounded-md w-full mt-8">
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <House2 size={30} color="#00a256" />
                <span className="flex flex-col">
                  <h3>Find Verified Home</h3>
                  <p>
                    Browse trusted listings that match your lifestyle and
                    budget.
                  </p>
                </span>{" "}
              </div>{" "}
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <Location size={30} color="#00a256" />
                <span className="flex flex-col">
                  {" "}
                  <h3>Search By Location</h3>{" "}
                  <p>
                    Use smart filters to explore listings in your preferred
                    area.
                  </p>
                </span>
              </div>
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <Like1 size={30} color="#00a256" />
                <span className="flex flex-col">
                  <h3>Connect With Real Agents</h3>
                  <p>Chat and deal only with verified landlords and agents.</p>
                </span>{" "}
              </div>{" "}
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <ShieldTick size={30} color="#00a256" />
                <span className="flex flex-col">
                  {" "}
                  <h3>Make Secure Payments</h3>{" "}
                  <p>
                    Enjoy safe transactions with a transparent breakdown of
                    fees.
                  </p>
                </span>
              </div>
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <House size={30} color="#00a256" />
                <span className="flex flex-col">
                  {" "}
                  <h3>List and Manage Properties</h3>{" "}
                  <p>
                    Landlords and agents can easily manage listings in one
                    place.
                  </p>
                </span>
              </div>
              <div className="border-[1px] border-[#0A0D17] flex p-3 gap-3 rounded">
                <I24Support size={30} color="#00a256" />
                <span className="flex flex-col">
                  {" "}
                  <h3>Resolve Issues Fast</h3>{" "}
                  <p>
                    Our support team helps with any concerns — quickly and
                    fairly.
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className=" mx-auto w-5/6 my-16">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-[#00a256] font-bold ">FEATURED LISTINGS</h2>
              <h2 className="text-2xl ">Top Priorities You&apos;ll Love</h2>
              <span className="sm:flex sm:justify-between">
                <p className="flex text-lg justify-center w-full sm:w-3/5">
                  Carefully selected homes offering the best value, security,
                  and convenience. Browse trusted properties with verified
                  agents, great locations, and fair prices.
                </p>
                <button className="p-3 border-[1px] mt-3 border-[#00a256] rounded">
                  <Link to={"/search"}>View All Properties</Link>
                </button>
              </span>
            </div>
            <div className={styleclasses}>
              {availableHouses?.data?.length === 0 ? (
                <p>No houses available right now..</p>
              ) : (
                shufflehouse
                  ?.slice(0, 5)
                  .map((house) => <Items house={house} key={house?.id} />)
              )}
            </div>
            <div className="flex justify-end w-5/6 mx-auto mb-5">
              <ArrowCircleLeft2 size={24} variant="Bold" color="#00a256" />
              <ArrowCircleRight2 size={24} variant="Bold" color="#00a256" />
            </div>
          </div>

          <div className="w-5/6 mx-auto bg-[#100073] text-white sm:flex sm:flex-row flex-col gap-5 flex justify-around p-10 sm:p-20">
            <div className="flex sm:p-3 gap-3 rounded">
              <SearchFavorite1 size={30} color="#00a256" />
              <span className="flex flex-col">
                {" "}
                <h3>Search</h3>{" "}
                <p className="text-sm">
                  Filter homes by location, budget, and amenities.
                </p>
              </span>
            </div>
            <div className="flex sm:p-3 gap-3 rounded">
              <Messenger variant="Bold" size={30} color="#00a256" />
              <span className="flex flex-col">
                {" "}
                <h3>Connect</h3>{" "}
                <p className="text-sm">
                  Chat with verified agents and schedule viewings.{" "}
                </p>
              </span>
            </div>
            <div className="flex sm:p-3 gap-3 rounded">
              <House2 variant="Bold" size={30} color="#00a256" />
              <span className="flex flex-col">
                {" "}
                <h3>Rent or Buy Safely</h3>{" "}
                <p className="text-sm">
                  Pay securely, get support, and move in confidently.
                </p>
              </span>
            </div>
          </div>

          <ChatHelp />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Homepage;
