"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoutes from "../protected/ProtectedRoutes";
import UserInformationModel from "../components/model/UserInformationModel";
import { useState } from "react";
import {
  selectShowProfileModel,
  toggleProfileModel,
} from "../lib/features/Model/triggerSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useEffect, useRef } from "react";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showProfileModel = useAppSelector(selectShowProfileModel);
  const dispatch = useAppDispatch();
  const modelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleModle = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        dispatch(toggleProfileModel(false));
      }
    };
    document.addEventListener("mousedown", handleModle);
    return () => {
      document.removeEventListener("mousedown", handleModle);
    };
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <ProtectedRoutes>
      <div className="bg-gray-100/90 w-full min-h-screen flex flex-col">
        <section className="mb-5">
          <Navbar setSidebarOpen={setSidebarOpen} />
        </section>

        <div className="flex flex-1 px-4 md:px-10 pb-5 overflow-hidden">
          <div
            className={`w-[250px] md:w-[300px] transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            } fixed md:relative z-20  shadow-xl shadow-gray-200 md:shadow-none`}
          >
            <Sidebar />
          </div>

          {showProfileModel && (
            <div>
              <div className="w-full h-screen absolute z-10 top-0 left-0 bg-black/30" />
              <UserInformationModel modelRef={modelRef} />
            </div>
          )}

          <div className="flex-1 overflow-auto px-4 md:px-10">{children}</div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
