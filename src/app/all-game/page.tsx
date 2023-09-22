import ListItem from "@/components/ListItem";
import React from "react";
import PaginationControls from "@/utils/paginationControls";

const AllGames = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = [
    "entry 1",
    "entry 2",
    "entry 3",
    "entry 4",
    "entry 5",
    "entry 6",
    "entry 7",
    "entry 8",
    "entry 9",
    "entry 10",
    "entry 11",
    "entry 12",
    "entry 13",
    "entry 14",
    "entry 15",
    "entry 16",
    "entry 17",
    "entry 18",
    "entry 19",
    "entry 20",
    "entry 21",
    "entry 22",
    "entry 23",
    "entry 24",
    "entry 25",
    "entry 26",
    "entry 27",
    "entry 28",
    "entry 29",
    "entry 30",
    "entry 31",
    "entry 32",
    "entry 33",
    "entry 34",
    "entry 35",
    "entry 36",
    "entry 37",
    "entry 38",
    "entry 39",
    "entry 40",
    "entry 41",
    "entry 42",
    "entry 43",
    "entry 44",
    "entry 45",
    "entry 46",
    "entry 47",
    "entry 48",
    "entry 49",
    "entry 50",
    "entry 51",
    "entry 52",
    "entry 53",
    "entry 54",
    "entry 55",
    "entry 56",
    "entry 57",
    "entry 58",
    "entry 59",
    "entry 60",
    "entry 61",
    "entry 62",
    "entry 63",
    "entry 64",
    "entry 65",
    "entry 66",
    "entry 67",
    "entry 68",
    "entry 69",
    "entry 70",
  ];

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "20";

  //mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); //0,20,40...
  const end = start + Number(per_page); //20,40,60...

  const games = data.slice(start, end);

  return (
    <div className="bg-[#1a2024] text-white">
      <div className="  container mx-auto px-8 pt-[100px] pb-5">
        <div className=" flex mb-4">
          <p className=" text-gray-200 cursor-pointer">{`Home &nbsp;`}</p>
          <span className=" text-gray-200">{`&gt;&nbsp;`}</span>
          <span> All Games</span>
        </div>
        <div className=" flex justify-between ps-8 mb-2 relative">
          <p className=" text-3xl font-bold uppercase text-white"> games</p>
          <p className=" absolute top-[-16px] left-1 z-10 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#0038FF] via-[#F800FF]  to-[#16BB52] ">
            ALL
          </p>
        </div>
        <div className=" grid grid-cols-4 gap-4">
          {games && games.map((game) => <p key={game}>{game} </p>)}
        </div>
        <PaginationControls
          hasNextPage={end < data.length}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
};

export default AllGames;
