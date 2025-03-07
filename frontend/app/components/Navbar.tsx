"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { navconst } from "@/app/constants/navcont.js";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { toggleProfileModel } from "../lib/features/Model/triggerSlice";
import { userInfoSlice } from "../lib/features/Model/user.slice";
import NotificationBell from "./NotificationBell";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const data = useAppSelector(userInfoSlice);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser?.id || null);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

  const handleProfile = () => {
    dispatch(toggleProfileModel(true));
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="px-5 py-3 relative flex h-[80px] text-black items-center rounded-b-xl bg-white justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="block md:hidden text-2xl focus:outline-none"
          >
            <i
              className={`fa-solid ${isSidebarOpen ? "fa-times" : "fa-bars"}`}
            />
          </button>
          <div
            onClick={handleProfile}
            className="relative w-[50px] h-[50px] overflow-hidden rounded-full border border-black"
          >
            <Image
              src={navconst.pic}
              alt="profile pic"
              fill
              className="object-cover"
            />
          </div>
          <p className="hidden md:block">{data?.userName?.firstName}</p>
        </div>
        <NotificationBell userId={userId} />
      </nav>

      {isSidebarOpen && (
        <div
          className="relative top-0 left-0 w-full h-full bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
