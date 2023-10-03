"use client";
import React, { useEffect, useRef } from "react";

import ListItem from "./ListItem";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchGamesAsync, selectAllGames } from "@/redux/gameSlice";
import Skeleton from "@/utils/Skeleton";

interface AllGameProps {
  onToggleLoveGame: (gameId: number) => void;
  isHandlingToggle: boolean;
}

const AllGames = ({ isHandlingToggle, onToggleLoveGame }: AllGameProps) => {
  const dispatch = useAppDispatch();
  const { allGames: games, status } = useAppSelector((state) => state.games);
  // console.log("games", games);

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);

  const listRef = useRef<HTMLDivElement>(null);

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
            {games.slice(0, 7).map((game) => (
              <div
                className="w-[312px] h-[348px] rounded-lg overflow-hidden"
                key={game.id}
              >
                <ListItem
                  game={game}
                  key={game.id}
                  onToggleLoveGame={onToggleLoveGame}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllGames;
