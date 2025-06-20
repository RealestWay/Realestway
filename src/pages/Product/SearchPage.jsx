import { NavLink, Outlet } from "react-router-dom";
import PageNav from "../../components/PageNav";
import { useState } from "react";
import Footer from "../../components/Footer";

const SearchPage = () => {
  const navItems = [
    { name: "Rent", path: `/search` },
    { name: "Buy", path: `/search/buy` },
  ];
  const [page, setPage] = useState("/search");
  return (
    <div className="w-full relative">
      <PageNav home={false} />
      <h3 className="text-center text-3xl font-semibold text-gray-800 mb-6">
        Find Homes That Truly Fit You
      </h3>
      <p className="mb-10 text-center">
        Browse verified listings across trusted locations{" "}
      </p>
      <div className="w-full m-auto mt-5 flex rounded-xl font-poppins">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`w-[50%] text-center  ${
              item.path === page
                ? "py-2 border-b-2 border-[#00a256] text-black font-bold border-0"
                : "py-2 border-0 text-gray-600 "
            } py-2  border-0`}
            onClick={() => setPage(item.path)}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default SearchPage;
