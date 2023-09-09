import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const VerifyFail = () => {
  return (
    <div className=" w-full h-screen">
      <div className=" bg-[url('/signup-img.png')] h-full bg-cover relative">
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <div className="relative bg-[#1A2024] overflow-hidden rounded-[20px]">
            <img className="  " src="/verify-success1.png" alt="" />
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <div className=" flex flex-col justify-center items-center">
                <div className="border-8 border-[rgba(253, 208, 208, 0.8)] rounded-full mb-[70px]">
                  <img className=" " src="/verify-fail.svg" alt="" />
                </div>
                <div className=" flex flex-col gap-y-5 items-center text-white">
                  <h1 className=" text-6xl font-black">OOPS!</h1>
                  <p className=" flex flex-col items-center leading-none ">
                    <span>Something went wrong. </span>
                    <span>Please try again.</span>
                  </p>
                  <button className=" px-6 py-2 rounded-xl flex items-center gap-1 bg-[#E73232]">
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyFail;
