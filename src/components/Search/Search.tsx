"use client";

import React, { useRef, useState } from "react";
import useSWR from "swr";
import Item from "./Item";
import useDebounce from "@/hook/useDebounce";
import SearchInput from "./SearchInput";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(true);
  const searchResultInputRef = useRef<HTMLDivElement>(null);
  const debouncedSearchText = useDebounce(searchText, 500);
  const { isLoading, data } = useSWR(
    debouncedSearchText.trim()
      ? `https://tiktok.fullstack.edu.vn/api/users/search?q=${debouncedSearchText}`
      : null,
    fetcher
  );

  let result: GameDetail[] | undefined;
  if (data) {
    result = data.data;
  }

  return (
    <div className="relative">
      <SearchInput searchText={searchText} setSearchText={setSearchText} />

      {debouncedSearchText.trim() && (
        <>
          {result && result?.length > 0 && (
            <div
              ref={searchResultInputRef}
              className="absolute top-16 left-0 right-0 w-full bg-black rounded-xl shadow-lg "
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                result.map((item: GameDetail) => (
                  <Item searchResult={item} key={item.id} />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
