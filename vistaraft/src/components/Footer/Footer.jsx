
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

function Footer() {
  const { mode } = useTheme();
  return (
    <footer className={` ${mode === 'light' ? '!bg-white' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode === 'dark' ? 'text-white' : '!text-gray-900'}  shadow-lg border-t border-gray-200 rounded-none`}>
      <div className="w-full max-w-screen-xl mx-auto p-8 md:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse mb-6 sm:mb-0">
            <img src={mode==='light'?import.meta.env.VITE_LOGO:import.meta.env.VITE_LOGO_WHITE} className="h-20" alt="Vistaraft Logo" />
            <span className={`text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>VISTARAFT</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center sm:justify-end items-center text-lg font-semibold text-gray-800">
            <li             >
              <Link to="/Feedback" className={`footer-link me-6 ${mode === 'dark' ? 'text-white' : '!text-gray-800'} transition duration-300`}>Feedback</Link>
            </li>
            <li>
              <Link to="/privacy" className={`footer-link me-6 ${mode === 'dark' ? 'text-white' : '!text-gray-800'} transition duration-300`}>Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cancellation" className={`footer-link me-6 ${mode === 'dark' ? 'text-white' : '!text-gray-800'} transition duration-300`}>Cancellation</Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300 sm:mx-auto" />

        {/* Copyright */}
        <span className={`block text-lg ${mode === 'dark' ? 'text-white' : '!text-gray-800'} text-center`}>
          © 2025 <Link to="/Terms" className={`footer-link font-semibold ${mode === 'dark' ? 'text-white' : '!text-gray-800'} transition duration-300`}>Vistaraft™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;