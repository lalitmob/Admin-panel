'use client'
import React,{useState} from "react";
import Image from "next/image";
import {navconst} from "@/app/constants/navcont.js";
import UserInformationModel from "./model/UserInformationModel";
const Navbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  return (
    <nav className="px-5 py-3 flex h-[80px] text-black items-center rounded-b-xl bg-white">
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
      </div>
    </nav>
  );
};

export default Navbar;
