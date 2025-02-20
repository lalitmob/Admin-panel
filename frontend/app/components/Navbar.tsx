"use client";
import React from "react";
import Image from "next/image";
import { navconst } from "@/app/constants/navcont.js";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectShowProfileModel,
  toggleProfileModel,
} from "../lib/features/Model/triggerSlice";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const select  = useAppSelector(selectShowProfileModel)
  const handleProfile = () => {
    dispatch(toggleProfileModel());
  };
  return (
    <nav className="px-5 py-3 relative flex h-[80px] text-black items-center rounded-b-xl bg-white">
      <div className="flex items-center gap-5">
        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full border border-black">
          <Image
            src={navconst.pic}
            alt="profile pic"
            fill
            className="object-cover"
          />
        </div>
        <p>{navconst.name}</p>
        <i className={`${select?"fa-solid fa-angle-down " : "fa-solid fa-angle-up " }absolute z-30 left-[10%]`} onClick={handleProfile}></i>
      </div>
    </nav>
  );
};

export default Navbar;
