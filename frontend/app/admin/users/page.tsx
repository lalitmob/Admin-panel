"use client";
import React from "react";
import ColumnGroupingTable from "@/app/components/Users";
import { useState } from "react";
const Page = () => {
  const options = [
    { value: "name", label: "Name" },
    { value: "phoneNumber", label: "Phone" },
    { value: "email", label: "Email", minWidth: 170 },
    { value: "designation", label: "Designation" },
    { value: "createdAt", label: "Joining Date" },
    { value: "roles", label: "Role" },
  ];
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="mb-5 gap-60 flex justify-end">
        <select
          className="text-black border bg-white w-[200px] rounded-xl input-class px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {options.map((data, index) => (
            <option value={data.value} key={index}>
              {data.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-8 py-2 shadow-sm text-black shadow-black rounded-xl input-class bg-white"
          placeholder="Enter Email"
        />
      </div>
      <ColumnGroupingTable search={search} sort = {sort} />
    </>
  );
};

export default Page;
