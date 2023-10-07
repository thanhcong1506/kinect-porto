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

  const [isFirstItem, setIsFirstItem] = useState(true);
  const [isLastItem, setIsLastItem] = useState(false);

  useEffect(() => {
    const currentListRef = listRef.current;
    if (currentListRef) {
      const handleScroll = () => {
        const currentScrollLeft = currentListRef.scrollLeft;
        const maxScrollLeft =
          currentListRef.scrollWidth - currentListRef.clientWidth;
        setIsFirstItem(currentScrollLeft <= 0);
        setIsLastItem(currentScrollLeft >= maxScrollLeft);
      };

      currentListRef.addEventListener("scroll", handleScroll);

      return () => {
        currentListRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClick = (direction: string) => {
    const currentListRef = listRef.current;
    if (currentListRef) {
      const listWidth = currentListRef.clientWidth;
      const maxScrollLeft =
        currentListRef.scrollWidth - currentListRef.clientWidth;

      if (direction === "left") {
        currentListRef.scrollBy({
          left: -listWidth,
          behavior: "smooth",
        });
      }

      if (direction === "right") {
        currentListRef.scrollBy({
          left: listWidth,
          behavior: "smooth",
        });
      }

      const currentScrollLeft = currentListRef.scrollLeft;
      setIsFirstItem(currentScrollLeft <= 0);
      setIsLastItem(currentScrollLeft >= maxScrollLeft);
    }
  };

  return (
    <div
      ref={listRef}
      className="relative w-screen overflow-hidden scrollbar-hide whitespace-nowrap scroll-smooth "
    >
      <div className=" flex w-max group">
        {status === "loading" && !isHandlingToggle ? (
          <Skeleton />
        ) : (
          <>
            {newGames?.map((newgame: Games) => (
              <div
                className="w-screen p-4 flex flex-col items-center justify-around h-[348px] transition-all duration-300 rounded-lg md:w-[50vw] lg:w-[25vw]  "
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
          isFirstItem
            ? "hidden"
            : " absolute cursor-pointer opacity-50 hover:opacity-100 left-0 top-[50%] translate-y-[-50%] hover:scale-150 ease-in-out duration-300 h-full"
        }
        size={30}
      />
      <FiChevronRight
        onClick={() => handleClick("right")}
        className={
          isLastItem
            ? "hidden"
            : " absolute cursor-pointer opacity-50 hover:opacity-100 right-0 top-[50%] translate-y-[-50%] hover:scale-150 ease-in-out duration-300 h-full"
        }
        size={30}
      />
    </div>
  );
};

export default ListNewGames;
