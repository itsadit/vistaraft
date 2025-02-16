import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useTheme } from "../ThemeContext/ThemeContext";

function Contact() {
  const {mode} = useTheme();
  return (
    <div className={`max-w-screen mx-auto px-6 py-12 text-center ${mode==='light'?'!bg-gray-100': 'bg-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'}`}>
      
      {/* Address Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> Address
        </h2>
        <p className="text-2xl">1D/64 A, NIT Faridabad 121001</p>
        <a 
          href="https://goo.gl/maps/YOUR_GOOGLE_MAPS_LINK" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline inline-block mt-2"
        >
          View on Google Maps
        </a>
      </div>

      {/* Email Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2">
          <FaEnvelope className="text-yellow-500" /> Reach Us At
        </h2>
        <p className="text-2xl">
          <a 
            href="mailto:Travelwithvistaraft@gmail.com"
            className="text-blue-500 hover:underline"
          >
            Travelwithvistaraft@gmail.com
          </a>
        </p>
      </div>

      {/* Contact Number Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2">
          <FaPhone className="text-green-600" /> Contact Number
        </h2>
        <p className="text-2xl text-green-600 font-semibold">
          <a 
            href="tel:+918384076491"
            className="hover:underline"
          >
            +91 8384076491
          </a>
        </p>
      </div>

      {/* Social Media Section */}
      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://instagram.com/vistaraft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 text-4xl transition-transform duration-300 hover:scale-125"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://facebook.com/YOUR_FACEBOOK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-4xl transition-transform duration-300 hover:scale-125"
          >
            <FaFacebook />
          </a>
          <a 
            href="https://wa.me/+918384076491" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-500 text-4xl transition-transform duration-300 hover:scale-125"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;
