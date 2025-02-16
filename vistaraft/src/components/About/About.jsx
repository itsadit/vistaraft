import { FaInstagram, FaFacebook, FaWhatsapp, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../ThemeContext/ThemeContext";

function About() {
  const {mode} = useTheme();
  return (
    <div className={`overflow-hidden max-w-screen max-h-screen ${mode==='light'?'!bg-gray-100': 'bg-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'}`}>
    <div className={`max-w-2xl mx-auto px-6 py-12 text-center `}>
      {/* Header Section */}
      <h1 className="text-5xl font-bold mb-6">About Vistaraft</h1>
      <p className={`text-lg ${mode==='dark'?'text-gray-300':'text-gray-600'}`}>
        Explore the world with <strong>Vistaraft</strong>, your trusted travel companion for unforgettable adventures. 
        Whether it's a serene getaway or an adrenaline-packed expedition, we make every journey special.
      </p>

      {/* Who We Are Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-semibold mb-4">Who We Are</h2>
        <p className={`text-lg ${mode==='dark'?'text-gray-300':'text-gray-600'}`}>
          At <strong>Vistaraft</strong>, we specialize in crafting unique travel experiences. From breathtaking landscapes to hidden gems, we bring travelers together to explore the wonders of the world.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className={`text-lg t${mode==='dark'?'text-gray-300':'text-gray-600'} space-y-3`}>
          <li>✅ Expertly curated travel packages</li>
          <li>✅ Hassle-free booking & seamless experiences</li>
          <li>✅ Passionate & knowledgeable tour guides</li>
          <li>✅ Safety-first adventure travel</li>
        </ul>
      </div>

      {/* Location Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-semibold mb-4 flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> Our Location
        </h2>
        <p className="text-lg">1D/64 A, NIT Faridabad, 121001</p>
      </div>

      {/* Social Media Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://instagram.com/vistaraft" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-4xl hover:scale-110">
            <FaInstagram />
          </a>
          <a href="https://facebook.com/vistaraft" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-4xl hover:scale-110">
            <FaFacebook />
          </a>
          <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer" className="text-green-500 text-4xl hover:scale-110">
            <FaWhatsapp />
          </a>
          <a href="https://vistaraft.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-4xl hover:scale-110">
            <FaGlobe />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
