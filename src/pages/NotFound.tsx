import React from "react";
import { Link } from "react-router-dom"; // Using Link from react-router-dom for better routing

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <img
            src="/assets/images/penguin.png"
            alt="Not Found Penguin"
            className="mx-auto w-1/2 md:w-1/3"
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src = "fallback-image-url.png"; // Provide a fallback image URL
            // }}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <p className="text-gray-600 mb-8">
          찾으시는 페이지가 삭제되었거나 이름이 변경되었거나 일시적으로 사용할
          수 없습니다.
        </p>
        <Link
          to="/"
          className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
