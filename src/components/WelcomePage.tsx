import Link from "next/link";
import React from "react";

export default function WelcomePage() {
  return (
    <div className=" w-full mx-auto ">
      <div className=" bg-cover w-full bg-welcome h-screen overflow-hidden relative">
        <div className="h-[80px] bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 w-full flex items-center justify-end  pe-5">
          <div className=" flex gap-2  ">
            <Link href={"/login"}>
              <button className="border border-[#8E54E9] px-6 py-2 text-white rounded-xl hover:bg-[#50abff] hover:transition-shadow ">
                Log in
              </button>
            </Link>

            <Link href={"/signup"}>
              <button className="main-button ">Become Member</button>
            </Link>
          </div>
        </div>
        <div className="absolute  top-[50%] translate-y-[-60%] w-full flex">
          <div className="w-1/2"></div>
          <div className="  w-1/2 text-white flex flex-col gap-y-2">
            <h1 className=" text-[#50ABFF] text-lg font-medium ">
              Best Kinect Gaming{" "}
            </h1>
            <h1 className=" text-5xl font-black leading-[60px] ">
              Be the best player and get better on ABC
            </h1>
            <p className=" font-normal">
              Open repair of infrarenal aortic aneurysm or dissection, plus
              repair of associated arterial trauma, following unsuccessful
              endovascular repair; aorto-bi-iliac prosthesis{" "}
            </p>
            <div className=" flex justify-end pe-5">
              <button className=" main-button ">Learn More</button>
            </div>
          </div>
        </div>
        <div className=" absolute bottom-6 left-3">
          <div className=" flex flex-col gap-y-3">
            <div className=" flex gap-2">
              <img src="/ic_round-expand-left.png" alt="" />
              <img src="/ic_round-expand-right.png" alt="" />
            </div>
            <div className=" max-w-max flex gap-4">
              <div className="  rounded-md overflow-hidden">
                <img
                  className="w-[200px] h-[120px]"
                  src="/bio-shock.png"
                  alt=""
                />
                <p className="text-white">God of War</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
