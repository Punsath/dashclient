import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export const Nav = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const desktopSliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [cities, setCities] = useState([]); // Cities array

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/news");
        if (response.data.Status) {
          setCities(response.data.Result); // Set the cities array
        } else {
          throw new Error(response.data.Error || "Failed to fetch news");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCities();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20%",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const mobileSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10%",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const handleButtonClick = (index) => {
    if (desktopSliderRef.current) desktopSliderRef.current.slickGoTo(index);
    if (mobileSliderRef.current) mobileSliderRef.current.slickGoTo(index);
    setActiveSlide(index);
  };

  return (
    <section className="w-full flex justify-center mb-16 -mt-16 flex-col items-center overflow-hidden">
      <div className="justify-center mt-8 flex flex-wrap md:flex-nowrap mb-4 gap-4">
        {cities.map((city, index) => (
          <button
            key={index}
            className={`px-6 py-2 mx-2 rounded-full font-semibold cursor-pointer transition-all duration-300 w-full md:w-auto ${
              activeSlide === index ? "bg-[#004066] text-white" : "text-[#494949] bg-white border border-[#004066]"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {city.title}
          </button>
        ))}
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block w-full">
        <Slider ref={desktopSliderRef} {...settings}>
          {cities.map((city, index) => (
            <div key={index} className="w-full px-4">
              <div className="w-full h-[435px] relative">
                <img
                  src={`http://localhost:8000/Images/${city.image}`} // Full URL for image
                  alt={city.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 bg-[#EDF5F7]">
                <h2 className="text-2xl font-semibold">{city.title}</h2>
                <div className="text-sm mb-4 text-[#6C737F]">{city.date}</div>
                <p>{city.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden w-full">
        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {cities.map((city, index) => (
            <div key={index} className="w-full px-4">
              <div className="w-full h-[335px] relative">
                <img
                  src={`http://localhost:8000/Images/${city.image}`} // Full URL for image
                  alt={city.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 bg-[#EDF5F7]">
                <h2 className="text-2xl font-semibold">{city.title}</h2>
                <div className="text-sm mb-4 text-[#6C737F]">{city.date}</div>
                <p>{city.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
