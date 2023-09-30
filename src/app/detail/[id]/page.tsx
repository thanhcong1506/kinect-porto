"use client";
import ImageModal from "@/components/ImageModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
} from "react-icons/ai";

const Detail = ({ params }: { params: { id: number } }) => {
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const [data, setData] = useState<GameDetail | null>(null);
  useEffect(() => {
    const getUserDetail = async () => {
      const { data } = await axios.get(
        `https://user-api.dev.grailfarmer.app/api/v1/games/detail/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(data);
    };
    getUserDetail();
  }, [token]);

  const openModal = (image: string) => {
    setCurrentImage(image);
  };

  const closeModal = () => {
    setCurrentImage("");
  };

  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined
  );

  const handleNextImage = () => {
    const dataImage = data?.game_screenshots;
    if (dataImage && currentImage) {
      const currentIndex = dataImage.findIndex(
        (image) => image === currentImage
      );
      if (currentIndex !== -1 && currentIndex < dataImage.length - 1) {
        setCurrentImage(dataImage[currentIndex + 1]);
      }
    }
  };

  const handlePrevImage = () => {
    const dataImage = data?.game_screenshots;
    if (dataImage && currentImage) {
      const currentIndex = dataImage.findIndex(
        (image) => image === currentImage
      );
      if (currentIndex !== -1 && currentIndex > 0) {
        setCurrentImage(dataImage[currentIndex - 1]);
      }
    }
  };
  return (
    <div className=" bg-detail bg-cover overflow-hidden w-full min-h-screen text-white">
      <div className=" container mx-auto max-w-[1300px] pt-24">
        <div className="flex">
          <span>{`Home {&gt;&nbsp;} `}</span>
          <span> {data?.name}</span>
        </div>
        <div className="w-full h-[400px] rounded-xl object-contain overflow-hidden">
          <img className=" w-full h-full" src={data?.image_url} alt="" />
        </div>

        <div className=" flex flex-col space-y-4 py-5">
          <div className=" flex justify-between items-center">
            <div className=" flex flex-col gap-2">
              <div className="flex gap-10 items-center">
                <h1 className=" text-5xl">{data?.name}</h1>
                <span className=" relative">
                  <AiOutlineHeart
                    className=" fill-white absolute -top-[2px] -right-[2px]"
                    size={28}
                  />
                  <AiFillHeart
                    className={
                      data?.isLoved ? "fill-rose-500" : " fill-neutral-500/70"
                    }
                    size={24}
                  />
                </span>
              </div>
              <div className=" flex gap-1">
                {data?.genres.map((genre) => (
                  <button key={genre.id} className=" secondary-button">
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            <div className=" flex flex-col pe-10">
              <div className=" flex ">
                <button className=" main-button flex items-center gap-1">
                  <span>Download</span>
                  <span>
                    <img src="/arrowDown.png" alt="" />
                  </span>
                </button>
              </div>
              <p className=" text-end font-normal text-sm text-[#AFAFAF]">
                3.56GB
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-3">
            <p className=" w-2/3">{data?.description}</p>
            <button className=" secondary-button flex items-center gap-1 w-max">
              <span className=" text-[#50ABFF]">Read More</span>
              <span>
                <img src="/down.png" alt="" />
              </span>
            </button>
          </div>
        </div>
        <div className="pt-5 pb-10">
          <div className=" flex justify-between items-center pe-5 pb-3">
            <h1 className=" text-xl">SCREENSHOTS</h1>
            <div className=" flex gap-1">
              <AiOutlineLeftCircle
                size={30}
                className="text-white cursor-pointer hover:scale-125 ease-linear duration-300"
              />
              <AiOutlineRightCircle
                size={30}
                className="text-white cursor-pointer hover:scale-125 ease-linear duration-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 w-full ">
            {data?.game_screenshots &&
              data.game_screenshots.map((shot, index) => (
                <img
                  onClick={() => openModal(shot)}
                  className="  h-[250px] bg-cover overflow-hidden rounded-xl cursor-pointer hover:scale-110 ease-in-out duration-300"
                  src={shot}
                  key={index}
                  alt="Screen shot"
                />
              ))}

            {currentImage && (
              <ImageModal
                image={currentImage}
                onCloseModal={closeModal}
                onNextImage={handleNextImage}
                onPrevImage={handlePrevImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
