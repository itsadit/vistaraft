import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Link as Linky } from 'react-scroll';
const bgImage = import.meta.env.VITE_BG_IMAGE;
const bgImage1 = import.meta.env.VITE_BG_IMAGE1;
const bgImage2 = import.meta.env.VITE_BG_IMAGE2;
import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      speed={1000}
    >
      {[bgImage, bgImage2, bgImage1].map((image, index) => (
        <SwiperSlide key={index}>
          <motion.section
            className="relative flex items-center justify-center text-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 pointer-events-none"></div>

            <div className="relative px-4 mx-auto max-w-screen-xl py-24 lg:py-56 text-white">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl text-white drop-shadow-md"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  {index === 0 ? 'Wander Beyond Limits' : index === 1 ? 'Discover Hidden Treasures' : 'Your Adventure Your Way'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-extrabold bg-clip-text text-transparent ml-4">
                  {index === 0 ? 'Live the Journey' : index === 1 ? 'Have the Time of Your Life' : 'Tailored to Perfection'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-lg font-normal text-gray-200 lg:text-xl px-6 py-3 bg-black/10 backdrop-blur-md rounded-lg shadow-lg drop-shadow-md"
              >
                {index === 0
                  ? 'Here at Vistaraft, we focus on making the most memorable trip for You.'
                  : index === 1
                  ? 'Let Vistaraft guide you through untouched landscapes and unique cultural experiences.'
                  : 'Plan your perfect getaway with customizable itineraries tailored to your desires.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/booking')}
                  className="relative z-10 inline-flex justify-center items-center py-3 px-6 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-950 to-green-700 border border-white cursor-pointer transition-all duration-300 hover:from-blue-700 hover:to-green-600 focus:ring-4 focus:ring-blue-300"
                >
                  Start Booking
                  <svg
                    className="w-4 h-4 ml-2 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;
