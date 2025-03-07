"use client";
import React from "react";
import { useAppSelector } from "../lib/hooks";
import {
  selectUserOption,
} from "../lib/features/Model/triggerSlice";
import MyCalender from "../components/MyCalender";
import Vacation from "../components/Vacation";
import CorporateCv from "../components/CorporateCv";
import PerformanceReview from "../components/PerformanceReview";
import DetailsPage from "../components/DetailsPage";
import { persistor } from "@/app/lib/store";
console.log("Persistor state:", persistor.getState());
const Admin = () => {
  const selectOption = useAppSelector(selectUserOption);
  return (
    <div className="w-full h-full">
     
     <div>
        {selectOption === "My Deatils" && <DetailsPage />}
        {selectOption === "My calender" && <MyCalender />}
        {selectOption === "vacation" && <Vacation />}
        {selectOption === "corporate cv" && <CorporateCv />}
        {selectOption === "permormance review" && <PerformanceReview />}
      </div>
    </div>
  );
};

export default Admin;
