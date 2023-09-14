import Link from "next/link";
import React from "react";

const WelcomepageNavbar = () => {
  return (
    <div className="h-[80px] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 w-full flex items-center justify-end z-50  pe-5">
      <div className=" flex gap-2  ">
        <Link href={"/login"}>
          <button className="border border-[#8E54E9] px-6 py-2 text-white rounded-xl hover:bg-[#50abff] hover:transition-shadow ">
            Log in
          </button>
        </Link>

        <Link href={"/signup"}>
          <button className="main-button ">Become Member</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomepageNavbar;
