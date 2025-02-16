import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTheme } from "../ThemeContext/ThemeContext";



function Payment() {
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  const [selectedDestination, setSelectedDestination] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const heading = queryParams.get("heading");
  const description = queryParams.get("description");
  
  useEffect(() => {
    if (heading) {
      fetch(`${import.meta.env.VITE_HOST}/api/destinations?heading=${encodeURIComponent(heading)}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data:", data); // Debugging
          setSelectedDestination(data);
        })
        .catch((error) => console.error("Error fetching destination:", error));
    }
  }, [heading]); 
  console.log(selectedDestination)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pricing, setPricing] = useState({
        quad: 0,
        triple: 0,
        double: 0,
        single: 0,
    });

    const prices = {
        quad: selectedDestination?.quadPrice,
        triple: selectedDestination?.TriPrice,
        double: selectedDestination?.doubPrice,
        single: selectedDestination?.singlePrice,
    };

    const handleIncrement = (type) => {
        setPricing((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleDecrement = (type) => {
        if (pricing[type] > 0) {
            setPricing((prev) => ({ ...prev, [type]: prev[type] - 1 }));
        }
    };

    const totalPrice =
        pricing.quad * prices.quad +
        pricing.triple * prices.triple +
        pricing.double * prices.double +
        pricing.single * prices.single;

    const [showAll, setShowAll] = useState(false);


    // const itinerary = [
    //     { day: "Day 01", stay: "Overnight Travel", meals: "-" },
    //     { day: "Day 02", stay: "Pahalgam", meals: "Dinner" },
    //     { day: "Day 03", stay: "Srinagar", meals: "Breakfast + Dinner" },
    //     { day: "Day 04", stay: "Srinagar", meals: "Breakfast + Dinner" },
    //     { day: "Day 05", stay: "Srinagar", meals: "Breakfast + Dinner" },
    //     { day: "Day 06", stay: "Houseboat", meals: "Breakfast + Dinner" },
    //     { day: "Day 07", stay: "Katra", meals: "Breakfast" },
    //     { day: "Day 08", stay: "-", meals: "Breakfast" },
    //   ];
    
    //   const inclusions = [
    //     "Shikara Ride",
    //     "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
    //     "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
    //     "Transfers as per itinerary",
    //     "All toll taxes",
    //     "Driver allowance with parking charges",
    //     "Memories of a Lifetime",
    //   ];
    
    //   const exclusions = [
    //     "Anything else that is not mentioned in the inclusions",
    //     "Personal expenses such as tips, telephone calls, laundry, medication etc.",
    //     "Any Adventure Sport",
    //     "Any extra transportation services availed",
    //   ];
    
      // const openPDF = () => {
      //   window.open(selectedDestination?.pdf, "_blank");
      // };
    
    
    

    // const handlePayment = async () => {
    //     if (!name || !email) {
    //         alert("Please enter your name and email before proceeding.");
    //         return;
    //     }

    //     try {
    //         // 1️⃣ Create Order
    //         const { data } = await axios.post("http://localhost:5000/create-order", {
    //             amount: 9999, // ₹9,999 for the trip
    //             currency: "INR",
    //             name,
    //             email,
    //             trip: heading, // Using the heading as the trip name
    //         });

    //         // 2️⃣ Open Razorpay UI
    //         const options = {
    //             key: "rzp_test_XnuNbiu4AK9Qft",
    //             amount: data.amount,
    //             currency: data.currency,
    //             name: "Trip Booking",
    //             description: `Payment for ${heading}`,
    //             handler: async function (response) {
    //                 // 3️⃣ Verify Payment & Store in DB
    //                 await axios.post("http://localhost:5000/verify-payment", {
    //                     razorpay_order_id: response.razorpay_order_id,
    //                     razorpay_payment_id: response.razorpay_payment_id,
    //                     razorpay_signature: response.razorpay_signature,
    //                     name,
    //                     email,
    //                     amount: 9999,
    //                     trip: heading,
    //                 });

    //                 alert("Payment Successful! Confirmation email has been sent.");
    //             },
    //             prefill: { name, email },
    //             theme: { color: "#3399cc" },
    //         };

    //         const rzp = new window.Razorpay(options);
    //         rzp.open();
    //     } catch (error) {
    //         console.error("Payment Error:", error);
    //     }
    // };
    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
      <div className={`flex flex-col lg:flex-row pt-8 justify-center items-center min-h-screen ${mode==='light'?'!bg-gray-100': 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} ${mode==='dark'?'text-white':'!text-gray-900'} p-4`}>
      
      {/* Left Section - Carousel */}
      <div className="w-full pl-8 lg:w-1/2 flex justify-center">
        <Carousel 
          showArrows={true} 
          infiniteLoop 
          autoPlay 
          interval={5000} 
          showIndicators={false} 
          showThumbs={false} 
          showStatus={false} 
          className="w-full pl-8 "
        >
          {/* Itinerary Slide */}
          {/* Itinerary Slide */}
<div className={`${mode==='dark'?'bg-gray-900':'bg-gray-100'} shadow-2xl rounded-2xl p-6 border border-gray-700`}>
  <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
    Day Wise Itinerary
  </h2>
  
  <div className="overflow-x-auto">
    <table className="w-full mt-4 border border-gray-700 text-sm md:text-base">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="p-2">Day</th>
          <th className="p-2">Stay</th>
          <th className="p-2">Activity</th>
          <th className="p-2">Meals</th>
        </tr>
      </thead>
      <tbody>
        {selectedDestination?.itenary.slice(0, showAll ? selectedDestination.itenary.length : 5).map((item, index) => (
          <tr key={index} className="border border-gray-700 text-center">
            <td className="p-2">{item.day}</td>
            <td className="p-2 font-semibold">{item.stay}</td>
            <td className="p-2">{item.activity}</td>
            <td className="p-2">{item.meals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* See More Button */}
  {selectedDestination?.itenary.length > 5 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="mt-4 w-full px-6 py-2 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg"
    >
      {showAll ? "See Less" : "See More"}
    </button>
  )}
</div>


          {/* Inclusions & Exclusions Slide */}
          <div className={`${mode==='dark'?'bg-gray-900':'bg-gray-100'} shadow-2xl rounded-2xl p-6 border border-gray-700`}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Trip Inclusions</h2>
            <ul className={`list-disc pl-6  mt-3 text-sm md:text-lg ${mode==='dark'?'text-gray-300':'text-gray-800'} text-left`}>
              {selectedDestination?.inclusions.map((item, index) => (
                <li key={index} className="mb-2 font-semibold">{item}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Trip Exclusions</h2>
            <ul className={`list-disc pl-6  mt-3 text-sm md:text-lg ${mode==='dark'?'text-gray-300':'text-gray-800'} text-left`}>
              {selectedDestination?.exclusions.map((item, index) => (
                <li key={index} className="mb-2 font-semibold">{item}</li>
              ))}
            </ul>
          </div>
        </Carousel>
      </div>

      {/* Right Section - Pricing & Selection */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${mode==='dark'?'bg-gray-900':'bg-gray-100'} shadow-2xl rounded-2xl p-6 max-w-md w-full text-center border border-gray-700`}
        >
          <motion.h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Select Your Package
          </motion.h1>

          {Object.keys(pricing)
            .filter((type) => prices[type] !== undefined && prices[type] > 0)
            .map((type) => (
              <motion.div key={type} className={`flex justify-between items-center mt-4 ${mode==='dark'?'bg-gray-800':'bg-gray-200'} p-3 rounded-lg`}>
                <span className="text-sm md:text-lg font-semibold text-blue-500">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Sharing
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDecrement(type)} className={`${mode==='dark'?'bg-gray-600':'!bg-gray-300 !text-black'} px-3 py-1 rounded-lg text-sm md:text-base`}>-</button>
                  <span className="text-sm md:text-lg font-semibold">{pricing[type]}</span>
                  <button onClick={() => handleIncrement(type)} className={`${mode==='dark'?'bg-gray-600':'!bg-gray-300 !text-black'} px-3 py-1 rounded-lg text-sm md:text-base`}>+</button>
                </div>
                <span className={`${mode==='dark'?'text-gray-400':'text-gray-800'} text-sm md:text-base`}>₹ {prices[type]}</span>
              </motion.div>
            ))}

          <motion.div className={`mt-5 ${mode==='dark'?'bg-gray-800':'!bg-gray-100 !text-black'} p-4 rounded-lg shadow-md`}>
            <p className="text-lg md:text-2xl font-semibold text-blue-500">Total: ₹ {totalPrice}</p>
            <p className="text-sm text-gray-400">(Inclusive of all taxes)</p>
          </motion.div>

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

          <p className="text-sm text-gray-400 mt-3">🔒 100% Secure Payment</p>
        </motion.div>
      </div>
    </div>
    );
}

export default Payment;
