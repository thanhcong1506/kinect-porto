"use client";
import React, { useEffect, useState } from "react";
import Featured from "./Featured";
import NewGame from "./NewGame";
import PopularGame from "./PopularGame";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import AllGames from "./AllGames";
import { useAppDispatch } from "@/redux/hook";
import {
  fetchGamesAsync,
  fetchLovedGamesAsync,
  fetchNewGamesAsync,
  fetchPopularGamesAsync,
  toggleLovedGame,
} from "@/redux/gameSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const [isHandlingToggle, setIsHandlingToggle] = useState(false);

  const handleToggleLoveGame = (gameId: number) => {
    setIsHandlingToggle(true);
    dispatch(toggleLovedGame(gameId))
      .then(() => {
        dispatch(fetchGamesAsync());
        dispatch(fetchNewGamesAsync());
        dispatch(fetchPopularGamesAsync());
        dispatch(fetchLovedGamesAsync());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" bg-[#1a2024] text-white py-5 ">
      <div className=" pt-2 ">
        <Featured />
      </div>
      <div className=" px-8">
        <div className="my-8 ">
          <div className="mt-4 ps-10">
            <div className=" flex items-center pb-2">
              <p className=" text-3xl font-bold text-white">NEW GAMES</p>
              <span className=" ms-3 px-2 py-1 text-sm rounded-full bg-[#FB04FF]">
                hot
              </span>
            </div>
            <NewGame
              onToggleLoveGame={handleToggleLoveGame}
              isHandlingToggle={isHandlingToggle}
            />
          </div>
          <div className="mt-4 ps-10">
            <p className=" text-3xl font-bold uppercase pb-2 text-white">
              popular game
            </p>
            <PopularGame
              onToggleLoveGame={handleToggleLoveGame}
              isHandlingToggle={isHandlingToggle}
            />
          </div>
          <div className="mt-8 container mx-auto px-10">
            <div className=" flex justify-between ps-8 pb-2 relative">
              <p className=" text-3xl font-bold uppercase text-white"> games</p>
              <Link href={"/all-games"}>
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
              <AllGames
                onToggleLoveGame={handleToggleLoveGame}
                isHandlingToggle={isHandlingToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
