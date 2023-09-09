import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" bg-[#1a2024] font-primary">
      <Navbar />
      <div className=" w-full min-h-screen flex items-center flex-col justify-center text-white pt-24 ">
        <img className=" pb-3" src="/404.png" alt="" />
        <p className=" pb-5 w-1/2 text-center text-base flex flex-col">
          <span className=" leading-none">
            We’re sorry, the page you requested could not be found.
          </span>
          <span>Please go back to the home page.</span>
        </p>
        <Link href="/">
          <button className=" main-button">Back To Homepage</button>
        </Link>
      </div>
    </div>
  );
}
