import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Card({ photo, heading, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
    >
      {/* Card Image */}
      <motion.img
        src={photo}
        alt="trip photo"
        className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
      />

      {/* Card Content */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {heading}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>

        {/* Navigate to Payment Page */}
        <Link
          to={`/payment?heading=${encodeURIComponent(heading)}&description=${encodeURIComponent(description)}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
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
    </motion.div>
  );
}

export default Card;
