import React from "react";
import { navProfileModelOptions as options } from "@/app/constants/navcont";
const UserInformationModel = () => {
  return (
    <div className="bg-white flex absolute z-20 left-20 w-[250px] rounded-xl gap-3 px-3 py-4">
      <div className="flex flex-col gap-4">
        {options.icons.map((data, index) => (
          <div key={index}>
            <i className={`${data} text-gray-500 text-lg`} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mb-5">
        {options.fields.map((data, index) => (
          <div className="text-black font-bold capitalize" key={index}>{data}</div>
        ))}
      </div>
    </div>
  );
};

export default UserInformationModel;
