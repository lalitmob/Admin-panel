"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Login as logo } from "@/app/constants/Auth.js";
import Link from "next/link";
import { forgetPasswordConst as constData } from "@/app/constants/Auth";

const ForgetPassPage = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="w-full h-screen px-[30%] bg-gray-300/80 py-[8%] text-black">
      <div className="w-full flex flex-col bg-white  rounded-3xl shadow-lg shadow-black  px-[10%] py-[5%]">
        <div className="relative self-center mb-5">
          <Image src={logo.Icon} alt={logo.Iconalt} width={80} height={80} className="rounded-xl" />
        </div>
        <h1 className="capitalize text-start text-4xl font-bold mb-3">
          {constData.Name}
        </h1>
        <p className="text-lg ">{constData.text}</p>
        <form
          onSubmit={() => {}}
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
          <button className="button-class text-black bg-purple-400 rounded-lg">
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
