"use client";
import React from "react";
import UserInformationModel from "../components/model/UserInformationModel";
import { useAppSelector } from "../lib/hooks";
import { selectShowProfileModel } from "../lib/features/Model/triggerSlice";
import UserDetails from "../components/UserDetails";
const Page = () => {
  const showProfileModel = useAppSelector(selectShowProfileModel);
  return (
    <div className="w-full h-full">
      {showProfileModel && (
        <div>
          <div className="w-full h-screen absolute z-10 top-0 left-0  bg-black/30" />
          <UserInformationModel />
        </div>
      )}
      <div>
        <UserDetails/>
      </div>
    </div>
  );
};

export default Page;
