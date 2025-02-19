"use client";
import React, { useState } from "react";
import UserInformationModel from "../components/model/UserInformationModel";
const Page = () => {
  const [showProfileModel, setShowProfileModel] = useState<boolean>(false);
  return (
    <div className="w-full h-full">
      {showProfileModel && (
        <div>
          <div className="w-full h-screen absolute z-10 top-0 left-0  bg-black/30" />
          <UserInformationModel />
        </div>
      )}
   
    </div>
  );
};

export default Page;
