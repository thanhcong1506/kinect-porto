import { genre } from "@/type/data";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface GameProps {
  game: NewGames;
}
const ItemList = (props: GameProps) => {
  const { game } = props;
  return (
    <div className="  bg-[rgba(0,0,0,0.3)]  relative w-full h-full">
      <Link href={""}>
        <img className=" w-full h-full" src={game.image_url} alt="" />
      </Link>
      <div className=" absolute left-3 bottom-3 w-full z-20 ">
        <div className=" flex gap-1">
          <button className=" secondary-button">Action</button>
          <button className=" secondary-button">Adventure</button>
        </div>
        <div className="flex justify-between px-4 items-center">
          <p>{game.name}</p>
          <p className=" cursor-pointer">
            <AiOutlineHeart size={30} />
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

export default ItemList;