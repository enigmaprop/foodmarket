import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/HeroSlider.css';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef && sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-wrapper">
      <Slider ref={sliderRef} {...settings}>
        {[...Array(24)].map((_, index) => (
          <div key={index}>
            <Link to='/'><img src={`https://picsum.photos/seed/${index}/1200/600`} alt="" /></Link>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default HeroSlider;
