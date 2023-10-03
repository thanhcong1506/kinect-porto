"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageModalProps {
  image: string;
  onCloseModal: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  currentImage: string;
  data?: string[];
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  onCloseModal,
  onNextImage,
  onPrevImage,
  currentImage,
  data,
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center z-20">
      <div className="w-3/4 h-2/3 flex justify-center items-center rounded-lg relative z-30 group">
        <img className=" w-full h-full " src={image} alt="Selected Image" />
        <button
          className=" absolute -top-8 hover:opacity-70 hover:scale-125 hover:bg-red-600 -right-8 z-40 text-xs rounded-lg font-extrabold py-1 px-2 border"
          onClick={onCloseModal}
        >
          X
        </button>
        {/* Left Arrow */}
        <div
          className={
            data?.indexOf(currentImage) === 0
              ? "opacity-0 pointer-events-none"
              : " absolute top-[50%] -translate-y-[50%] -left-12 group-hover:cursor-pointer p-[2px] rounded-full border border-white hover:scale-105 ease-in-out duration-300"
          }
        >
          <FiChevronLeft size={30} onClick={onPrevImage} />
        </div>
        {/* Right Arrow */}
        <div
          className={
            data && data?.indexOf(currentImage) === data?.length - 1
              ? "opacity-0 pointer-events-none"
              : "absolute top-[50%] -translate-y-[50%] -right-12 group-hover:cursor-pointer p-[2px] rounded-full border border-white hover:scale-105 ease-in-out duration-300"
          }
        >
          <FiChevronRight size={30} onClick={onNextImage} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
