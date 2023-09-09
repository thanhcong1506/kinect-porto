import React from "react";

const Featured = () => {
  return (
    <div className=" w-full ">
      <div className=" container mx-auto px-8 pt-[80px]">
        <div className="  bg-featured h-[415px] rounded-lg overflow-hidden bg-cover relative">
          <div className=" absolute bottom-4 left-6 w-1/3 space-y-2">
            <div className=" flex gap-2">
              <button className=" py-2 px-3 bg-[#2f3940] rounded-full">
                Action
              </button>
              <button className=" py-2 px-3 bg-[#2f3940] rounded-full">
                Advanture
              </button>
              <button className=" py-2 px-3 bg-[#2f3940] rounded-full">
                Art
              </button>
            </div>
            <h1 className=" text-4xl font-semibold">BioShock Infinite</h1>
            <p className=" text-sm font-normal">
              Open repair of infrarenal aortic aneurysm or dissection, plus
              repair of associated arterial trauma, following unsuccessful
              endovascular repair; aorto-bi-iliac prosthesis{" "}
            </p>
            <div className="flex gap-3">
              <button className=" main-button flex gap-2 items-center">
                Download
                <img src="/arrowDown.png" alt="" />
              </button>
              <button className=" main-button outline bg-none">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
