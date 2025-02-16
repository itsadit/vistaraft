import logo from "@/assets/logoVista.jpg";
import {Link, useLocation} from "react-router-dom";
import menu from "@/assets/menu.png";
import { useState } from "react";
import { useTheme } from "../ThemeContext/ThemeContext";


function Header() {
  const location = useLocation();
  const { mode, themeToggler } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNavbar = () => {
    const navbar = document.getElementById('navbar-default');
    const isExpanded = navbar.classList.contains('hidden');
    if (isExpanded) {
      navbar.classList.remove('hidden');
      setIsExpanded(true);
    } else {
      navbar.classList.add('hidden');
      setIsExpanded(false);
    }

  };

const toggleSpan = () => {
  const homeBtn = document.getElementById('homeBtn');
  const homeSpan = document.getElementById('homeSpan');
  if(homeBtn.classList.contains('active')){
    homeSpan.classList.remove('hidden');
    
  }
};
  return (
    <nav className={`sticky  top-0 left-0 w-full ${mode==='light'?'bg-gray-300': 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} bg-opacity-95 backdrop-blur-md border-b border-transparent z-50`}>

      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={import.meta.env.VITE_LOGO} className="h-10" alt="Vistaraft Logo" />
          <span className={`self-center text-2xl font-semibold whitespace-nowrap ${mode==='dark'?'text-white':'text-gray-900'}`}>
            Vistaraft
          </span>
        </Link>
        <button 
      onClick={themeToggler} 
      className={`ml-4 p-2 rounded-lg transition-all ${mode==='light'?'!bg-gray-100': 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'} duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
    >
      {mode === 'dark' ? '☀️' : '🌙'}
    </button>

        {/* Mobile Menu Button */}
        <div className="flex-col justify-end ">
        <div className="flex justify-end ">
        <button
        id="navBtn"
          data-collapse-toggle="navbar-default"
          type="button"
          className="md:hidden w-10 pb-2 pl-0 pr-0 h-10 hover:border-none bg-cyan-600 rounded-lg focus:outline-none focus:ring-0"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleNavbar}
          style={{backgroundImage: `url(${!isExpanded?import.meta.env.VITE_MENU:import.meta.env.VITE_CROSS})`,backgroundPosition: 'center',backgroundSize: 'cover', backgroundColor: 'transparent'}}
        >
          
          
        </button>
        </div>
          

        {/* Navigation Links */}
        <div className="hidden  md:block" id="navbar-default">
          <ul className="w-full font-medium flex flex-col p-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="w-auto">
              <Link
                to="/"
                id="homeBtn"
                className={`nav-link block text-right py-2 px-3 ${mode === 'dark' ? 'text-white' : '!text-gray-900'} hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0`}

                aria-current="page"
                onClick={toggleSpan}
              >
                Home
                <span id="homeSpan" className="hidden absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 w-full"></span>
              </Link>
            </li>
            <li className="w-auto">
              <Link
                to="tel:+8384076491"
                className={`nav-link block text-right py-2 px-3 ${mode==='dark'?'text-white':'!text-gray-900'} hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0`}
              >
                Call Us
                <span className="hidden absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="w-auto">
              <Link
                to="/about"
                className={`nav-link block text-right py-2 px-3 ${mode==='dark'?'text-white':'!text-gray-900'} hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0`}
              >
                About Us
                <span className="absolute bottom-0  left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="w-auto">
              <Link
                to="/contact"
                className={`nav-link block py-2 px-3 text-right ${mode==='dark'?'text-white':'!text-gray-900'} hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0`}
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;