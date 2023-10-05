"use client";

import React, { FC, ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchInputProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ searchText, setSearchText }) => {
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleInputBlur = () => {
    setShowSearchInput(false);
    setSearchText("");
  };

  return (
    <div className=" relative">
      {showSearchInput && (
        <input
          type="search"
          className=" w-96  py-2 ps-3 pe-8 rounded-3xl bg-transparent border-none "
          value={searchText}
          onChange={handleChange}
          placeholder="Search"
          autoFocus
          onBlur={handleInputBlur}
        />
      )}
      <BiSearch
        onClick={() => setShowSearchInput(!showSearchInput)}
        className="absolute inset-y-0 my-auto right-2 cursor-pointer"
        size={25}
      />
    </div>
  );
};

export default SearchInput;
