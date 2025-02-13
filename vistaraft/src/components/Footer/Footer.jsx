import logo from "@/assets/logoVista.jpg";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 rounded-lg shadow-sm mt-8 border-t border-transparent">
      <div className="w-full max-w-screen-xl mx-auto p-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse mb-6 sm:mb-0">
            <img src={logo} className="h-12" alt="Vistaraft Logo" />
            <span className="text-3xl font-bold text-white">Vistaraft</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center sm:justify-end items-center text-base font-semibold text-gray-300">
            <li>
              <Link to="/Feedback" className="footer-link me-6 hover:text-white transition duration-300">Feedback</Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link me-6 hover:text-white transition duration-300">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cancellation" className="footer-link me-6 hover:text-white transition duration-300">Cancellation</Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700 sm:mx-auto" />

        {/* Copyright */}
        <span className="block text-base text-gray-400 text-center">
          © 2025 <Link to="/Terms" className="footer-link font-semibold hover:text-white transition duration-300">Vistaraft™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
