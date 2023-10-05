import React from "react";

interface SearchResultProps {
  searchResult: GameDetail;
}
const Item = (props: SearchResultProps) => {
  const { searchResult } = props;
  return (
    // <div className=" flex w-full py-2 ps-2 gap-3 ">
    //   <img
    //     width="120"
    //     className=" w-32 h-16 object-cover"
    //     src={searchValue.image_url}
    //     alt=""
    //   />
    //   <div className="flex flex-col  ">
    //     <p>{searchValue.name}</p>
    //     <div className=" flex gap-1">
    //       {searchValue.genres.map((genre) => (
    //         <button key={genre.id} className=" secondary-button !text-xs">
    //           {genre.name}
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <h1>hello</h1>
    </>
  );
};

export default Item;
