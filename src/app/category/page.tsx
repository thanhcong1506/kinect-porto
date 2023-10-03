"use client";

import CategoryItem from "@/components/CategoryItem";
import { fetchGenres } from "@/redux/genreSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

const Category = () => {
  const { genre } = useAppSelector((state: RootState) => state.genre);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);
  return (
    <div className=" bg-[#1a2024] pt-[80px] text-white font-primary">
      <div className=" container mx-auto px-8 py-3">
        <div className=" flex my-2">
          <p>
            <Link href={"/"}>Home </Link>
            <span>&gt;&nbsp;</span>
          </p>
          <p>Tag Category</p>
        </div>

        <div className=" text-5xl font-black">Tag Category</div>
        <div className=" grid grid-cols-4 gap-10 ">
          {genre.map((cate) => (
            <CategoryItem category={cate} key={cate.id} />
          ))}
        </div>
        <div className=" w-1/2 mx-auto bg-black rounded-xl py-5 mt-12 relative">
          <div className=" absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ">
            <div className="flex items-center gap-3 text-[#50ABFF]  cursor-pointer hover:scale-125 ease-in-out duration-300">
              <p>More</p>
              <BiChevronDown size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
