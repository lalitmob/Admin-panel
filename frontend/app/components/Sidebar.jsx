import React from "react";
import { sidebarConst as options } from "@/app/constants/sidebarconst.js";
import { useAppDispatch } from "../lib/hooks";
import {
  selectSidebarOptions,
  sidebaroptionsTrigger,
} from "../lib/features/Model/triggerSlice";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSelected = (option) => {
    const path = option.toLowerCase();
    router.replace(`/admin/${path}`);
  };
  return (
    <div className="h-full w-full flex flex-col text-black justify-between  ">
      <div className="bg-white flex  rounded-xl gap-5 px-3 py-4">
        <div className="flex flex-col gap-6 ">
          {options.icons.map((data, index) => (
            <div key={index}>
              <i className={`${data} text-gray-500 text-lg`} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 mb-5">
          {options.fields.map((data, index) => (
            <div
              className="text-black font-bold capitalize"
              onClick={() => handleSelected(data)}
              key={index}
            >
              {data}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl flex flex-col items-center p-3">
        <h1>Admin DashBoard</h1>
        <h3>Version 1.0.1.11</h3>
      </div>
    </div>
  );
};

export default Sidebar;
