"use client";
import React, { useEffect, useRef } from "react";

import ListItem from "./ListItem";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchGamesAsync, selectAllGames } from "@/redux/gameSlice";

interface AllGamesProp {
  games: Games[];
  onToggleFavorite: (gameId: number) => void;
}

const AllGames = () => {
  // const { games, onToggleFavorite } = props;

  const dispatch = useAppDispatch();
  const games = useAppSelector(selectAllGames);

  // console.log("games", games);

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);

  const listRef = useRef<HTMLDivElement>(null);

  const onToggleFavorite = () => {};
  return (
    <div className="relative ">
      <div
        className=" flex w-max  gap-x-6 transition-all ease-in-out duration-700 group"
        ref={listRef}
      >
        {games.slice(0, 7).map((game) => (
          <div
            className="w-[312px] h-[348px] rounded-lg overflow-hidden"
            key={game.id}
          >
            <ListItem
              game={game}
              key={game.id}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
