import React from "react";
import { sidebarConst as options } from "@/app/constants/sidebarconst.js";
import { useAppDispatch } from "../lib/hooks";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelected = (option) => {
    const path = option.toLowerCase();
    router.replace(`/admin/${path}`);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="bg-white flex rounded-lg gap-5 px-5 py-6 shadow-md">
        <div className="flex flex-col gap-6">
          {options.icons.map((icon, index) => (
            <div key={index} className="p-2 hover:bg-gray-200 rounded-md transition duration-200">
              <i className={`${icon} text-gray-600 text-xl`} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {options.fields.map((field, index) => (
            <div
              key={index}
              className="text-gray-800 font-medium capitalize cursor-pointer hover:text-blue-500 transition duration-200"
              onClick={() => handleSelected(field)}
            >
              {field}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg flex flex-col items-center p-4 shadow-md">
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        <h3 className="text-gray-500 text-sm">Version 1.0.1.11</h3>
      </div>
    </div>
  );
};

export default Sidebar;