import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
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
