import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";
import React, { useEffect, useRef, useState } from 'react';
function Card({ photo, heading, description, zIndex }) {
  const { mode } = useTheme();
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [photoWidth, setPhotoWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (imageRef.current && cardRef.current) {
      setPhotoWidth(imageRef.current.offsetWidth);
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, []);
  
  const hoveref = () => {
    if(hover){
    setHover(false);
    }else{
      setHover(true);
    }
  }

  return (
    <Link
            to={`/payment?heading=${encodeURIComponent(heading)}&description=${encodeURIComponent(description)}`}
            className=""
          >
            {hover && zIndex===3 && (<motion.div className="absolute p-5 z-20 flex flex-col flex-grow">
        <motion.h5 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-2 text-2xl font-bold tracking-tight text-white`}>
          {heading}
        </motion.h5>
        <motion.div initial={{opacity: 0, x:-10}} animate={{opacity:1,x:0}} transition={{duration:0.5}} className="h-1 w-20 bg-white mb-3"></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
         className={`mb-3 font-normal flex-grow text-white`}>
          {description}
        </motion.p>
        </motion.div>)}
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`w-96 h-68 flex flex-col border rounded-lg backdrop-blur-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl`}
      style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', filter:hover&&zIndex===3?'brightness(0.5)': hover&&zIndex!==3?'blur(8px)':'brightness(1)'}}
      onMouseEnter={hoveref}
      onMouseLeave={hoveref}
      
    >
      
      {/* Card Image */}
      {/* <motion.img
        src={photo}
        alt="trip photo"
        className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
        initial={{ x: 0 }}
        animate={{ x: photoWidth > cardWidth ? ["-30%", "0%"] : "0%" }} // Move only if wider
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      /> */}

      {/* Card Content */}
      
        {/* Button Container
        <div className="mt-auto">
          
            Let's go
            <svg
              className="rtl:rotate-180 w-4 h-4 ml-2"
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
          
        </div> */}
      {/* </div> */}
      
    </motion.div>
    </Link>

  );
}

export default Card;
