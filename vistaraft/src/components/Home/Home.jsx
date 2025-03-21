import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Card/Card";
import Hero from "../Hero/Hero";
import SubHero from "../../components/SubHero/SubHero";
import { useTheme } from "../ThemeContext/ThemeContext";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Start with 4 cards
  const { mode } = useTheme();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/api/destinations`)
      .then((response) => response.json())
      .then((data) => setDestinations(data))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  const generatePositions = () => [
    { scale: 1.3, x: 0, zIndex: 3, opacity: 1 }, // Front card (centered)
    { scale: 1, x: 220, zIndex: 2, opacity: 0.5 }, // Right side
    { scale: 0.8, x: 420, zIndex: 1, opacity: 0.2 }, // Right back
    { scale: 0.8, x: -420, zIndex: 1, opacity: 0.2 }, // Left back
    { scale: 1, x: -220, zIndex: 2, opacity: 0.5 }, // Left side
    { scale: 0, x: 0, zIndex: 0, opacity: 0 }, 
    { scale: 0, x: 0, zIndex: 0, opacity: 0 },
    { scale: 0, x: 0, zIndex: 0, opacity: 0 },
    { scale: 0, x: 0, zIndex: 0, opacity: 0 },// Hidden card
  ];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }
  // Show more destinations
  // const handleLoadMore = () => {
  //   setVisibleCount((prevCount) => prevCount + 3); // Load 4 more on each click
  // };
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if(!hovered){
        nextSlide();
      }
    },3000);
    return () => clearInterval(interval);
  });
  return (
    <div className={`w-full items-center overflow-hidden font-poppins ${mode === 'light' ? '!bg-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode === 'dark' ? 'text-white' : '!text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>
      </div>

      <br />
      <SubHero />
      <br />

      {/* Section Title */}
      <h1 className="text-center mb-2 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Explore The Best
        </span>{" "}
        <span className="text-green-400">Destinations</span>
      </h1>

      {/* Sliding Cards Carousel */}
      <div className="relative h-110  w-full flex items-center justify-center overflow-hidden">
        {destinations.map((destination, i) => {
          const pos = generatePositions()[(i - index + destinations.length) % destinations.length];
          return (
            <motion.div
              key={destination.id}
              className={`absolute ${window.innerWidth<768? 'w-3/5 h-56 mx-4':'w-80'}  rounded-xl shadow-lg`}
              initial={{ opacity: 0 }}
              animate={{ scale: pos.scale, x: pos.x, zIndex: pos.zIndex, opacity: pos.opacity }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: pos.zIndex }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -50) {
                  nextSlide();
                } else if (info.offset.x > 50) {
                  prevSlide();
                }
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Card
                heading={destination.heading}
                description={destination.description}
                photo={destination.photo}
                zIndex={pos.zIndex}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 text-white rounded-lg text-lg" onClick={prevSlide}>
          Prev
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 text-white rounded-lg text-lg" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
