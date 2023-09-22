"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

// const fetcher = async (url: string, headers: any) => {
//   try {
//     const response = await axios.get(url, { headers });
//     return response.data;
//   } catch (error: any) {
//     // Handle error
//     throw new Error(error.response.data.message);
//   }
// };

const ListNewGames = () => {
  const session = useSession();
  const token = session.data?.user.access_token;
  const [newGames, setNewGames] = useState<Games[]>([]);

  // if (!token) return;
  // const { data, error } = useSWR(
  //   "https://user-api.dev.grailfarmer.app/api/v1/games?limit=20&page=1",
  //   (url) => fetcher(url, { Authorization: `Bearer ${token}` })
  // );
  // console.log(data);
  useEffect(() => {
    if (token) {
      const getNewGames = async () => {
        const res = await axios.get(
          "https://user-api.dev.grailfarmer.app/api/v1/games?limit=20&page=1",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.data) throw new Error("something went wrong");
        // console.log("newgame", res.data.rows);
        setNewGames(res.data.rows);
      };
      getNewGames();
    }
  }, [token]);

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
    console.log(distance);
  };

  return (
    <div className="relative ">
      <div
        className=" flex w-max  gap-x-6 transition-all ease-in-out duration-700 group"
        ref={listRef}
      >
        {newGames.map((newgame: Games) => (
          <div
            className="w-[312px] h-[348px] rounded-lg overflow-hidden"
            key={newgame.id}
          >
            <ListItem game={newgame} game_id={newgame.id} token={token} />
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
