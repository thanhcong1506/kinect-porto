import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface modalProps {
  openModal: boolean;
  setShowModal: (v: boolean) => void;
}
const DetailViewScreenshot = (props: modalProps) => {
  const { openModal, setShowModal } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!openModal) return;
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const preSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const nextSlide = () => {
    if (currentIndex < slides.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className=" fixed inset-0 backdrop-blur-sm  flex justify-center items-center z-20">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
        }}
        className=" w-3/4 h-3/4 rounded-lg overflow-hidden relative z-40 group"
      >
        {/* Left Arrow */}
        <div
          onClick={preSlide}
          className={
            currentIndex === 0
              ? "hidden"
              : " absolute top-[50%] -translate-y-[50%] left-1 group-hover:cursor-pointer"
          }
        >
          <FiChevronLeft size={30} />
        </div>
        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className={
            currentIndex === slides.length - 1
              ? "hidden"
              : " absolute top-[50%] -translate-y-[50%] right-1 group-hover:cursor-pointer"
          }
        >
          <FiChevronRight size={30} />
        </div>
        <div
          onClick={handleCloseModal}
          className=" absolute top-6 right-6 z-40 text-red-500 cursor-pointer"
        >
          <AiFillCloseCircle size={30} />
        </div>
      </div>
    </div>
  );
};

export default DetailViewScreenshot;

const slides = [
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
  },

  {
    url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
  },
];
