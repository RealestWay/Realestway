import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Items from "../components/Items";
import { UseHouses } from "../contexts/HouseContext";
import Spinner from "../components/Spinner";
import ChatHelp from "../components/ChatHelp";

const Homepage = () => {
  const { houses, isLoading } = UseHouses();
  return (
    <div className="w-[100vw]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Banner />
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
                to={"/ItemsPage"}
                className="text-blue-400 font-semibold text-2xl"
              >
                View All
              </Link>
            </div>
          </div>
          <div
            className="flex gap-4 overflow-x-hidden scroll-smooth scrollbar-hide snap-x pb-10 max-w-100vw"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {houses.map((house) => (
              <Items house={house} key={house.id} />
            ))}
          </div>
          <ChatHelp />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Homepage;
