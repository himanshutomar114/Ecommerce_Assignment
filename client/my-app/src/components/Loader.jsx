import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        {/* Loading text */}
        <p className="text-gray-300 text-lg">{text}</p>
      </div>
    </div>
  );
};

export default Loader;