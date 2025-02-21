import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
// import TripDetail from "../Tripdetail/Tripdetail";
import { useTheme } from "../ThemeContext/ThemeContext";



function Payment() {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const heading = queryParams.get("heading");

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const [pricing, setPricing] = useState({
    single: 0,
    double: 0,
    triple: 0,
  });

  const prices = {
    single: 5000,
    double: 4500,
    triple: 4000,
  };

  const totalPrice =
    pricing.single * prices.single +
    pricing.double * prices.double +
    pricing.triple * prices.triple;

  useEffect(() => {
    if (heading) {
      fetch(`${import.meta.env.VITE_HOST}/api/destinations?heading=${encodeURIComponent(heading)}`)
        .then((response) => response.json())
        .then((data) => setSelectedDestination(data))
        .catch((error) => console.error("Error fetching destination:", error));
    }
  }, [heading]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleIncrement = (type) => {
    setPricing((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setPricing((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };
  // const toggleDayWisePlan =()=>{
  //   toggleSection("itineary");
  // }
  return (
    <div className={`flex lg:flex-row justify-around flex-col items-start min-h-screen p-4 pt-8 gap-8 ${mode === "light" ? "!bg-gray-100" : "bg-gray-900 text-white"}`}>
      {/* Left Side - Trip Details */}
      <div className="lg:mx-8 w-full lg:w-1/2 space-y-8">
      <div className={`flex justify-around ${mode==='dark'?'bg-gray-900 text-white':'!bg-white !text-gray-900'} p-6 rounded-2xl`}>
        {/* Days of Trip */}
        <div className="flex flex-col items-center">
          <i className="fa-regular fa-clock text-blue-400 text-3xl"></i>
          <p className="mt-2 text-gray-400">Days of Trip</p>
          <h2 className="text-xl font-bold">2N-3D</h2>
        </div>
  
        {/* Pickup & Drop */}
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-location-dot text-blue-400 text-3xl"></i>
          <p className="mt-2 text-gray-400">Pickup & Drop</p>
          <h2 className="text-xl font-bold">Delhi</h2>
        </div>
  
        {/* Buttons */}
        <div className="flex mt-4 space-x-4">
          <button className="bg-blue-600 px-4 py-2 rounded-lg" onClick={() => toggleSection("itinerary")}>
            Day Wise Plan
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded-lg" onClick={() => toggleSection("inclusions_exclusions")}>Inclusions & Excl.</button>
        </div>
      </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Day Wise Plan */}
          <div className="border border-gray-700 shadow-lg rounded-2xl">
            <button
              // onClick={() => toggleSection("itinerary")}
              className="w-full flex justify-between items-center p-6 text-left bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-t-2xl"
            >
              <span>📅 Day Wise Plan</span>
              {openSection === "itinerary" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {openSection === "itinerary" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-6 ${mode === "dark" ? "bg-gray-900 text-gray-300" : "!bg-gray-100 !text-gray-700"} rounded-b-2xl`}
              >
                {selectedDestination?.itenary.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-400">{`Day ${item.day}: ${item.heading}`}</h3>
                    <ul className="list-disc list-inside ml-4">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-gray-400">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Inclusions & Exclusions */}
          <div className="border border-gray-700 shadow-lg rounded-2xl">
            <button
              
              className="w-full flex justify-between items-center p-6 text-left bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold text-lg rounded-t-2xl"
            >
              <span>✅ Inclusions & ❌ Exclusions</span>
              {openSection === "inclusions_exclusions" ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {openSection === "inclusions_exclusions" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-6   ${mode === "dark" ? "bg-gray-900 text-gray-300" : "!bg-gray-100 !text-gray-700"} rounded-b-2xl`}
              >
                <h2 className="text-xl font-bold text-green-400">✔️ Trip Inclusions</h2>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-400">
                  {selectedDestination?.inclusions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h2 className="text-xl font-bold text-red-400 mt-6">❌ Trip Exclusions</h2>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-400">
                  {selectedDestination?.exclusions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Pricing & Payment Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`shadow-2xl rounded-2xl p-6 max-w-md w-full text-center border border-gray-700 ${mode === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
        >
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Select Your Package
          </h1>

          {Object.keys(prices)
            .filter((type) => prices[type] > 0)
            .map((type) => (
              <div key={type} className={`flex justify-between items-center mt-4 p-3 rounded-lg ${mode === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                <span className="font-semibold text-blue-500">{type.charAt(0).toUpperCase() + type.slice(1)} Sharing</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDecrement(type)} className="px-3 py-1 rounded-lg bg-gray-300 text-black">-</button>
                  <span className={`${mode === "dark" ? " text-white" : "!text-black"}`}>{pricing[type]}</span>
                  <button onClick={() => handleIncrement(type)} className="px-3 py-1 rounded-lg bg-gray-300 text-black">+</button>
                </div>
                <span className={`${mode === "dark" ? " text-white" : "!text-black"}`}>₹ {prices[type]}</span>
              </div>
            ))}

          <div className="mt-5 p-4 rounded-lg shadow-md bg-gray-800">
            <p className="text-lg font-semibold text-blue-500">Total: ₹ {totalPrice}</p>
            <p className="text-sm text-gray-400">(Inclusive of all taxes)</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg"
            onClick={() => {
              if (totalPrice === 0) {
                alert("Please select a package to proceed");
                return;
              }
              alert("Please pay ₹" + totalPrice + " to proceed");
              const queryParams = new URLSearchParams({
                heading: selectedDestination.heading,
                totalPrice,
                quad: pricing.quad,
                triple: pricing.triple,
                double: pricing.double,
                single: pricing.single,
              }).toString();
              navigate(`/process?${queryParams}`);
            }}
          >
            Proceed to Payment
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Payment;
