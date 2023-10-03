"use client";
import { fetchGamesAsync } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function WelcomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allGames, status } = useAppSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);
  return (
    <div className=" w-full mx-auto ">
      <div className=" bg-cover w-full bg-welcome h-screen overflow-hidden relative">
        <div className="absolute  top-[50%] translate-y-[-60%] w-full flex">
          <div className="w-1/2"></div>
          <div className="  w-1/2 text-white flex flex-col gap-y-2">
            <h1 className=" text-[#50ABFF] text-lg font-medium ">
              Best Kinect Gaming{" "}
            </h1>
            <h1 className=" text-5xl font-black leading-[60px] ">
              Be the best player and get better on ABC
            </h1>
            <p className=" font-normal">
              Open repair of infrarenal aortic aneurysm or dissection, plus
              repair of associated arterial trauma, following unsuccessful
              endovascular repair; aorto-bi-iliac prosthesis{" "}
            </p>
            <div className=" flex justify-end pe-5">
              <button
                onClick={() => router.push("/home")}
                className=" main-button "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className=" absolute bottom-6 left-3">
          <div className=" flex flex-col gap-y-3">
            <div className=" flex gap-2">
              <img src="/ic_round-expand-left.png" alt="" />
              <img src="/ic_round-expand-right.png" alt="" />
            </div>
            <div className=" max-w-max flex gap-4">
              {status === "loading" ? (
                <p className=" text-white">Loading...</p>
              ) : (
                <>
                  {allGames.map((game) => (
                    <div key={game.id}>
                      <Link href={`/detail/${game.id}`}>
                        <img
                          className="w-[200px] h-[120px]   rounded-md overflow-hidden cursor-pointer hover:scale-110 transition-all ease-in-out duration-300"
                          src={game.image_url}
                          alt=""
                        />
                      </Link>
                      <p className="text-white">{game.name}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
