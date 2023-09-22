import Link from "next/link";
export default function ResetPassword() {
  return (
    <div className=" container mx-auto px-10 h-full flex">
      <div className=" w-7/12">
        <div className=" w-full bg-cover bg-login h-screen overflow-hidden  "></div>
      </div>
      <div className=" w-5/12 h-screen ">
        <div className="bg-[#14191D] h-full w-full relative ">
          <div className=" flex gap-3 justify-end pe-7 pt-7">
            <button className=" uppercase text-[#344148] font-extrabold text-base">
              {`haven't a account`}
            </button>
            <Link href={"/signup"}>
              <button className=" uppercase text-white">sign up</button>
            </Link>
          </div>
          <div className=" flex items-center h-full ps-16 absolute top-0 left-0 ">
            <form action="" className=" w-full  space-y-5">
              <div className="">
                <h1 className=" text-white text-4xl uppercase font-black">
                  Reset Password
                </h1>
                <p className=" text-white p-0 text-xs">
                  Please enter your new password
                </p>
              </div>

              <div className="flex flex-col relative w-[390px]">
                <label className="text-white" htmlFor="">
                  Password*
                </label>
                <input
                  className=" px-3 py-2 bg-[#344148] rounded-md "
                  type="password"
                />
                <img
                  src="/offpassword.png"
                  className=" absolute  right-6 top-10 cursor-pointer"
                ></img>
              </div>
              <div className="flex flex-col relative w-[390px]">
                <label className="text-white" htmlFor="">
                  Confirm password*
                </label>
                <input
                  className=" px-3 py-2 bg-[#344148] rounded-md "
                  type="password"
                />
                <img
                  src="/offpassword.png"
                  className=" absolute  right-6 top-10 cursor-pointer"
                ></img>
              </div>
              <button className=" main-button w-[390px] text-2xl font-black">
                START
              </button>

              <p className=" bg-[#344148] w-full h-[1px] "></p>

              <p className=" text-white  w-full ">Or continue open account</p>
              <div className=" flex gap-4 text-white">
                <div className=" flex gap-2 p-2 bg-[#143A4F]  rounded-md items-center">
                  <img
                    className=" w-5 h-5"
                    src="/flat-color-icons_google.png"
                    alt=""
                  />
                  <button>GOOGLE</button>
                </div>
                <div className=" flex gap-2 p-2 bg-[#143A4F] rounded-md items-center">
                  <img className=" w-5 h-5" src="/logos_facebook.png" alt="" />
                  <button>FACEBOOK</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
