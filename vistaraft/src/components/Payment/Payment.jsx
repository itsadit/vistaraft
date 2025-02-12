import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Payment() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const heading = queryParams.get("heading");
    const description = queryParams.get("description");

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            {/* Animated Payment Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gray-900 shadow-2xl rounded-2xl p-8 max-w-md text-center border border-gray-700"
            >
                {/* Trip Title */}
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                >
                    {heading}
                </motion.h1>

                {/* Trip Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg text-gray-300 mt-3"
                >
                    {description}
                </motion.p>

                {/* Price Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-5 bg-gray-800 p-4 rounded-lg shadow-md"
                >
                    <p className="text-2xl font-semibold text-blue-400">₹ 9,999</p>
                    <p className="text-sm text-gray-400">Per person (Inclusive of all taxes)</p>
                </motion.div>

                {/* Animated Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-all duration-300"
                >
                    Proceed to Payment
                </motion.button>

                {/* Secured Payment Text */}
                <p className="text-sm text-gray-400 mt-3">🔒 100% Secure Payment</p>
            </motion.div>
        </div>
    );
}

export default Payment;
