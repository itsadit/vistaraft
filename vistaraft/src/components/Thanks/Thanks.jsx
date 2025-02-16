import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";
function ThankYou() {
  const {mode} = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const totalPrice = queryParams.get("totalPrice");
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${mode==='light'?'!bg-gray-100': 'bg-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'} p-6 `}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${mode==='light'?'!bg-gray-200': 'bg-gray-800 border border-gray-700'} shadow-2xl rounded-2xl p-8  text-center w-full md:w-2/3`}
      >
        <motion.h1
          className={`text-4xl font-extrabold bg-clip-text text-transparent ${mode==='light'?'bg-gradient-to-r from-blue-600 to-purple-700': 'bg-gradient-to-r from-blue-400 to-purple-500'}  `}
        >
          🎉 Thank You, {name}! 🎉
        </motion.h1>
        <p className={`text-lg ${mode==='dark'?'text-gray-300':'text-gray-700'} mt-4`}>
          Your payment of <span className="text-green-400 font-semibold">₹{totalPrice}</span> has been received.
        </p>
        <p className={`${mode==='dark'?'text-gray-500':'text-gray-500'} mt-2`}>A confirmation email has been sent to <span className="text-blue-500">{email}</span>.</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-all duration-300"
          onClick={() => navigate("/")}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ThankYou;
