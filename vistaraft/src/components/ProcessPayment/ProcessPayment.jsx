import { motion } from "framer-motion";
import { useLocation , useNavigate} from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import { useTheme } from "../ThemeContext/ThemeContext";
function ProcessPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const heading = queryParams.get("heading");
  const totalPrice = queryParams.get("totalPrice");
  const quad = queryParams.get("quad");
  const triple = queryParams.get("triple");
  const double = queryParams.get("double");
  const single = queryParams.get("single");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const {mode} = useTheme();

  const sendEmail = async() => {
    const paymentData = {
      name,
      email,
      transactionId,
      quad,
      triple,
      double,
      single,
      totalPrice,
    };
  
    try {
      // Save Payment to MongoDB
      await fetch(`${import.meta.env.VITE_HOST}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
    
  
    const templateParams = {
      user_name: name.trim() || "N/A",
      user_email: email.trim() || "N/A",
      transaction_id: transactionId.trim() || "N/A",
      heading: heading,
      quad_sharing: String(quad),
      triple_sharing: String(triple),
      double_sharing: String(double),
      single_sharing: String(single),
      total_price: `${totalPrice}`,
    };
  
    console.log("Sending Email with Data:", templateParams); // Debugging
  
    emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParams,import.meta.env.VITE_PUBLIC_KEY)
      .then((response) => {
        alert(`Payment receipt sent successfully to ${email}!`);
        navigate(`/thanks?name=${name}&email=${email}&totalPrice=${totalPrice}`)
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("Error sending email. Please try again.");
      });
    } catch (error) {
      alert("Error saving payment details. Please try again.");
    }
  };
  

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center min-h-screen p-6 ${mode==='light'?'!bg-gray-100': 'bg-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'}`}>
      {/* Left Side - QR Code */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${mode==='dark'?'bg-gray-800 border border-gray-700':'bg-gray-200'} shadow-2xl rounded-2xl p-8  flex items-center justify-center w-full md:w-1/3 h-80`}
      >
        <img
          src="https://res.cloudinary.com/djvhd1shh/image/upload/c_crop,w_600,h_600,ar_1:1/v1739619594/qr_figygg.jpg" 
          alt="QR Code" 
          className="w-56 h-56 rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Right Side - Payment Instructions & Details */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${mode==='dark'?'bg-gray-800 border border-gray-700':'bg-gray-200'} shadow-2xl rounded-2xl p-8  mt-6 md:mt-0 md:ml-6 w-full md:w-1/2`}
      >
        <motion.h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-center">
          Complete Your Payment
        </motion.h1>
        
        {/* Payment Steps */}
        <div className={`mt-4 space-y-2 text-lg ${mode==='dark'?'text-gray-300':'text-gray-800'}`}>
          <p>✅ Scan the QR Code</p>
          <p>✅ Pay ₹{totalPrice}</p>
          <p>✅ Enter Transaction Details</p>
        </div>


        {/* Payment Form */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full px-4 py-2 rounded-lg ${mode==='dark'?'bg-gray-700 border border-gray-600 text-white':'bg-gray-300 text-black'}  focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-2 rounded-lg ${mode==='dark'?'bg-gray-700 border border-gray-600 text-white':'bg-gray-300 text-black'}  focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction ID"
            className={`w-full px-4 py-2 rounded-lg ${mode==='dark'?'bg-gray-700 border border-gray-600 text-white':'bg-gray-300 text-black'}  focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-all duration-300"
          onClick={sendEmail}
        >
          Submit Payment
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ProcessPayment;
