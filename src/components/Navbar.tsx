"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import Search from "./Search/Search";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { fetchGenres } from "@/redux/genreSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { genre, status } = useAppSelector((state: RootState) => state.genre);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Chuyển hướng tùy chỉnh

    router.push("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`font-primary w-full text-white fixed top-0 z-30  shadow-gray-50 ${
        showMenu ? "bg-[#14191D] " : " bg-[rgba(0,0,0,0.2)] "
      }`}
    >
      <div className="  mx-auto lg:px-10 px-5 flex justify-between items-center h-20 w-full ">
        <div className=" flex gap-5">
          <p onClick={() => setShowMenu(!showMenu)}>
            {!showMenu ? (
              <BiMenu size={30} className=" cursor-pointer text-white" />
            ) : (
              <AiFillCloseCircle
                size={30}
                className=" cursor-pointer text-white "
              />
            )}
          </p>

          <Link href={"/home"}>
            <img className=" cursor-pointer" src="/banner-icon.png" alt="" />
          </Link>
        </div>
        <div className=" flex justify-end items-center gap-7">
          <Search />

          <div className="hidden lg:flex gap-2 items-center relative">
            {session?.user && <p>{session.user.email}</p>}
            <div className=" hover:flex flex-col group">
              <img
                className=" hover:scale-125"
                src="/navbar/down-menu.png"
                alt=""
              />
              <div className=" hidden group-hover:flex flex-col bg-black w-44 p-3 rounded-md absolute top-16 right-0 gap-y-2 group-hover:cursor-pointer text-xs font-medium ">
                <span className=" absolute h-12 w-full bg-transparent top-[-45px] left-0"></span>
                <div className=" flex justify-around items-center hover:bg-[#1A2024] px-3 py-2 hover:rounded-3xl duration-300 ">
                  <img src="/navbar/icon-game.png" alt="" />
                  <Link href={"/my-game"}>
                    <p>My Games</p>
                  </Link>
                </div>
                <span
                  onClick={handleSignOut}
                  className=" text-center border border-white rounded-3xl px-3 py-2 hover:cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 "
                >
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
        ref={menuRef}
        className={`absolute w-3/4 md:w-1/3 lg:w-1/5 bg-[#14191D]  z-10 transition-all duration-500 pt-3  ease-in  ${
          showMenu
            ? "top-20 min-h-screen left-0 "
            : " -left-96 md:-left-80 min-h-screen "
        }`}
      >
        <div className="px-8">
          <div className=" flex justify-between  items-center border-b border-b-[#344148] pb-2">
            <p className=" text-2xl font-extrabold text-white">GENRE</p>
            <p className=" h-[2px] w-3 bg-white"></p>
          </div>
        </div>
        <ul className="ps-8">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <>
              {genre?.map((item) => (
                <Link key={item.id} href={`/games-genre/${item.id}`}>
                  <li className=" flex gap-3 items-center ps-2 py-2 cursor-pointer hover:bg-slate-800 hover:rounded-lg">
                    <img
                      className=" h-4 w-4"
                      src={item.icon || "/navbar/menu-icon5.png"}
                      alt=""
                    />
                    <p className=" truncate pe-10">{item.name}</p>
                  </li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
