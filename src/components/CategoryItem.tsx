import { category } from "@/type/data";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface categroryProps {
  category: category;
}
const CategoryItem = (props: categroryProps) => {
  const { category } = props;

  return (
    <div className=" py-5 h-[264px]">
      <div className="w-full h-full bg-black rounded-xl p-2">
        <img
          className=" w-full h-full border border-purple-700 overflow-hidden rounded-xl"
          src={category.icon}
          alt=""
        />
      </div>
      <div className=" flex justify-between px-3 items-center my-2">
        <p>{category.name}</p>
        <AiOutlineHeart size={30} />
      </div>
    </div>
  );
};

export default CategoryItem;
