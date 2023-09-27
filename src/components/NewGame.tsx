"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchLovedGamesAsync,
  fetchNewGamesAsync,
  selectLovedGames,
  selectNewGames,
} from "@/redux/gameSlice";
import { toggleFavorite } from "@/redux/loveGameSlice";

const ListNewGames = () => {
  const dispatch = useAppDispatch();
  const newGames = useAppSelector(selectNewGames);
  const newgamess = useAppSelector((state) => state.games);
  console.log(newgamess);

  // console.log("newww", newGames);
  useEffect(() => {
    dispatch(fetchNewGamesAsync());
  }, [dispatch]);
  const listRef = useRef<HTMLDivElement>(null);

  const [slideNumber, setSlideNumber] = useState(0);

  const handleClick = (direction: string) => {
    let distance: number = listRef.current?.getBoundingClientRect().x ?? -96;
    console.log(distance);
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current?.setAttribute(
        "style",
        `transform:translateX(${336 + distance}px)`
      );
    }
    if (direction === "right" && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      listRef.current?.setAttribute(
        "style",
        `transform:translateX(${-336 + distance}px)`
      );
    }
  };
  const handleToggleFavorite = (
    gameId: number,
    isFavorite: boolean | undefined
  ) => {
    dispatch(toggleFavorite(gameId));
    dispatch(fetchLovedGamesAsync());
  };

  return (
    <div className="relative ">
      <div
        className=" flex w-max  gap-x-6 transition-all ease-in-out duration-700 group"
        ref={listRef}
      >
        {newGames?.map((newgame: Games) => (
          <div
            className="w-[312px] h-[348px] rounded-lg overflow-hidden"
            key={newgame.id}
          >
            <ListItem
              game={newgame}
              onToggleFavorite={handleToggleFavorite}
              key={newgame.id}
            />
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

export default ListNewGames;
