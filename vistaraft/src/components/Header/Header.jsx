import logo from "@/assets/logoVista.jpg";

function Header() {
  return (
    <nav className="sticky top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md border-b border-transparent z-50">

      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo and Brand Name */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="Vistaraft Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Vistaraft
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className="nav-link block py-2 px-3 text-white hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0"
                aria-current="page"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="tel:+8384076491"
                className="nav-link block py-2 px-3 text-white hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0"
              >
                Call Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="nav-link block py-2 px-3 text-white hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="nav-link block py-2 px-3 text-white hover:text-cyan-300 rounded-md relative overflow-hidden transition-all duration-300 md:p-0"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;