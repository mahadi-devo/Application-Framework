import React from 'react';
import { Carousel } from '3d-react-carousal';

const Carasoul = () => {
  let slides = [
    <img
      style={{ height: '350px' }}
      src='https://res.cloudinary.com/mahadi/image/upload/v1625037735/wop4m9rzs4mgceugoupq.jpg'
      alt='1'
    />,
    <img
      style={{ height: '350px' }}
      src='https://res.cloudinary.com/mahadi/image/upload/v1625038136/eemf4gmwobogjb2riyqx.jpg'
      alt='2'
    />,
    <img
      style={{ height: '350px' }}
      src='https://res.cloudinary.com/mahadi/image/upload/v1625038305/eemtdh8dekvkccyoynu5.jpg'
      alt='3'
    />,
    <img
      style={{ height: '350px' }}
      src='https://res.cloudinary.com/mahadi/image/upload/v1625038456/vdcthzyljyfisqojlfly.jpg'
      alt='4'
    />,
    <img
      style={{ height: '350px' }}
      src='https://res.cloudinary.com/mahadi/image/upload/v1625038714/f3mcebyzmipvzodakokl.jpg'
      alt='5'
    />,
  ];

  return (
    <div>
      <Carousel slides={slides} autoplay={true} interval={3000} />
    </div>
  );
};

export default Carasoul;
