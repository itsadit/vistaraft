import { Link, useLocation } from "react-router-dom";
import menu from "@/assets/menu.png";
import { useState } from "react";
import { useTheme } from "../ThemeContext/ThemeContext";

function Header() {
  const location = useLocation();
  const { mode, themeToggler } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav
      className={` ${mode === 'light' ? '!bg-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode === 'dark' ? 'text-white' : '!text-gray-900'} sticky top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200 z-50`}
    >
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-1.5">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={mode==='light'?import.meta.env.VITE_LOGO:import.meta.env.VITE_LOGO_WHITE}
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
              to="tel:8384076491"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Call Us
            </Link>
            <Link
              to="/about"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`nav-link text-lg transition duration-300 ${mode === "dark" ? "text-white" : "!text-gray-900"
                } hover:text-gray-500`}
            >
              Contact Us
            </Link>
          </div>

          {/* Dark Mode Toggle Button */}
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ml-4 p-2 focus:outline-none ${mode === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-800'}`}
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
        <div className={`md:hidden p-4 space-y-4 ${mode === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
          <Link to="/" className={`block ${mode === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-gray-500 transition duration-300`}>Home</Link>
          <Link to="tel:+8384076491" className={`block ${mode === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-gray-500 transition duration-300`}>
            Call Us
          </Link>
          <Link to="/about" className={`block ${mode === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-gray-500 transition duration-300`}>
            About Us
          </Link>
          <Link to="/contact" className={`block ${mode === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-gray-500 transition duration-300`}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;