"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchResult from "./SearchValue";
import useSWR from "swr";
import useDebounce from "@/hook/useDebounce";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchGame, setSearchGame] = useState<GameDetail[]>([]);

  const debouncedSearchText = useDebounce(searchText, 1000);

  if (!debouncedSearchText.trim()) return;
  const { isLoading, data, error } = useSWR(
    // `https://user-api.dev.grailfarmer.app/api/v1/games?limit=10&page=1&${debouncedSearchText}`,
    `https://tiktok.fullstack.edu.vn/api/users/search?q=${debouncedSearchText}`,
    fetcher
  );
  let result;
  if (data) {
    result = data.data;
  }
  const handleInputBlur = () => {
    setShowSearchInput(false);
  };

  return (
    <>
      <div className=" relative ">
        {showSearchInput && (
          <input
            ref={searchInputRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className=" w-96  py-2 ps-3 pe-8 rounded-3xl bg-transparent border-none "
            name=""
            id=""
            autoFocus
            onBlur={handleInputBlur}
          />
        )}
        <BiSearch
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="absolute inset-y-0 my-auto right-2 cursor-pointer"
          size={25}
        />
        {result?.length > 0 && (
          <div className=" absolute top-14 left-0 w-full bg-black rounded-xl shadow-lg">
            {isLoading && <div>Loading...</div>}
            {data &&
              result.map((item: GameDetail) => (
                <SearchResult searchValue={item} key={item.id} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
