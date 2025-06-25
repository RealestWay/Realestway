import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { ArrowLeft } from "iconsax-reactjs";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[88%] mx-auto items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <PageNav home={false} />
      <div className="w-full px-6 md:px-10 flex justify-between items-center text-[#00a256] ">
        <button
          className="flex items-center gap-3 px-4 py-2 transition-all"
          onClick={() => navigate("/")}
        >
          <ArrowLeft color="#00a256" size={24} /> <span>Back</span>
        </button>
      </div>
      <div className="max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Page Unavailable
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, this page is temporarily unavailable. Please check back later.
        </p>
        <Link
          to={"/"}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
