import React from "react";
// import { Link } from "react-router-dom";
// import { FiHome } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-white text-center px-6">
      {/* Floating 404 */}
      <div className="relative">
        {/* <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse flex items-center justify-center shadow-lg"> */}
          <h1 className="text-white text-6xl font-bold drop-shadow-lg">404</h1>
        {/* </div> */}
        {/* <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div> */}
      </div>

      {/* Text */}
      {/* <h2 className="mt-8 text-3xl font-bold text-gray-800">
        Oops! Page not found.
      </h2> */}
      <p className="mt-2 text-gray-500 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      {/* <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
      >
        <FiHome className="text-xl" />
        Go Back Home
      </Link> */}

      {/* Decorative wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#c084fc"
          fillOpacity="0.2"
          d="M0,224L80,197.3C160,171,320,117,480,96C640,75,800,85,960,122.7C1120,160,1280,224,1360,256L1440,288V320H0Z"
        ></path>
      </svg>
    </div>
  );
};

export default NotFoundPage;
