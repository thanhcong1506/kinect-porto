"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const MyGame = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const token = session?.user.access_token;
  const [myGame, setMyGame] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const getMyGame = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            "https://user-api.dev.grailfarmer.app/api/v1/games/loved?limit=20&page=1",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!res.data) throw new Error("something went wrong");
          setMyGame(res.data.rows);
          console.log(myGame);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getMyGame();
    }
  }, [token]);

  const removeFavorite = async (game_id: number) => {
    if (status === "authenticated") {
      const data = { game_id: game_id };
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.post(
        "https://user-api.dev.grailfarmer.app/api/v1/games/love",
        data,
        { headers: headers }
      );
      router.refresh();
      console.log(res.data);
    }
  };
  return (
    <div className=" bg-[#1a2024] pt-[80px] text-white font-primary h-screen w-full ">
      <div className=" container mx-auto px-8 pt-3 h-full max-w-[1440px] ">
        <div className=" flex my-2">
          <p>
            <Link href={"/"}>Home </Link>
            <span>&gt;&nbsp;</span>
          </p>
          <p>My Game</p>
        </div>

        <div className=" text-5xl font-black">My Game</div>
        {loading && <p>Loading...</p>}
        <div className=" grid grid-cols-4 gap-10 ">
          {myGame.map((game) => (
            <div key={game.id} className=" py-5 h-[264px]">
              <div className="w-full h-full bg-black rounded-xl p-2">
                <img
                  className=" w-full h-full border border-purple-700 overflow-hidden rounded-xl"
                  src={game.image_url}
                  alt=""
                />
              </div>
              <div className=" flex justify-between px-3 items-center my-2">
                <p>{game.name}</p>
                <AiFillHeart
                  size={30}
                  className="fill-rose-500 cursor-pointer"
                  onClick={() => removeFavorite(game.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className=" w-1/2 mx-auto bg-black rounded-xl py-5 mt-5 relative ">
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

export default MyGame;
