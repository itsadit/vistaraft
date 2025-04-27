import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import Itenary from "../Itenary/Itenary";
import { motion, AnimatePresence } from 'framer-motion';

function Header() {

  const location = useLocation();
  const { mode, themeToggler } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const filterTrips = (type) => {
    const filteredDestinations = destinations.filter((destination) => destination.inter === type);
  }
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/api/destinations`);
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);
  // State for dropdown visibility
  const toggleDropdown = (type) => {
    setMobileDropdown(mobileDropdown === type ? null : type);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const dropdownStyle = `pl-4 space-y-2 border-l-2 ${
    mode === "dark" ? "border-gray-600" : "border-gray-300"
  }`;

  const linkStyle = `block px-4 py-2 rounded-lg transition-colors duration-300 ${
    mode === "dark" ? "bg-gray-700 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-900 hover:bg-blue-100"
  }`;
  const [itineraries, setItineraries] = useState([]); // State for itineraries
  const [openDropdown, setOpenDropdown] = useState(null); // "dom" or "international" or null
  const [mobileDropdown,setMobileDropdown] = useState(null); // "dom" or "international" or null
  const handleMouseEnter = (event, inter) => {
    setAnchorEl(event.currentTarget);
    setOpenDropdown(inter); // Set which dropdown should open
  };

  const handleClose = () => {
    setOpenDropdown(null);
    setAnchorEl(null);
  };
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Fetch itineraries from the backend
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch("/api/destinations"); // Replace with your API endpoint
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };
  return (
    <nav
      className={` ${mode === "light"
        ? "!bg-gray-100"
        : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        } ${mode === "dark" ? "text-white" : "!text-gray-900"
        } sticky top-0 left-0 w-screen bg-white shadow-lg border-b border-gray-200 z-50`}
    >
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-1.5">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={
              mode === "light"
                ? import.meta.env.VITE_LOGO
                : import.meta.env.VITE_LOGO_WHITE
            }
            className="h-16"
            alt="Vistaraft Logo"
          />
          <span
            className={`text-2xl font-semibold whitespace-nowrap ${mode === "dark" ? "text-white" : "text-gray-900"
              }`}
          >
            VISTARAFT
          </span>
        </Link>

        {/* Navigation Links and Buttons */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Home
            </Link>
            <Link
              to="https://www.joobiragalaxy.in"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
              target="_blank"
            >
              Our Hotels
            </Link>

            <div className="relative" onMouseLeave={()=>{setOpenDropdown(null)}}>
              <div
                onMouseEnter={(e) => handleMouseEnter(e, "dom")}
                className={`nav-link flex cursor-pointer text-lg font-medium transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                  } hover:text-gray-500`}
              >
                Domestic
                <motion.svg
                animate={{ rotate: openDropdown === "dom" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 ml-1 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
              </div>
              {openDropdown === "dom" && (
                <Itenary inter={"dom"} isDropdownOpen={true} anchorEl={anchorEl} onClose={handleClose} />
              )}
            </div>

            <div className="relative" onMouseLeave={handleClose}>
              <div
                onMouseEnter={(e) => handleMouseEnter(e, "international")}
                className={`nav-link flex  text-lg font-medium transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                  } hover:text-gray-500`}
              >
                International
                <motion.svg
                animate={{ rotate: openDropdown === "international" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 ml-1 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
              </div>
              {openDropdown === "international" && (
                <Itenary inter={"international"} isDropdownOpen={true} anchorEl={anchorEl} onClose={handleClose} />
              )}
            </div>

            {/* Itinerary Dropdown
            <div className="relative">
              <div
                onClick={handleClick}
                className={`nav-link text-lg font-medium transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                  } hover:text-gray-500 cursor-pointer`}
              >
                Itienary
              </div>
              <Itenary isDropdownOpen={isDropdownOpen} anchorEl={anchorEl} onClose={handleClose} />
            </div> */}
            <Link
              to="tel:8384076491"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Call Us
            </Link>
            {/* <Link
              to="/about"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              About Us
            </Link> */}
            {/* <Link
              to="/contact"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Contact Us
            </Link> */}
          </div>

          {/* Dark Mode Toggle Button */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ml-4 p-2 focus:outline-none ${mode === "light"
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-gray-700 hover:bg-gray-800"
            }`}
          onClick={toggleNavbar}
        >
          <img
            src={
              !isExpanded
                ? import.meta.env.VITE_MENU
                : import.meta.env.VITE_CROSS
            }
            className="h-8 w-8"
            alt="Menu Toggle"
          />
        </button>
      </div>

     {/* Mobile Navigation Menu */}
{isExpanded && (
  <div
    className={`md:hidden p-4 space-y-6 ${
      mode === "light" ? "bg-gray-100" : "bg-black"
    }`}
  >
    {/* Home */}
    <Link
      to="/"
      className={`block text-lg font-semibold ${
        mode === "dark" ? "text-white" : "text-gray-900"
      } hover:text-gray-500 transition duration-300`}
    >
      Home
    </Link>

    {/* Our Hotels */}
    <Link
      to="https://www.joobiragalaxy.in"
      className={`block text-lg font-semibold ${
        mode === "dark" ? "text-white" : "text-gray-900"
      } hover:text-gray-500 transition duration-300`}
    >
      Our Hotels
    </Link>

    <div>
  <div
    onClick={() => setMobileDropdown(mobileDropdown === "dom" ? null : "dom")}
    className="text-lg flex font-semibold cursor-pointer text-[#2ad4d7] mb-2"
  >
    Domestic
    <motion.svg
                animate={{ rotate: mobileDropdown === "dom" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 ml-1 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
  </div>

  {/* Dropdown for Domestic */}
  {mobileDropdown === "dom" && (
    <div className={`${mode==='dark'?'bg-gray-800':'bg-gray-200'} rounded-lg shadow-md p-4 mt-2 space-y-2`}>
      {destinations?.filter((d) => d.inter === false)?.map((destination) => (
        <Link
          key={destination._id}
          to={`/payment?heading=${encodeURIComponent(destination?.heading)}&description=${encodeURIComponent(destination?.description)}`}
          onClick={() => {
            setIsExpanded(false);
            setMobileDropdown(null);
          }}
          className="block px-4 py-2 border border-black rounded-md text-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-700 transition duration-300"
        >
          {destination.heading}
        </Link>
      ))}
    </div>
  )}
</div>

{/* International Button */}
<div className="mt-4">
  <div
    onClick={() => setMobileDropdown(mobileDropdown === "international" ? null : "international")}
    className="text-lg flex font-semibold cursor-pointer text-[#2ad4d7] mb-2"
  >
    International
    <motion.svg
                animate={{ rotate: mobileDropdown === "international" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 ml-1 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
  </div>

  {/* Dropdown for International */}
  {mobileDropdown === "international" && (
    <div className={`${mode==='dark'?'bg-gray-800':'bg-gray-200'} rounded-lg shadow-md p-4 mt-2 space-y-2`}>
      {destinations?.filter((d) => d.inter === true)?.map((destination) => (
        <Link
          key={destination._id}
          to={`/payment?heading=${encodeURIComponent(destination?.heading)}&description=${encodeURIComponent(destination?.description)}`}
          onClick={() => {
            setIsExpanded(false);
            setMobileDropdown(null);
          }}
          className="block px-4 py-2 border border-black rounded-md text-gray-700 dark:text-gray-100 hover:!bg-blue-100 dark:hover:bg-blue-700 transition duration-300"
        >
          {destination.heading}
        </Link>
      ))}
    </div>
  )}
</div>


    {/* Call Us */}
    <Link
      to="tel:+8384076491"
      className={`block text-lg font-semibold ${
        mode === "dark" ? "text-white" : "text-gray-900"
      } hover:text-gray-500 transition duration-300`}
    >
      Call Us
    </Link>

    {/* Uncomment About/Contact if needed later */}
    {/* 
    <Link
      to="/about"
      className={`block text-lg font-semibold ${
        mode === "dark" ? "text-white" : "text-gray-900"
      } hover:text-gray-500 transition duration-300`}
    >
      About Us
    </Link>

    <Link
      to="/contact"
      className={`block text-lg font-semibold ${
        mode === "dark" ? "text-white" : "text-gray-900"
      } hover:text-gray-500 transition duration-300`}
    >
      Contact Us
    </Link>
    */}
  </div>
)}

    </nav>
  );
}

export default Header;
