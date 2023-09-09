import React from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
const Detail = () => {
  return (
    <div className="bg-detail bg-cover overflow-hidden w-full min-h-screen text-white">
      <div className=" container mx-auto px-10 pt-24">
        <div className="flex">
          <span>Home &gt;&nbsp; </span>
          <span> Bioshock Infinite</span>
        </div>
        <div className="w-full">
          <img className=" w-full" src="/bioShock.png" alt="" />
        </div>

        <div className=" flex flex-col space-y-4 py-5">
          <div className=" flex justify-between items-center">
            <div className=" flex flex-col gap-2">
              <div className="flex gap-10 items-center">
                <h1 className=" text-5xl">BIOSHOCK INFINITE</h1>
                <span>
                  <img className=" w-9" src="/heart.png" alt="" />
                </span>
              </div>
              <div className=" flex gap-1">
                <button className=" secondary-button">Action</button>
                <button className=" secondary-button">Adventure</button>
                <button className=" secondary-button">Art</button>
              </div>
            </div>
            <div className=" flex flex-col pe-10">
              <div className=" flex ">
                <button className=" main-button flex items-center gap-1">
                  <span>Download</span>
                  <span>
                    <img src="/arrowDown.png" alt="" />
                  </span>
                </button>
              </div>
              <p className=" text-end font-normal text-sm text-[#AFAFAF]">
                3.56GB
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-3">
            <p className=" w-2/3">
              Columbia, the city "in the clouds", the symbol of America's
              prosperity, is gone. Players take on the role of former Pinkerton
              agent Booker DeWitt, sent to this city to rescue Elizabeth, a
              young woman who has been imprisoned here since childhood. DeWitt
              must learn to battle enemies in high-speed Sky-Line battles,
              engaging in combat both indoors and in the clouds, with dozens of
              new weapons and abilities.
            </p>
            <button className=" secondary-button flex items-center gap-1 w-max">
              <span className=" text-[#50ABFF]">Read More</span>
              <span>
                <img src="/down.png" alt="" />
              </span>
            </button>
          </div>
        </div>
        <div className="pt-5 pb-10">
          <div className=" flex justify-between items-center pe-5 pb-3">
            <h1 className=" text-xl">SCREENSHOTS</h1>
            <div className=" flex gap-1">
              <AiOutlineLeftCircle
                size={30}
                className="text-white cursor-pointer hover:scale-125 ease-linear duration-300"
              />
              <AiOutlineRightCircle
                size={30}
                className="text-white cursor-pointer hover:scale-125 ease-linear duration-300"
              />
            </div>
          </div>
          <div className="flex gap-3 w-max ">
            <img
              className="w-[244px] h-[272px] rounded-lg  hover:cursor-pointer hover:scale-110 duration-300  "
              src="/Property1=GodofWar.png"
              alt=""
            />
            <img
              className="w-[244px] h-[272px] rounded-lg hover:cursor-pointer hover:scale-110 duration-300 "
              src="/Property1=GodofWar.png"
              alt=""
            />
            <img
              className="w-[244px] h-[272px] rounded-lg hover:cursor-pointer hover:scale-110 duration-300"
              src="/Property1=GodofWar.png"
              alt=""
            />
            <img
              className="w-[244px] h-[272px] rounded-lg hover:cursor-pointer hover:scale-110 duration-300"
              src="/Property1=GodofWar.png"
              alt=""
            />
            <img
              className="w-[244px] h-[272px] rounded-lg hover:cursor-pointer hover:scale-110 duration-300"
              src="/Property1=GodofWar.png"
              alt=""
            />
            <img
              className="w-[244px] h-[272px] rounded-lg hover:cursor-pointer hover:scale-110 duration-300"
              src="/Property1=GodofWar.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
