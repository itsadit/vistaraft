import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      className="bg-center bg-no-repeat bg-cover bg-[url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/bf/5d/0c/pushkar-lake.jpg')] 
      bg-black/50 w-full max-w-full flex items-center justify-center text-center min-h-screen"
    >
      <div className="px-4 mx-auto max-w-screen-xl py-24 lg:py-56">

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Better Trips, a new
          </span>{" "}
          (Experience)
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg font-normal text-gray-300 lg:text-xl p-4"
        >
          Here at Vistaraft, we focus on making the most memorable trip for You.
        </motion.p>

        {/* Buttons with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        >
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-6 text-lg font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-all duration-300 transform hover:scale-105"
          >
            Start Booking
            <svg
              className="w-4 h-4 ml-2 rtl:rotate-180"
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
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-6 sm:ml-4 text-lg font-medium text-white rounded-lg border border-white 
            hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            Discover
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
