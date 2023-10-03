"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchNewGamesAsync } from "@/redux/gameSlice";
import Skeleton from "@/utils/Skeleton";
import { RootState } from "@/redux/store";

interface NewsGameProps {
  onToggleLoveGame: (gameId: number) => void;
  isHandlingToggle: boolean;
}
const ListNewGames = (props: NewsGameProps) => {
  const { onToggleLoveGame, isHandlingToggle } = props;
  const dispatch = useAppDispatch();

  const { status, newGames } = useAppSelector(
    (state: RootState) => state.games
  );

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

  return (
    <div className="relative ">
      <div
        className=" flex w-max  gap-x-6 transition-all ease-in-out duration-700 group"
        ref={listRef}
      >
        {status === "loading" && !isHandlingToggle ? (
          <Skeleton />
        ) : (
          <>
            {newGames?.map((newgame: Games) => (
              <div
                className="w-[312px] h-[348px] rounded-lg overflow-hidden"
                key={newgame.id}
              >
                <ListItem
                  game={newgame}
                  onToggleLoveGame={onToggleLoveGame}
                  key={newgame.id}
                />
              </div>
            ))}
          </>
        )}
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
