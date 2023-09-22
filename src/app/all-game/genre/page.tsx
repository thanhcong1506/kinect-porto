import Link from "next/link";
import React from "react";
import PaginationControls from "@/utils/paginationControls";
import ListItem from "@/components/ListItem";
import { useSession } from "next-auth/react";

const Genre = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = useSession();
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "8";
  const token = session.data?.user.access_token;

  //mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); //0,20,40...
  const end = start + Number(per_page); //20,40,60...

  const genres = [
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/320a70fd-7dfb-41de-931d-798080258b2f.png",
      id: 1,
      name: "IO Games",
      icon_filesize: 28994,
      icon_extension: "png",
      icon_id: "320a70fd-7dfb-41de-931d-798080258b2f",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-05-30T08:54:53.000Z",
      updated_at: "2023-06-23T05:05:22.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/a7580875-3d5b-4dcd-877a-d94c796ddce3.png",
      id: 2,
      name: "Arcade Games",
      icon_filesize: 41364,
      icon_extension: "png",
      icon_id: "a7580875-3d5b-4dcd-877a-d94c796ddce3",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-05-30T08:55:39.000Z",
      updated_at: "2023-06-23T06:47:12.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/17313d2d-10ce-4618-a8b5-c5af974ab251.png",
      id: 3,
      name: "Adventure Games",
      icon_filesize: 15306,
      icon_extension: "png",
      icon_id: "17313d2d-10ce-4618-a8b5-c5af974ab251",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-05-30T08:55:44.000Z",
      updated_at: "2023-06-23T07:00:12.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/9e8b0247-ecc7-4139-bad7-5728bc45c7fd.png",
      id: 4,
      name: "Puzzle Games",
      icon_filesize: 21584,
      icon_extension: "png",
      icon_id: "9e8b0247-ecc7-4139-bad7-5728bc45c7fd",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-05-30T08:55:50.000Z",
      updated_at: "2023-06-28T04:02:22.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/ad418f0d-7b9d-4570-88fb-e245622c8aa0.png",
      id: 5,
      name: "Action Games",
      icon_filesize: 31550,
      icon_extension: "png",
      icon_id: "ad418f0d-7b9d-4570-88fb-e245622c8aa0",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-05-30T08:56:08.000Z",
      updated_at: "2023-06-23T04:49:33.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/7530f187-0638-44b3-b73c-2c5e43faa313.png",
      id: 6,
      name: "Sport Games",
      icon_filesize: 41402,
      icon_extension: "png",
      icon_id: "7530f187-0638-44b3-b73c-2c5e43faa313",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-06-05T03:33:50.000Z",
      updated_at: "2023-06-23T04:53:39.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/712a7396-b5f7-4c8d-8526-5f87b6b324c2.png",
      id: 7,
      name: "Fighting Games",
      icon_filesize: 10286,
      icon_extension: "png",
      icon_id: "712a7396-b5f7-4c8d-8526-5f87b6b324c2",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-06-05T03:34:47.000Z",
      updated_at: "2023-06-23T05:01:58.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/71a00051-db89-45c7-9bb1-c73e4d4c23df.png",
      id: 8,
      name: "Racing Games",
      icon_filesize: 24439,
      icon_extension: "png",
      icon_id: "71a00051-db89-45c7-9bb1-c73e4d4c23df",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-06-05T03:35:14.000Z",
      updated_at: "2023-06-23T04:52:03.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/2fc1c81f-e83a-43d6-9096-84ca345ce8c1.png",
      id: 9,
      name: "Survival Games",
      icon_filesize: 43525,
      icon_extension: "png",
      icon_id: "2fc1c81f-e83a-43d6-9096-84ca345ce8c1",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-06-05T03:35:42.000Z",
      updated_at: "2023-06-23T04:51:01.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url:
        "https://sti-game-asset.s3.ap-southeast-1.amazonaws.com/5ab736d5-9206-4b9c-8510-05230e6a8f3a.png",
      id: 10,
      name: "RPG Games",
      icon_filesize: 20074,
      icon_extension: "png",
      icon_id: "5ab736d5-9206-4b9c-8510-05230e6a8f3a",
      icon_height: 512,
      icon_width: 512,
      is_deleted: false,
      created_at: "2023-06-05T03:35:57.000Z",
      updated_at: "2023-06-27T03:24:18.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url: "",
      id: 19,
      name: "Cooking Games",
      icon_filesize: null,
      icon_extension: null,
      icon_id: null,
      icon_height: null,
      icon_width: null,
      is_deleted: false,
      created_at: "2023-06-28T06:52:59.000Z",
      updated_at: "2023-06-28T06:52:59.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url: "",
      id: 20,
      name: "All Games",
      icon_filesize: null,
      icon_extension: null,
      icon_id: null,
      icon_height: null,
      icon_width: null,
      is_deleted: false,
      created_at: "2023-06-28T06:53:22.000Z",
      updated_at: "2023-06-28T06:53:22.000Z",
      deleted_at: null,
      download_url: "",
    },
    {
      image_url: "",
      id: 21,
      name: "Welcome to the Fresh Spring Style game.",
      icon_filesize: null,
      icon_extension: null,
      icon_id: null,
      icon_height: null,
      icon_width: null,
      is_deleted: false,
      created_at: "2023-06-28T06:54:04.000Z",
      updated_at: "2023-06-28T06:54:04.000Z",
      deleted_at: null,
      download_url: "",
    },
  ];

  const genre = genres.slice(start, end);
  return (
    <div className=" text-white py-5 bg-[#1a2024] pt-[80px]">
      <div className="container mx-auto px-8">
        <div className=" flex mt-3 mb-5">
          <p>
            <Link href={"/"}>Home </Link>
            <span>{`&gt;&nbsp;`}</span>
          </p>
          <p>
            <Link href={"/all-game"}>All game </Link>
            <span>{`&gt;&nbsp;`}</span>
          </p>
          <p>Action</p>
        </div>

        <div className=" flex justify-between ps-8 pb-2 relative">
          <p className=" text-3xl font-bold uppercase text-white"> games</p>
          <p className=" absolute top-[-16px] left-1 z-10 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#0038FF] via-[#F800FF]  to-[#16BB52] ">
            ALL
          </p>
        </div>
        <div className=" flex gap-x-3">
          <button className=" secondary-button">Action</button>
          <button className=" secondary-button">Adventure</button>
          <button className=" secondary-button">Arcade</button>
          <button className=" secondary-button">Reality</button>
        </div>
        <div className=" flex flex-col items-center">
          <div className=" grid grid-cols-4 gap-4 mt-2">
            {genres.map((genre) => (
              <ListItem
                game_id={genre.id}
                key={genre.id}
                game={genre}
                token={token}
              />
            ))}
          </div>
          <PaginationControls
            hasNextPage={end < genres.length}
            hasPrevPage={start > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Genre;
