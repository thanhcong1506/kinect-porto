"use client";
import ListItem from "@/components/ListItem";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { fetchGamesAsync, toggleLovedGame } from "@/redux/gameSlice";

const AllGames = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { allGames: games, status } = useAppSelector(
    (state: RootState) => state.games
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);

  const handleToggleLoveGame = (gameId: number) => {
    dispatch(toggleLovedGame(gameId)).then(() => {
      dispatch(fetchGamesAsync());
    });
  };

  return (
    <div className="bg-[#1a2024] text-white">
      <div className="  container mx-auto px-8 pt-[100px] pb-5">
        <div className=" flex mb-4">
          <p className=" text-gray-200 cursor-pointer">Home &nbsp;</p>
          <span className=" text-gray-200">&gt;&nbsp;</span>
          <span> All Games</span>
        </div>
        <div className=" flex justify-between ps-8 mb-2 relative">
          <p className=" text-3xl font-bold uppercase text-white"> games</p>
          <p className=" absolute top-[-16px] left-1 z-10 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#0038FF] via-[#F800FF]  to-[#16BB52] ">
            ALL
          </p>
        </div>
        <div className=" grid grid-cols-4 gap-4">
          {games &&
            games.map((game) => (
              <ListItem
                game={game}
                onToggleLoveGame={handleToggleLoveGame}
                key={game.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllGames;
