"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import DownloadButton from "./DownloadButton";
import axios from "axios";
import Link from "next/link";

const getPopulargames = async () => {
  const res = await axios.get(
    "https://user-api.dev.grailfarmer.app/api/v1/games/newest?limit=10&page=1"
  );

  const popularGames = await res.data;
  return popularGames.rows;
};

const List = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const [popularGames, setPopularGames] = useState<Games[]>([]);
  const [slideNumber, setSlideNumber] = useState(0);

  useEffect(() => {
    getPopulargames().then((data) => {
      setPopularGames(data);
    });
  }, []);

  const handleClick = (direction: string) => {
    let distance = listRef.current?.getBoundingClientRect().x ?? -0;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current?.setAttribute(
        "style",
        `transform:translateX(${328 + distance - 40}px)`
      );
    }
    if (direction === "right" && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      listRef.current?.setAttribute(
        "style",
        `transform:translateX(${-328 + distance - 40}px)`
      );
    }
    console.log(distance);
  };

  return (
    <div className="relative">
      <div
        className=" flex w-max h-full  transition-all ease-in-out duration-700"
        ref={listRef}
      >
        {popularGames.map((popularGame) => (
          <div
            key={popularGame.id}
            className="  w-[312px] h-[348px] hover:min-w-[624px] hover:bg-black hover:shadow-md hover:rounded-md ease-in-out duration-1000 transition-width mx-0 hover:mx-3"
          >
            <div className="flex group gap-5 w-full h-full ">
              <Image
                className=" rounded-3xl p-3 object-cover"
                src={popularGame.image_url}
                alt=""
                width={312}
                height={348}
              />
              <div className="hidden w-[300px] group-hover:flex items-center justify-center">
                <div className=" flex flex-col gap-3 text-white w-full pe-3">
                  <div className=" flex gap-3">
                    <button className=" secondary-button">Action</button>
                    <button className=" secondary-button">Adventure</button>
                  </div>
                  <div className=" flex items-center">
                    <h1 className=" text-2xl font-semibold me-3">
                      {popularGame.name}
                    </h1>
                    <span>
                      <AiOutlineHeart size={24} />
                    </span>
                  </div>
                  <p className="text-xs w-full  line-clamp-4">
                    {popularGame.description}
                  </p>
                  <Link href={popularGame.download_url}>
                    <DownloadButton />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FiChevronLeft
        onClick={() => handleClick("left")}
        className={
          slideNumber === 0
            ? "hidden"
            : " absolute cursor-pointer opacity-50 hover:opacity-100 left-0 top-[50%] translate-y-[-50%] hover:scale-150 ease-in-out duration-300 h-full"
        }
        size={30}
      />

      <FiChevronRight
        onClick={() => handleClick("right")}
        className={
          slideNumber === 4
            ? "hidden"
            : " absolute cursor-pointer opacity-50 hover:opacity-100 right-0 top-[50%] translate-y-[-50%] hover:scale-150 ease-in-out duration-300 h-full"
        }
        size={30}
      />
    </div>
  );
};

export default List;
