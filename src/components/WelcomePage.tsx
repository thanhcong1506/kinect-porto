"use client";
import { fetchGamesAsync } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function WelcomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allGames, status } = useAppSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);

  const handleDetail = (gameId: number) => {
    if (session?.user) {
      router.push(`/detail/${gameId}`);
    } else {
      router.push("/login");
      toast.error("Please login first!!!");
    }
  };
  return (
    <div className=" w-full mx-auto h-screen overflow-hidden ">
      <div className=" bg-cover w-full bg-welcome h-full relative  flex flex-col justify-end">
        <div className="absolute p-5 top-[50%] -translate-y-[30%] md:-translate-y-[55%] lg:-translate-y-[25%] w-full h-full flex flex-col justify-between lg:flex-row lg:justify-end   md:justify-center md:gap-y-20">
          {/* <div className="hidden lg:w-1/2 "></div> */}
          <div className=" w-full lg:w-1/2 text-white flex flex-col items-end md:space-y-5  ">
            <h1 className=" text-[#50ABFF] text-lg md:text-2xl font-medium ">
              Best Kinect Gaming{" "}
            </h1>
            <h1 className=" text-4xl  md:text-5xl font-black lg:leading-[60px] ">
              Be the best player and get better on ABC
            </h1>
            <p className=" font-normal md:text-base">
              Open repair of infrarenal aortic aneurysm or dissection, plus
              repair of associated arterial trauma, following unsuccessful
              endovascular repair; aorto-bi-iliac prosthesis{" "}
            </p>
            <div className="  pe-0">
              <button
                onClick={() => router.push("/home")}
                className=" main-button "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 lg:px-5 lg:py-0  md:mb-5 lg:w-full ">
          <div className=" flex md:pt-40 flex-col gap-y-3">
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
                      <img
                        onClick={() => handleDetail(game.id)}
                        className="w-[200px] h-[120px]   rounded-md overflow-hidden cursor-pointer hover:scale-110 transition-all ease-in-out duration-300"
                        src={game.image_url}
                        alt=""
                      />

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
