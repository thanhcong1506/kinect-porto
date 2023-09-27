"use client";

import { fetchLovedGamesAsync, selectLovedGames } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleFavorite } from "@/redux/loveGameSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-toastify";

const MyGame = () => {
  const dispatch = useAppDispatch();
  const lovedGames = useAppSelector(selectLovedGames);
  // console.log("games", lovedGames);
  useEffect(() => {
    dispatch(fetchLovedGamesAsync());
  }, [dispatch]);

  return (
    <div className=" bg-[#1a2024] pt-[80px] text-white font-primary h-screen w-full ">
      <div className=" container mx-auto px-8 pt-3 h-full max-w-[1440px] ">
        <div className=" flex my-2">
          <p>
            <Link href={"/"}>Home </Link>
            <span>&gt;&nbsp;</span>
          </p>
          <p>My Game</p>
        </div>

        <div className=" text-5xl font-black">My Game</div>
        {lovedGames.length > 0 ? (
          <>
            <div className=" grid grid-cols-4 gap-10 ">
              {lovedGames.map((game) => (
                <div key={game.id} className=" py-5 h-[264px]">
                  <div className="w-full h-full bg-black rounded-xl p-2">
                    <img
                      className=" w-full h-full border border-purple-700 overflow-hidden rounded-xl"
                      src={game.image_url}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between px-3 items-center my-2">
                    <p>{game.name}</p>
                    <AiFillHeart
                      onClick={() => {
                        dispatch(toggleFavorite(game.id));
                        dispatch(fetchLovedGamesAsync());
                        toast.error("Remove love game");
                      }}
                      size={30}
                      className="fill-rose-500 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className=" text-lg flex justify-center items-center text-red-500">
              No game favorite
            </p>
          </>
        )}
        <div className=" w-1/2 mx-auto bg-black rounded-xl py-5 mt-5 relative ">
          <div className=" absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ">
            <div className="flex items-center gap-3 text-[#50ABFF]  cursor-pointer hover:scale-125 ease-in-out duration-300">
              <p>More</p>
              <BiChevronDown size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGame;
