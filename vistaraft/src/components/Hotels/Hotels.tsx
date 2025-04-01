import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hotels.css"; // Custom styles for animations and layout

const image1 = import.meta.env.VITE_IMAGE;
// import image2 from "../../assets/image2.jpg";
// import image3 from "../../assets/image3.jpg";
// import image4 from "../../assets/image4.jpg";
// import image5 from "../../assets/image5.jpg";
// import image6 from "../../assets/image6.jpg";

const Hotel = () => {
  const images = [image1, image1, image1, image1, image1, image1];

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
    <div className="hotel-section">
      <h2 className="text-4xl lg:text-6xl font-extrabold hotel-title text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Our Ho<span className="text-green-400">tels</span></h2>
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