"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import DownloadButton from "./DownloadButton";

const getAllgames = async () => {
  const res = await axios.get(
    "https://user-api.dev.grailfarmer.app/api/v1/games?limit=10&page=1"
  );

  const games = await res.data;
  return games.rows;
};

const Featured = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    getAllgames().then((data) => {
      setGames(data);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === games.length - 1 ? 0 : prev + 1)),
      4000
    );

    return () => clearInterval(interval);
  }, [games]);
  return (
    <div className=" w-full ">
      <div className=" container mx-auto px-3 md:px-5 lg:px-8 pt-[80px]">
        <div className=" h-[415px] rounded-lg overflow-hidden  relative flex transition-transform ease-out duration-1000">
          <div className="w-full h-full bg-transparent-to-bottom absolute top-0 left-0"></div>
          <img
            className=" w-full h-full object-cover"
            src={games[currentSlide]?.image_url}
            alt={`img slide  ${games[0]}`}
          />
          <div className=" absolute top-1/2 -translate-y-1/2  px-3 lg:left-6 w-full md:w-2/3 lg:w-1/2 space-y-3">
            <div className=" flex gap-[2px]">
              {games[currentSlide]?.genres?.map((genre) => (
                <Link key={genre.id} href={`/games-genre/${genre.id}`}>
                  <button className="py-1 px-[6px] md:py-2 md:px-3 bg-[#2f3940] rounded-full">
                    {genre.name}
                  </button>
                </Link>
              ))}
            </div>
            <h1 className=" text-4xl font-semibold">
              {games[currentSlide]?.name}
            </h1>
            <p className=" text-sm font-normal">
              {games[currentSlide]?.description}
            </p>
            <div className="flex gap-3">
              {games[currentSlide]?.download_url && (
                <Link href={games[currentSlide]?.download_url} passHref>
                  <DownloadButton />
                </Link>
              )}
              <Link href={`/detail/${games[currentSlide]?.id}`}>
                <button className=" main-button !py-[6px] outline bg-none">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {games.map((_, i) => (
                <div
                  onClick={() => setCurrentSlide(i)}
                  key={i}
                  className={`
              transition-all w-3 h-1 bg-white cursor-pointer
              ${currentSlide === i ? "w-5" : "bg-opacity-50"}
            `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
