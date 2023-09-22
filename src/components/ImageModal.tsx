"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageModalProps {
  image: string;
  onCloseModal: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  onCloseModal,
  onNextImage,
  onPrevImage,
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center z-20">
      <div className="w-3/4 h-3/4 flex justify-center items-center rounded-lg overflow-hidden relative z-30 group">
        <img
          className=" w-full h-full overflow-hidden"
          src={image}
          alt="Selected Image"
        />
        <button
          className=" absolute top-2 hover:opacity-70 hover:scale-110 right-2 z-40 text-xl font-extrabold"
          onClick={onCloseModal}
        >
          X
        </button>
        {/* Left Arrow */}
        <div className=" absolute top-[50%] -translate-y-[50%] left-3 group-hover:cursor-pointer">
          <FiChevronLeft size={30} onClick={onPrevImage} />
        </div>
        {/* Right Arrow */}
        <div className="absolute top-[50%] -translate-y-[50%] right-3 group-hover:cursor-pointer">
          <FiChevronRight size={30} onClick={onNextImage} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
