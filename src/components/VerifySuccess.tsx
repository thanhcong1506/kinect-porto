import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const VerifySuccess = () => {
  return (
    <div className=" w-full h-screen">
      <div className=" bg-[url('/signup-img.png')] h-full bg-cover relative">
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <div className="relative bg-[#1A2024] overflow-hidden rounded-[20px]">
            <img className="  " src="/verify-success1.png" alt="" />
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <div className=" flex flex-col justify-center items-center">
                <div className=" mb-[70px]">
                  <img className=" " src="/verify-email-success.png" alt="" />
                </div>
                <div className=" flex flex-col gap-y-5 items-center text-white">
                  <h1 className=" text-6xl font-black">SUCCESS!</h1>
                  <p>You’re now a member of KinectPortal!</p>
                  <button className=" px-6 py-2 rounded-xl flex items-center gap-1 bg-[#3DE732]">
                    <span>Continue</span>
                    <span>
                      <BsArrowRightShort />
                    </span>
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

export default VerifySuccess;
