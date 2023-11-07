"use client";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactSlick = ({ children }: { children: React.ReactNode }) => {
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div className=" contaiter-slick">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default ReactSlick;
