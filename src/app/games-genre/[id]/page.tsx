"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ListItem from "@/components/ListItem";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { toggleLovedGame } from "@/redux/gameSlice";
import { fetchGenres } from "@/redux/genreSlice";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import Skeleton from "@/utils/Skeleton";

const Genre = ({ params }: { params: { id: string } }) => {
  const { id } = useParams();

  const { data: session } = useSession();
  const token = session?.user?.access_token;
  const { genre, status } = useAppSelector((state: RootState) => state.genre);
  const genreName = useAppSelector((state: RootState) =>
    state.genre.genre.find((item) => item.id === parseInt(params.id))
  );

  const [genreDetail, setGenreDetail] = useState<Games[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const fetchGenreDetail = async () => {
    try {
      if (!token) return;
      const gameGenre = await axios.get(
        `https://user-api.dev.grailfarmer.app/api/v1/games/genre/${params.id}?limit=10&page=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGenreDetail(gameGenre.data.rows); // Cập nhật lại dữ liệu
    } catch (error) {
      console.log("Error calling API:", error);
    }
  };

  const handleToggleLoveGame = (id: number | undefined) => {
    const promise = dispatch(toggleLovedGame(id))
      .then(() => {
        fetchGenreDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchGenreDetail();
  }, [token]);

  return (
    <>
      <Navbar />

      <div className=" text-white py-5 bg-[#1a2024] pt-[80px]">
        <div className="container mx-auto px-8">
          <div className=" flex mt-3 mb-5">
            <p>
              <Link href={"/"}>Home </Link>
              <span>&gt;&nbsp;</span>
            </p>
            <p>
              <Link href={"/all-game"}>All game </Link>
              <span>&gt;&nbsp;</span>
            </p>
            <p>{genreName?.name}</p>
          </div>

          <div className=" flex justify-between ps-8 pb-2 relative">
            <p className=" text-3xl font-bold uppercase text-white"> games</p>
            <p className=" absolute top-[-16px] left-1 z-10 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#0038FF] via-[#F800FF]  to-[#16BB52] ">
              ALL
            </p>
          </div>
          <div className=" flex gap-x-[2px] truncate">
            {genre &&
              genre.map((item) => (
                <Link key={item.id} href={`${item.id}`}>
                  <button
                    className={` secondary-button !text-sm !py-1 !px-2 ${
                      item.id === parseInt(params.id) ? "bg-[#FB04FF]" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
          </div>
          {genreDetail.length > 0 ? (
            <>
              <div className=" flex flex-col items-center">
                <div className=" grid grid-cols-4 gap-4 mt-4">
                  {status === "loading" ? (
                    <Skeleton />
                  ) : (
                    <>
                      {genreDetail &&
                        genreDetail.map((genre) => (
                          <ListItem
                            onToggleLoveGame={handleToggleLoveGame}
                            key={genre.id}
                            game={genre}
                          />
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className=" text-xl text-white flex justify-center items-center pt-20">
              No Game
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Genre;
