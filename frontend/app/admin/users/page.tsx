"use client";
import React, { useState, useEffect, useMemo } from "react";
import ColumnGroupingTable from "@/app/components/Users";
import UserDetails from "@/app/components/UserSignup";
import CallModel from "@/app/components/model/Callcomponenst.model";

interface CallModelProps {
  isActive: boolean;
  image: string;
  text: string;
  onClick: () => void;
}

const Page: React.FC = () => {
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [addNewUser, setAddNewUser] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const sortOptions = useMemo(
    () => [
      { value: "name", label: "Name" },
      { value: "phoneNumber", label: "Phone" },
      { value: "email", label: "Email" },
      { value: "designation", label: "Designation" },
      { value: "createdAt", label: "Joining Date" },
      { value: "roles", label: "Role" },
    ],
    []
  );

  const renderCallModel = ({ isActive, image, text, onClick } : CallModelProps) => (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 text-sm md:text-base
        ${isActive ? "bg-blue-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      <CallModel
        imageStyle={isActive ? "filter invert brightness-0" : ""}
        styles=""
        image={image}
        text={text}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-xl w-full">
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-6">
        {renderCallModel({ isActive: addNewUser, image: "/CallIcons/user.png", text: "Add User", onClick: () => setAddNewUser(true) })}
        {renderCallModel({ isActive: !addNewUser, image: "/CallIcons/users.png", text: "All Users", onClick: () => setAddNewUser(false) })}
      </div>

      {addNewUser ? (
        <UserDetails />
      ) : (
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-black shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <label className="text-lg font-semibold">Sort By:</label>
              <select
                className="border border-gray-300 bg-white text-gray-700 rounded-lg px-3 md:px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                 value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map(({ value, label }) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
              <label className="text-lg font-semibold">Search:</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 bg-white text-gray-700 rounded-lg px-3 md:px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                placeholder="Enter Email"
              />
            </div>
          </div>

          <ColumnGroupingTable search={debouncedSearch} sort={sort} />
        </div>
      )}
    </div>
  );
};

export default Page;
