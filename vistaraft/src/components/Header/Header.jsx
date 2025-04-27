import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import Itenary from "../Itenary/Itenary";

function Header() {
  const location = useLocation();
  const { mode, themeToggler } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [destinations, setDestinations] = useState([]);

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
  const [itineraries, setItineraries] = useState([]); // State for itineraries

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        } sticky top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200 z-50`}
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

            {/* Domestic Button */}
            <div
              onClick={() => filterTrips("domestic")}
              className={`nav-link text-lg font-medium transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Domestic
            </div>

            {/* International Button */}
            <div
              onClick={() => filterTrips("international")}
              className={`nav-link text-lg font-medium transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              International
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
          className={`md:hidden p-4 space-y-4 ${mode === "light" ? "bg-gray-100" : "bg-black"
            }`}
        >
          <Link
            to="/"
            className={`block ${mode === "dark" ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300`}
          >
            Home
          </Link>
          <Link
            to="https://www.joobiragalaxy.in"
            className={`block ${mode === "dark" ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300`}
          >
            Our Hotels
          </Link>

          {/* Itinerary Dropdown for Mobile
          <div className="relative">
            <div
              onClick={toggleMobileDropdown}
              className={`block text-lg font-medium text-[#00CED1]
                } hover:text-gray-500 transition duration-300 cursor-pointer`}
            >
              Itineary
            </div>
            {isMobileDropdownOpen && (
              <div className="pl-4 pr-4 mt-2 space-y-2">
                {destinations?.length > 0 ? (
                  <div className={`${mode=='dark'?'bg-gray-800':'!bg-white'} rounded-xl shadow-lg p-4`}>
                    <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Available Trips</h3>
                    <ul className="space-y-2">
                      {destinations?.map((destination) => (
                        <li key={destination._id}>
                          <Link
                            to={`/payment?heading=${encodeURIComponent(destination?.heading)}&description=${encodeURIComponent(destination?.description)}`}
                            onClick={() => {
                              setIsExpanded(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg ${mode==='dark'?'bg-gray-700':'!bg-gray-100'} text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-600 transition-colors duration-200`}
                          >
                            {destination.heading}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-300 italic">No itineraries available</p>
                  </div>
                )}
              </div>
            )}


          </div> */}


          <Link
            to="tel:+8384076491"
            className={`block ${mode === "dark" ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300`}
          >
            Call Us
          </Link>
          {/* <Link
            to="/about"
            className={`block ${mode === "dark" ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block ${mode === "dark" ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300`}
          >
            Contact Us
          </Link> */}
        </div>
      )}
    </nav>
  );
}

export default Header;
