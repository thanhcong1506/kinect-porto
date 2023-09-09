"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import React from "react";
import { RiEyeCloseLine } from "react-icons/ri";

import axios from "axios";
import useInput from "@/hook/useInput";
import { toast } from "react-toastify";

const Signup: React.FC<{}> = (props: any) => {
  const [type, setType] = useState<string>("password");
  const [error, setError] = useState<string | null>(null);

  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const errorRef = useRef<HTMLInputElement>(null);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlueHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => value.trim() !== "");
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlueHandler,
    reset: resetPasswordInput,
  } = useInput(
    (value: string) => value.trim().length > 6 && value.trim().length < 15
  );

  let formIsValid: boolean = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    try {
      const res = await axios.post(
        "https://user-api.dev.grailfarmer.app/api/v1/auth/signup",
        { email: enteredEmail, password: enteredPassword }
      );

      if (res.data) {
        toast.success("Register successfullly, please verify email");
        resetEmailInput();
        resetPasswordInput();
      }
    } catch (err: any) {
      setError(err.response.data.message);

      toast.error(`${err.response.data.message}`);
    }
    // console.log(enteredEmail);
    // console.log(enteredPassword);
  };

  return (
    <div className=" container mx-auto  h-full flex w-full mb-">
      <div className=" w-7/12">
        <div className=" w-full bg-cover bg-signup h-screen overflow-hidden  "></div>
      </div>
      <div className=" w-5/12 h-screen ">
        <div className="bg-[#14191D] h-full w-full relative ">
          <div className=" flex gap-3 justify-end pe-7 pt-7">
            <p className=" uppercase text-[#344148] font-extrabold text-base">
              have a account
            </p>
            <Link href={"/login"}>
              <button className=" uppercase text-white">Log in</button>
            </Link>
          </div>
          <div className=" flex items-center h-full ps-16 absolute top-0 left-0 ">
            <div>
              <form onSubmit={handleSubmit} action="" className=" w-[390px] ">
                <div className=" mb-5">
                  <h1 className=" text-white text-4xl uppercase font-black">
                    sign up
                  </h1>
                  <p className=" text-white p-0 text-xs">
                    Hi There! Join Us And Enjoy
                  </p>
                </div>
                <div className=" mb-5 flex flex-col text-white ">
                  <label className=" text-white" htmlFor="">
                    Email Or Phone Number
                  </label>
                  <input
                    className="px-3 py-2 bg-[#344148] rounded-md text-white   "
                    onChange={emailChangeHandler}
                    onBlur={emailBlueHandler}
                    value={enteredEmail}
                    type="text"
                    id="email"
                    onInput={() => setError("")}
                  />
                  {emailInputHasError && (
                    <p className=" text-red-600">
                      Please input a email or phone number!!!
                    </p>
                  )}
                </div>
                <div className="flex flex-col mb-5 ">
                  <label className="text-white" htmlFor="">
                    Password
                  </label>
                  <div className=" w-full">
                    <div className="relative">
                      <input
                        className="w-full  px-3 py-2 bg-[#344148] rounded-md text-white"
                        placeholder="Password"
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlueHandler}
                        value={enteredPassword}
                        type={type}
                        id="password"
                      />
                      <div
                        onClick={toggleType}
                        className=" absolute top-[50%] -translate-y-[50%] right-3 cursor-pointer text-white"
                      >
                        <RiEyeCloseLine size={28} />
                      </div>
                    </div>
                    {passwordInputHasError && (
                      <p className="text-red-600">
                        Password must have at least 6 character, at max 15
                        character!!!
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={
                    emailInputHasError || passwordInputHasError
                      ? " main-button w-full text-2xl font-black cursor-not-allowed mb-10"
                      : " main-button w-full text-2xl font-black cursor-pointer mb-10"
                  }
                >
                  START
                </button>
              </form>
              {error && (
                <div ref={errorRef} className="text-red-600">
                  {error}
                </div>
              )}
              <p className=" bg-[#344148] w-full h-[1px] mb-5"></p>
              <p className=" text-white  w-full mb-5">
                Or continue open account
              </p>
              <div className=" flex gap-4 text-white mb-5">
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
              <p className="text-[#344148] text-sm mb-5">
                By registering you agree with our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
