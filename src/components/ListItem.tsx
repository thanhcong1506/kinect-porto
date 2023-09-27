"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface GameProps {
  game: Games;
  onToggleFavorite: (gameId: number, isFavorites: boolean | undefined) => void;
}

const ListItem = (props: GameProps) => {
  const { game, onToggleFavorite } = props;
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className="  bg-[rgba(0,0,0,0.3)]  relative w-full h-full">
      <div
        onClick={() => handleClick(game.id)}
        className=" w-full h-full bg-transparent-to-bottom absolute top-0 left-0 cursor-pointer"
      ></div>
      <img
        className=" w-full h-full cursor-pointer bg-transparenTotop "
        src={game.image_url}
        alt=""
      />

      <div className=" absolute left-3 bottom-3 w-full z-20 space-y-2 ">
        <div className=" flex gap-1">
          {game.genres &&
            game.genres.map((genre) => (
              <button key={genre.id} className=" secondary-button !text-xs">
                {genre.name}
              </button>
            ))}
        </div>
        <div className="flex justify-between pe-12  items-center">
          <p className=" font-extrabold text-lg">{game.name}</p>
          <p
            className=" cursor-pointer relative "
            onClick={() => onToggleFavorite(game.id, game.isLoved)}
          >
            <AiOutlineHeart
              className=" fill-white absolute -top-[2px] -right-[2px]"
              size={28}
            />
            <AiFillHeart
              className={
                game.isLoved ? "fill-rose-500" : " fill-neutral-500/70"
              }
              size={24}
            />
          </p>
        </div>
        <button className=" main-button flex gap-1 items-center">
          <Link href={game.download_url}>
            <span> Download</span>
          </Link>
          <span>
            <img src="/arrowDown.png" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ListItem;
