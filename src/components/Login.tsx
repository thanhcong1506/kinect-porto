"use client";

import React, { useCallback, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import useInput from "@/hook/useInput";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hook";

const Login: React.FC<{}> = (props: any) => {
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data?.user);
  const dispatch = useAppDispatch();
  const [variant, setVariant] = useState("login");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVarient = useCallback(() => {
    setVariant((currentVarient) =>
      currentVarient === "login" ? "forgotPassword" : "login"
    );
  }, []);

  const toggleshowPassword = () => {
    setIsShowPassword(!isShowPassword);
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
  } = useInput((value: string) => value.trim() !== "");

  let formIsValid: boolean = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (variant === "login") {
      try {
        const res = await axios.post(
          "https://user-api.dev.grailfarmer.app/api/v1/auth/login-email",
          {
            email: enteredEmail,
            password: enteredPassword,
          }
        );
        if (res.data) {
          await signIn("credentials", {
            email: enteredEmail,
            password: enteredPassword,
            redirect: false,
            callbackUrl: "/home",
          });

          router.push("/home");
          toast.success("Login successfully");
          resetEmailInput();
          resetPasswordInput();
        }
      } catch (err: any) {
        setError(err.response.data?.message);
        toast.error(`${err.response.data.message}`);
      }
    } else {
      console.log("clicked");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const { data } = await axios.post(
        "https://user-api.dev.grailfarmer.app/api/v1/auth/forgot-password",
        {
          email: enteredEmail,
        }
      );
      if (data === true) {
        toast.success("Please check email ");
      }
    } catch (error) {
      console.error(error);
      toast.error("You are not a member of KinectPortal yet, Register now!!!");
    }
  };

  return (
    <div>
      <div className=" w-full  mx-auto  h-screen flex overflow-hidden ">
        <div className="w-0  md:w-6/12 lg:w-7/12">
          <div className=" w-full bg-cover bg-none md:bg-login h-full  "></div>
        </div>
        <div className="w-full md:w-6/12 lg:w-5/12 h-full  bg-[#14191D]">
          <div className=" h-full w-full relative ">
            <div className=" flex gap-3 justify-end  lg:pe-3  xl:pe-7 pt-7 pe-5">
              <p className=" uppercase text-[#344148] font-extrabold text-base">
                {`haven't a account`}
              </p>
              <Link href={"/signup"}>
                <button className=" uppercase text-white ">sign up</button>
              </Link>
            </div>
            <div className=" flex w-full px-5 top-1/2 -translate-y-1/3 md:-translate-y-[20%] lg:-translate-y-[40%] lg:mt-20 h-full lg:ps-16 absolute left-0 ">
              <form onSubmit={handleSubmit} action="" className=" w-full   ">
                <div className=" mb-5 flex flex-col items-center lg:items-start">
                  <h1 className=" text-white text-3xl lg:text-4xl uppercase font-black">
                    {variant === "login" ? " log in" : "Forgot Password ?"}
                  </h1>
                  <p className=" text-white p-0 text-xs">
                    {variant === "login"
                      ? "Hi There! Join Us And Enjoy"
                      : "Please enter the email or phone number you use to sign in Kinect Portal"}
                  </p>
                </div>
                <div className=" mt-8 flex flex-col lg:max-w-[390px] mb-5">
                  <label className=" text-white" htmlFor="">
                    Email Or Phone Number
                  </label>
                  <input
                    placeholder="Email or mobile phone"
                    className=" px-3 py-2 bg-[#344148] rounded-md text-white"
                    onChange={emailChangeHandler}
                    onBlur={emailBlueHandler}
                    value={enteredEmail}
                    type="text"
                    id="email"
                    name="email"
                    onInput={() => setError("")}
                  />
                  {emailInputHasError && (
                    <p className=" text-red-600">
                      Please input a email or phone number!!!
                    </p>
                  )}
                </div>
                <div
                  className={
                    variant === "login"
                      ? "flex flex-col relative w-full lg:max-w-[390px] mb-5"
                      : "hidden"
                  }
                >
                  <label className="text-white" htmlFor="">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full  px-3 py-2 bg-[#344148] rounded-md text-white"
                      placeholder="Password"
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlueHandler}
                      value={enteredPassword}
                      type={isShowPassword ? "text" : "password"}
                      id="password"
                      name="password"
                    />
                    <div
                      onClick={toggleshowPassword}
                      className=" absolute top-[50%] -translate-y-[50%] right-3 cursor-pointer text-white"
                    >
                      <RiEyeCloseLine size={28} />
                    </div>
                  </div>
                  {passwordInputHasError && (
                    <p className="text-red-600">Please input a password!!!</p>
                  )}
                  <p
                    onClick={toggleVarient}
                    className=" text-[#0038FF] text-end text-xs pt-1 cursor-pointer"
                  >
                    Forgot Password?
                  </p>
                </div>
                <button
                  onClick={
                    variant === "login" ? handleSubmit : handleForgotPassword
                  }
                  type="submit"
                  className=" main-button w-full lg:max-w-[390px] text-2xl font-black mb-5"
                >
                  {variant === "login" ? "START" : "NEXT"}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setVariant("login");
                  }}
                  className={
                    variant === "login"
                      ? "hidden"
                      : " text-[#50ABFF] w-[390px] py-3 cursor-pointer rounded-xl justify-center text-sm flex border border-transparent hover:border-blue-600 hover:text-opacity-70 ease-in-out duration-500 mb-5"
                  }
                >
                  Back to Log in
                </button>
                {error && (
                  <div ref={errorRef} className="text-red-600">
                    {error}
                  </div>
                )}
                <p className=" bg-[#344148] w-full h-[1px] my-5"></p>

                <p className=" text-white  w-full mb-5">
                  Or continue open account
                </p>
                <div className=" flex gap-4 text-white">
                  <div className=" flex gap-2 p-2 bg-[#143A4F]  rounded-md items-center">
                    <img
                      className=" w-5 h-5"
                      src="/flat-color-icons_google.png"
                      alt=""
                    />
                    <button onClick={() => signIn("google")}>GOOGLE</button>
                  </div>
                  <div className=" flex gap-2 p-2 bg-[#143A4F] rounded-md items-center">
                    <img
                      className=" w-5 h-5"
                      src="/logos_facebook.png"
                      alt=""
                    />
                    <button onClick={() => signIn("facebook")}>FACEBOOK</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
