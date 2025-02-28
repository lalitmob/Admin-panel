"use client";
import React from "react";
import ColumnGroupingTable from "@/app/components/Users";
import { useState, useEffect } from "react";
import UserDetails from "@/app/components/UserSignup";
const Page = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const options = [
    { value: "name", label: "Name" },
    { value: "phoneNumber", label: "Phone" },
    { value: "email", label: "Email" },
    { value: "designation", label: "Designation" },
    { value: "createdAt", label: "Joining Date" },
    { value: "roles", label: "Role" },
  ];
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const [addNewUser, setAddNewUser] = useState(true);
  return (
    <>
      {addNewUser ? (
        <div>
          <div className="mb-5 gap-5 flex text-black justify-between">
            <div className="flex gap-3 items-center">
              <label className="text-lg font-bold">Sort By:</label>
              <select
                className="text-black shadow-sm shadow-black  bg-white w-[200px] rounded-xl input-class px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {options.map((data, index) => (
                  <option value={data.value} key={index}>
                    {data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-5 items-center">
              <label className="text-lg font-bold">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-8 py-2 shadow-sm text-black shadow-black rounded-xl input-class bg-white"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <ColumnGroupingTable search={debouncedSearch} sort={sort} />
          <div className="w-full flex justify-end mt-5">
            <button
              onClick={() => setAddNewUser(false)}
              className="text-white font-medium bg-blue-400 px-10 py-2 rounded-lg shadow-sm shadow-black"
            >
              NEW
            </button>
          </div>
        </div>
      ) : (
        <>
          <UserDetails />
          <div className="w-full flex justify-end mt-5">
            <button
              onClick={() => setAddNewUser(true)}
              className="text-white font-medium bg-blue-400 px-10 py-2 rounded-lg shadow-sm shadow-black"
            >
              BACK
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
