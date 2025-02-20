import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";
import React, { useEffect, useRef, useState } from 'react';
function Card({ photo, heading, description }) {
  const { mode } = useTheme();
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [photoWidth, setPhotoWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (imageRef.current && cardRef.current) {
      setPhotoWidth(imageRef.current.offsetWidth);
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, []);
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`max-w-sm h-full flex flex-col ${mode === 'light' ? '!bg-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} border ${mode === 'light' ? '!border-gray-100' : 'border-gray-900'} rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl`}
    >
      {/* Card Image */}
      <motion.img
        src={photo}
        alt="trip photo"
        className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
        initial={{ x: 0 }}
        animate={{ x: photoWidth > cardWidth ? ["-30%", "0%"] : "0%" }} // Move only if wider
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h5 className={`mb-2 text-2xl font-bold tracking-tight ${mode === 'dark' ? 'text-white' : '!text-gray-900'}`}>
          {heading}
        </h5>

        <p className={`mb-3 font-normal flex-grow ${mode === 'dark' ? 'text-gray-400' : '!text-gray-700'}`}>
          {description}
        </p>

        {/* Button Container */}
        <div className="mt-auto">
          <Link
            to={`/payment?heading=${encodeURIComponent(heading)}&description=${encodeURIComponent(description)}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium !text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Let's go
            <svg
              className="rtl:rotate-180 w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>

  );
}

export default Card;
