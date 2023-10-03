import React from "react";
import { BsArrowDownShort } from "react-icons/bs";

const DownloadButton = () => {
  return (
    <div className=" main-button flex items-center w-max cursor-pointer">
      <span>Download</span>
      <span>
        <BsArrowDownShort size={24} />
      </span>
    </div>
  );
};

export default DownloadButton;
