"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ItemList from "./ItemList";
import axios from "axios";

const getNewgames = async () => {
  const res = await axios.get(
    "https://user-api.dev.grailfarmer.app/api/v1/games/newest?limit=10&page=1"
  );

  const newgames = await res.data;
  return newgames.rows;
};

const ListNewGames = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const [slideNumber, setSlideNumber] = useState(0);
  const [newgames, setNewgames] = useState<NewGames[]>([]);

  useEffect(() => {
    getNewgames().then((data) => {
      setNewgames(data);
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
    <div className="relative ">
      <div
        className=" flex w-max  gap-x-6 transition-all ease-in-out duration-700 group"
        ref={listRef}
      >
        {newgames.map((newgame) => (
          <div
            className="w-[312px] h-[348px] rounded-lg overflow-hidden"
            key={newgame.id}
          >
            <ItemList game={newgame} />
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
