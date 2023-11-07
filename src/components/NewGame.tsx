"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchNewGamesAsync } from "@/redux/gameSlice";
import Skeleton from "@/utils/Skeleton";
import { RootState } from "@/redux/store";
import ReactSlick from "./ReactSlick";

interface NewsGameProps {
  onToggleLoveGame: (gameId: number) => void;
  isHandlingToggle: boolean;
}
const NewGames = (props: NewsGameProps) => {
  const { onToggleLoveGame, isHandlingToggle } = props;
  const dispatch = useAppDispatch();

  const { status, newGames } = useAppSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchNewGamesAsync());
  }, [dispatch]);

  return (
    <div className="container p-4">
      {status === "loading" && !isHandlingToggle ? (
        <Skeleton />
      ) : (
        <ReactSlick>
          {newGames?.map((newgame: Games) => (
            <ListItem
              game={newgame}
              onToggleLoveGame={onToggleLoveGame}
              key={newgame.id}
            />
          ))}
        </ReactSlick>
      )}
    </div>
  );
};

export default NewGames;
