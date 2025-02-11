import logo from "@/assets/logoVista.jpg";
import "./Footer.css";
import Feedback from './../Feedback/Feedback';

function Footer() {
  return (
    <footer className="bg-gray-900 rounded-lg shadow-sm mt-8 border-t border-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-6 sm:mb-0">
            <img src={logo} className="h-10" alt="Vistaraft Logo" />
            <span className="text-2xl font-semibold text-white">Vistaraft</span>
          </a>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center sm:justify-end items-center text-sm font-medium text-gray-400">
            <li>
              <a href="/about" className="footer-link me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="/privacy" className="footer-link me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="/cancellation" className="footer-link me-4 md:me-6">Cancellation</a>
            </li>
            <li>
              <a href="/Feedback" className="footer-link">Feedback</a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Copyright */}
        <span className="block text-sm text-gray-400 text-center">
          © 2025 <a href="/Terms" className="footer-link">Vistaraft™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
