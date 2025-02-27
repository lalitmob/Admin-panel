"use client";
import React, { useState } from "react";
import { resetPasswordconst as constData } from "@/app/constants/Auth";
import Image from "next/image";
import { Login as logo } from "@/app/constants/Auth.js";
import useAuth from "@/app/api/Auth.api";
import { useSearchParams } from "next/navigation";
const ResetPassword = () => {
  const { resetPass } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    resetPass(password, token);
  };
  return (
    <div className="className='w-full h-screen px-[30%] bg-gray-300/80 py-[8%] text-black'">
      <div className="w-full flex flex-col bg-white  rounded-3xl shadow-lg shadow-black text-black  px-[10%] py-[8%]">
        <div className="relative self-center mb-10">
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
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[5%]  flex gap-5 mb-5  flex-col "
        >
          <label className="label-class text-xl">
            {constData.Password.label}
          </label>
          <input
            className="input-class rounded-lg"
            type={constData.Password.type.hide}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label-class text-xl">
            {constData.ConfirmPassword.label}
          </label>
          <input
            className="input-class rounded-lg"
            type={constData.ConfirmPassword.type.hide}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <span className="text-red-500 font-semibold text-sm">{error}</span>
          )}
          <button
            type="submit"
            className="button-class text-black bg-purple-400 rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
