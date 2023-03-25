import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/HeroSlider.css';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {[...Array(24)].map((_, index) => (
          <div key={index}>
            <Link to='/'><img src={`https://picsum.photos/seed/${index}/1200/600`} alt="" /></Link>
          </div>
        ))}
      </Slider>
      <div className="slider-header">
        <h2 className='text-white'>العروض</h2>
      </div>
    </div>
  );
};

export default HeroSlider;
