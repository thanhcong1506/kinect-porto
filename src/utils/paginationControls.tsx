"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";

  return (
    <div className="flex items-center justify-center mt-2 text-[#02FDFD] gap-3">
      <button
        className=""
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/all-game?page=${Number(page) - 1}&per_page=${per_page}`
          );
        }}
      >
        <IoIosArrowBack />
      </button>

      <div>
        {page}
        {/* {page} / {Math.ceil(10 / Number(per_page))} *Tổng số trang */}
      </div>

      <button
        className=""
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/all-game?page=${Number(page) + 1}&per_page=${per_page}`
          );
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default PaginationControls;
