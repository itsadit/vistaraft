import { motion } from "framer-motion";

function SubHero() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-transparent px-8 py-16 rounded-lg w-screen max-w-6xl mx-auto">
      {/* Left Section - Images */}
      <div className="relative flex w-full lg:w-1/2 h-96 justify-center">
        {/* Large Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="https://imgs.search.brave.com/dofW4pSwBI5GX9t6vUa-copD-Fjb4vqSTdt_FqcnYcM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvNGstYmVhY2gt/bzg1MHpqMmEwZDd0/YjV5OC5qcGc"
          alt="Hiking"
          className="w-60 h-96 rounded-[40px] object-cover shadow-xl"
        />
        {/* Overlapping Images */}
        <motion.img
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="https://imgs.search.brave.com/dofW4pSwBI5GX9t6vUa-copD-Fjb4vqSTdt_FqcnYcM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvNGstYmVhY2gt/bzg1MHpqMmEwZDd0/YjV5OC5qcGc"
          alt="Bridge"
          className="absolute w-44 h-56 rounded-[35px] object-cover top-10 left-40 lg:left-32 shadow-lg border-4 border-white"
        />
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          src="https://imgs.search.brave.com/dofW4pSwBI5GX9t6vUa-copD-Fjb4vqSTdt_FqcnYcM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvNGstYmVhY2gt/bzg1MHpqMmEwZDd0/YjV5OC5qcGc"
          alt="Venice"
          className="absolute w-40 h-48 rounded-[30px] object-cover bottom-0 left-20 lg:left-14 shadow-lg border-4 border-white"
        />
      </div>

      {/* Right Section - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left mt-10 lg:mt-0"
      >
        <h4 className="text-blue-500 font-semibold text-lg">Traveler's Paradise</h4>
        <h2 className="text-4xl lg:text-5xl font-bold mt-2 leading-tight text-gray-900 dark:text-white">
          Discover Your <span className="text-blue-500">Dream Destination</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
          Experience breathtaking views, luxurious stays, and unforgettable adventures with our curated trips.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6 mt-6 text-center">
          <div>
            <span className="text-blue-700 font-bold text-2xl">100+</span>
            <p className="text-gray-500 text-lg">Holiday Packages</p>
          </div>
          <div>
            <span className="text-blue-700 font-bold text-2xl">172</span>
            <p className="text-gray-500 text-lg">Luxury Hotels</p>
          </div>
          <div>
            <span className="text-blue-700 font-bold text-2xl">68</span>
            <p className="text-gray-500 text-lg">Elite Transport Services</p>
          </div>
          <div>
            <span className="text-blue-700 font-bold text-2xl">32M+</span>
            <p className="text-gray-500 text-lg">Happy Travelers</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SubHero;
