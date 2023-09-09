"use client";
import { useState } from "react";

import Link from "next/link";
import React from "react";
import DetailViewScreenshot from "./DetailViewScreenshot";

const ListItem = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="  bg-black rounded-xl  overflow-hidden relative w-full h-full">
      <img
        onClick={() => setShowModal(true)}
        className=" cursor-pointer ease-in-out duration-300 overflow-hidden hover:scale-125 "
        src="/Property 1=Red Dead II_ Redemption.png"
        alt=""
      />

      <div className=" absolute left-3 bottom-3 w-full">
        <div className=" flex gap-1">
          <button className=" secondary-button">Action</button>
          <button className=" secondary-button">Adventure</button>
        </div>
        <div className="flex gap-7">
          <p>Red Dead II: Redemption</p>
          <img src="/heart.png" alt="" />
        </div>
        <button className=" main-button flex gap-1 items-center">
          <span> Download</span>
          <span>
            <img src="/arrowDown.png" alt="" />
          </span>
        </button>
      </div>
      <DetailViewScreenshot
        openModal={showModal}
        setShowModal={handleCloseModal}
      />
    </div>
  );
};

export default ListItem;
