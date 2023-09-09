"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={
        showMenu
          ? " font-primary w-full   text-white fixed top-0 z-10 shadow-gray-50 bg-slate-800"
          : " font-primary w-full  bg-[rgba(0,0,0,0.2)] text-white fixed top-0 z-10 shadow-gray-50 "
      }
    >
      <div className=" container mx-auto px-8 flex justify-between items-center h-20">
        <div className=" flex gap-5">
          <img
            onClick={() => setShowMenu(!showMenu)}
            className=" cursor-pointer"
            src="/navbar/mobile-menu.png "
            alt=""
          />
          <Link href={"/"}>
            <img className=" cursor-pointer" src="/banner-icon.png" alt="" />
          </Link>
        </div>
        <div className="flex justify-end items-center gap-7">
          <form className=" relative ">
            <input
              type="search"
              className=" cursor-pointer relative z-10 h-8 w-8 rounded-full   bg-transparent pr-0 outline-none focus:w-80 focus:border focus:cursor-text focus:border-white focus:pl-4 focus:pr-8"
              name=""
              id=""
            />
            <BiSearch
              className="absolute inset-y-0 my-auto right-2"
              size={25}
            />
          </form>
          <div className=" flex gap-2 items-center relative">
            <p>Cody Fisher</p>
            <div className=" hover:flex flex-col group">
              <img
                className=" hover:scale-125"
                src="/navbar/down-menu.png"
                alt=""
              />
              <div className=" hidden group-hover:flex flex-col bg-black w-44 p-3 rounded-md absolute top-16 left-0 gap-y-2 group-hover:cursor-pointer text-xs font-medium ">
                <span className=" absolute h-12 w-full bg-transparent top-[-45px] left-0"></span>
                <div className=" flex justify-around items-center hover:bg-[#1A2024] px-3 py-2 hover:rounded-3xl duration-300 ">
                  <img src="/navbar/icon-game.png" alt="" />
                  <p>My Games</p>
                </div>
                <span className=" text-center border border-white rounded-3xl px-3 py-2 hover:cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 ">
                  Log out
                </span>
              </div>
            </div>
            <img src="/navbar/icon-profile.png" alt="" />
          </div>
        </div>
      </div>

      {/* <!-- Navbar menu --> */}
      <div
        className={
          showMenu ? "absolute w-1/5 bg-[#14191D] min-h-screen z-30" : "hidden"
        }
      >
        <div className="px-8">
          <div className=" flex justify-between  items-center border-b border-b-[#344148] pb-2">
            <p className=" text-2xl font-extrabold text-white">GENRE</p>
            <p className=" h-[2px] w-3 bg-white"></p>
          </div>
        </div>
        <ul className="ps-8 ">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className=" flex gap-3 items-center ps-2 pt-2 pb-3 cursor-pointer hover:bg-slate-800 hover:rounded-lg"
            >
              <img className=" h-3 w-3" src={item.icon} alt="" />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

const menuItems: { icon: string; title: string; id: number }[] = [
  {
    id: 1,
    icon: "/navbar/menu-icon1.png",
    title: "Action",
  },
  { id: 2, icon: "/navbar/menu-icon2.png", title: "Action" },
  { id: 3, icon: "/navbar/menu-icon3.png", title: "Adventure" },
  { id: 4, icon: "/navbar/menu-icon4.png", title: "Arcade" },
  { id: 5, icon: "/navbar/menu-icon5.png", title: "Art" },
  { id: 6, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 7, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 8, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 9, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 10, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 11, icon: "/navbar/menu-icon5.png", title: "Reality" },
  { id: 12, icon: "/navbar/menu-icon5.png", title: "Reality" },
];
