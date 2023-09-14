"use client";
import { useState } from "react";
import React from "react";
import Featured from "./Featured";
import NewGame from "./NewGame";
import PopularGame from "./PopularGame";
import { AiOutlineArrowRight } from "react-icons/ai";
import ListItem from "./ListItem";
import Link from "next/link";
import DetailViewScreenshot from "./DetailViewScreenshot";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className=" bg-[#1a2024] text-white py-5 ">
      <div className=" pt-2 ">
        <Featured />
      </div>
      <div className="my-8 ">
        <div className="mt-4 ps-10">
          <div className=" flex items-center pb-2">
            <p className=" text-3xl font-bold text-white">NEW GAMES</p>
            <span className=" ms-3 px-2 py-1 text-sm rounded-full bg-[#FB04FF]">
              hot
            </span>
          </div>
          <NewGame />
        </div>
        <div className="mt-4 ps-10">
          <p className=" text-3xl font-bold uppercase pb-2 text-white">
            popular game
          </p>
          <PopularGame />
        </div>
        <div className="mt-8 container mx-auto px-10">
          <div className=" flex justify-between ps-8 pb-2 relative">
            <p className=" text-3xl font-bold uppercase text-white"> games</p>
            <Link href={"/all-game"}>
              <button className=" secondary-button text-sm  flex items-center gap-1 text-[#02FDFD]">
                <span>View All</span>
                <AiOutlineArrowRight />
              </button>
            </Link>
            <p className=" absolute top-[-16px] left-1 z-10 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#0038FF] via-[#F800FF]  to-[#16BB52] ">
              ALL
            </p>
          </div>

          <div className=" grid grid-cols-4 gap-x-4 gap-y-6">
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </div>
        </div>
        <DetailViewScreenshot
          openModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default Home;