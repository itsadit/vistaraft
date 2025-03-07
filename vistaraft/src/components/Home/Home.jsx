import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Card/Card";
import Hero from "../Hero/Hero";
import SubHero from "../../components/SubHero/SubHero";
import { useTheme } from "../ThemeContext/ThemeContext";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Start with 4 cards
  const { mode } = useTheme();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/api/destinations`)
      .then((response) => response.json())
      .then((data) => setDestinations(data))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  // Show more destinations
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 4 more on each click
  };

  return (
    <div className={`w-full overflow-hidden font-poppins ${mode === 'light' ? '!bg-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode === 'dark' ? 'text-white' : '!text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>
      </div>

      <br />
      <SubHero />
      <br />

      {/* Section Title */}
      <h1 className="text-center mb-8 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Explore The Best
        </span>{" "}
        <span className="text-green-400">Destinations</span>
      </h1>

      {/* Grid Container for Cards */}
      <div id="discover" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-auto-fit gap-8 px-8 pb-12 max-w-screen-lg mx-auto">
        {destinations.slice(0, visibleCount).map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              heading={destination.heading}
              description={destination.description}
              photo={destination.photo}
            />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < destinations.length && (
        <motion.button
          onClick={handleLoadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block mx-auto mb-12 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-lg"
        >
          See More
        </motion.button>
      )}
    </div>
  );
}

export default Home;
