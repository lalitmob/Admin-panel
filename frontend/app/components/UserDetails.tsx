import React from "react";
import { userDetailsUiConst as constData } from "@/app/constants/userDetails.js";

const UserDetails = () => {
  return (
    <div className=" px-5 py-6 rounded-3xl shadow-sm shadow-black bg-white">
      <form className="text-black">
        <h1 className="text-2xl font-bold mb-3">My Details</h1>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(constData).map(([key, field]) => (
            <div key={key} className="flex flex-col">
              <label className="label-class text-[18px]">{field.label}</label>
              {field.input === "select" ? (
                <select className="py-4 px-3 bg-slate-500/5 rounded-lg border border-black">
                  {field?.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input type={field.input} className="input-class bg-slate-500/5" />
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
