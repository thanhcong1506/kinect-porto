"use client"; // Error components must be Client Components

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Error() {
  return (
    <div className=" bg-[#1a2024] font-primary">
      <Navbar />
      <div className=" w-full min-h-screen flex items-center flex-col justify-center text-white pt-24 ">
        <img className=" pb-3" src="/503.png" alt="" />
        <p className=" pb-5 w-1/2 text-center text-base flex flex-col">
          <span className=" leading-none">
            We’re under maintenance. We are improving our website.
          </span>
          <span>We’ll be back shortly.</span>
        </p>
        <Link href="/">
          <button className=" main-button">Back To Homepage</button>
        </Link>
      </div>
    </div>
  );
}
