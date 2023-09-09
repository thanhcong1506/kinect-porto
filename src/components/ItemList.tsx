import { genre } from "@/type/data";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface genreProps {
  genre: genre;
}
const ItemList = (props: genreProps) => {
  const { genre } = props;
  return (
    <div className="  bg-[rgba(0,0,0,0.3)] rounded-xl  overflow-hidden relative w-full h-full">
      <Link href={""}>
        <img className="  " src={genre.icon} alt="" />
      </Link>
      <div className=" absolute left-3 bottom-3 w-full z-20 ">
        <div className=" flex gap-1">
          <button className=" secondary-button">Action</button>
          <button className=" secondary-button">Adventure</button>
        </div>
        <div className="flex gap-7 items-center">
          <p>{genre.name}</p>
          <AiOutlineHeart size={30} />
        </div>
        <button className=" main-button flex gap-1 items-center">
          <span> Download</span>
          <span>
            <img src="/arrowDown.png" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ItemList;
