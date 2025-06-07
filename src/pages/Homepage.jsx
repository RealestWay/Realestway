import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Items from "../components/Items";
import { UseHouses } from "../contexts/HouseContext";
import Spinner from "../components/Spinner";
import ChatHelp from "../components/ChatHelp";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useChats } from "../contexts/ChatsContext";
import { useEffect } from "react";

const Homepage = () => {
  const { houses, isLoading } = UseHouses();
  const { isAuthenticated, token } = useAuth();
  const { fetchChats } = useChats();
  const loactionsListings = [
    {
      location: "Lagos",
      img: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("lagos")
      ).length,
    },
    {
      location: "Abuja",
      img: "https://images.unsplash.com/photo-1721642472312-cd30e9bd7cac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJ1amF8ZW58MHx8MHx8fDA%3D",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("abuja")
      ).length,
    },
    {
      location: "Port-Harcourt",
      img: "https://media.gettyimages.com/id/86045164/photo/aerial-view-dated-on-april-14-2009-shows-port-harcourt-in-river-state-the-commercial-capital.jpg?s=612x612&w=0&k=20&c=O1orhME7wgpUnlTCdb0mOuBiSbQ68ulVjwEiH_qAmcU=",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("port-harcourt")
      ).length,
    },
    {
      location: "Akure",
      img: "https://media.istockphoto.com/id/1043971852/photo/idanre-hill-ondo-state-nigeria.webp?a=1&b=1&s=612x612&w=0&k=20&c=URNMDb2LzKyqAjGVvqdfMH5Iokun1ASh0NgPsSckd8g=",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("akure")
      ).length,
    },
    {
      location: "Ibadan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM89r5waaMC3n5Dktq6dNC3nH0dGMPBrYNkQ&s",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("ibadan")
      ).length,
    },
    {
      location: "Ife",
      img: "",
      listings: houses.data?.filter((house) =>
        house.location.address.toLowerCase().includes("ife")
      ).length,
    },
  ];
  const styleclasses = isAuthenticated
    ? "flex gap-4  pb-10 w-[100%] overflow-x-auto scroll-smooth scrollbar-hide snap-x"
    : "flex gap-4  pb-10 w-[100%] overflow-hidden";
  useEffect(() => {
    fetchChats();
  }, [token]);
  return (
    <div className="w-[100vw]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Banner />
          <div className="my-10">
            <div className="flex justify-center">
              <div className="items-center">
                <h2 className="font-bold text-3xl">Explore Locations</h2>
                <p className="text-sm">
                  Check houses available in different locations
                </p>
              </div>
            </div>
            <div className="flex sm:rounded-[200px] md:rounded-[250px] w-4/5 sm:w-1/3 mx-auto px-4 gap-5 p-2 justify-start overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {loactionsListings.map((itm, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0"
                  style={{ minWidth: "100px" }}
                >
                  <div className="my-3 flex flex-col items-center">
                    <div
                      style={{
                        backgroundImage: `url(${itm.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="rounded-full w-20 h-20"
                    />
                    <p className="font-bold text-gray-800 text-sm mt-2">
                      {itm.location}
                    </p>
                    <p className="text-xs text-gray-500">
                      {itm.listings} listings
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-20 align-middle items-center">
              <FontAwesomeIcon icon={faArrowLeft} color="#100073" />
              <FontAwesomeIcon icon={faArrowRight} color="#100073" />
            </div>
          </div>
          <div className="flex">
            <div className="w-full sm:flex justify-between p-10">
              <div className="sm:w-3/5 w-full">
                <h3 className="text-blue-300">New Posts</h3>
                <h1 className="md:text-5xl sm:text-4xl text-2xl font-semibold mt-5 mb-4 sm:mb-7">
                  Popular Offers of The Day
                </h1>
                <p className="text-sm">
                  Experience fantastic benefits, better rates, security and
                  discount when you make use of our websites
                </p>
              </div>
              <Link
                to={"/search"}
                className="text-blue-400 font-semibold text-2xl"
              >
                View All
              </Link>
            </div>
          </div>

          <div className={styleclasses}>
            {houses.data?.length === 0 ? (
              <p>No houses available right now..</p>
            ) : (
              houses.data
                ?.slice(0, 3)
                .map((house) => <Items house={house} key={house?.id} />)
            )}
          </div>
          <ChatHelp />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Homepage;
