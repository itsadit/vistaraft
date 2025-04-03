import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hotels.css"; // Custom styles for animations and layout

const image1 = import.meta.env.VITE_IMAGE1;
const image2 = import.meta.env.VITE_IMAGE2;
const image3 = import.meta.env.VITE_IMAGE3;
const image4 = import.meta.env.VITE_IMAGE4;
const image5 = import.meta.env.VITE_IMAGE5;
const image6 = import.meta.env.VITE_IMAGE6;
const image7 = import.meta.env.VITE_IMAGE7;
const image8 = import.meta.env.VITE_IMAGE8;
const image9 = import.meta.env.VITE_IMAGE9;
const image10 = import.meta.env.VITE_IMAGE10;
const image11 = import.meta.env.VITE_IMAGE11;
const image12 = import.meta.env.VITE_IMAGE12;
const image13 = import.meta.env.VITE_IMAGE13;
const image14 = import.meta.env.VITE_IMAGE14;
const image15 = import.meta.env.VITE_IMAGE15;
const image16 = import.meta.env.VITE_IMAGE16;



import { useTheme } from "../ThemeContext/ThemeContext";
const Hotel = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16];
  const {mode} = useTheme();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Enable arrows for navigation
    rows: 2, // Default: Display 2 rows
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1024, // Medium devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 1,
        },
      },
      {
        breakpoint: 768, // Small devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1,
        },
      },
    ],
  };

  return (
    <div className={`hotel-section ${mode === 'light' ? '!bg-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} `}>
      <h2 className="text-4xl lg:text-6xl font-extrabold hotel-title text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Our Ho<span className="text-green-400">tel</span></h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="hotel-slide">
            <img src={image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
};

// Custom Previous Arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export default Hotel