"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Login as logo } from "@/app/constants/Auth.js";
import Link from "next/link";
import { forgetPasswordConst as constData } from "@/app/constants/Auth";
import useAuth from "@/app/api/Auth.api";
import { FormEvent } from "react";
const ForgetPassPage = () => {
  const [email, setEmail] = useState("");
  const { forgetPass } = useAuth();
  const [error, setError] = useState("");
  const onSubmithandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Eregex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!Eregex.test(email)) {
      setError("Invaid email");
      return;
    }
    else if(Eregex.test(email)){
      setError("")
    }
    setMinutes(2);
    setSeconds(59);
    if (minutes === 0 && seconds === 0) {
      forgetPass(email);
    }
  };
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (minutes === 0 && seconds === 0) return;

    const timerInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval);
            return 0;
          } else {
            setMinutes((m) => m - 1);
            return 59;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds, minutes]);

  return (
    <div className="w-full h-screen px-[30%] bg-gray-300/80 py-[8%] text-black">
      <div className="w-full flex flex-col bg-white  rounded-3xl shadow-lg shadow-black  px-[10%] py-[5%]">
        <div className="relative self-center mb-5">
          <Image
            src={logo.Icon}
            alt={logo.Iconalt}
            width={80}
            height={80}
            className="rounded-xl"
          />
        </div>
        <h1 className="capitalize text-start text-4xl font-bold mb-3">
          {constData.Name}
        </h1>
        <p className="text-lg ">{constData.text}</p>
        <form
          onSubmit={onSubmithandler}
          className="w-full mt-[5%]  flex gap-8 mb-5  flex-col "
        >
          <label className="label-class text-2xl">
            {constData.Email.label}
          </label>
          <input
            className="input-class rounded-lg"
            type={constData.Email.type}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="text-red-500 font-semibold text-sm">{error}</span>}
          {seconds > 0 || minutes > 0 ? (
            <p className="text-lg text-red-500">
              Resend in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : null}

          <button
            disabled={minutes > 0 || seconds > 0}
            type="submit"
            className="button-class text-black bg-purple-400 rounded-lg"
          >
            Request reset link
          </button>
        </form>

        <Link href="/" className="text-center text-lg text-blue-500">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassPage;
