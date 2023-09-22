"use client";
import React, { useEffect, useRef, useState } from "react";
import ItemList from "./ListItem";
import axios from "axios";
import ListItem from "./ListItem";
import { useSession } from "next-auth/react";

const getAllgames = async () => {
  const res = await axios.get(
    "https://user-api.dev.grailfarmer.app/api/v1/games?limit=10&page=1"
  );

  const games = await res.data;
  return games.rows;
};

const AllGames = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const [games, setGames] = useState<Games[]>([]);
  const session = useSession();
  const token = session.data?.user.access_token;

  useEffect(() => {
    if (token) {
      getAllgames().then((data) => {
        setGames(data);
      });
    }
  }, [token]);

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
            <ListItem game={game} game_id={game.id} token={token} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
