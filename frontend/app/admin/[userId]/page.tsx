"use client";
import DetailsPage from "@/app/components/DetailsPage";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useUser from "@/app/api/user.api";

const Details = () => {
  const param = useParams();
  console.log("param", param);
  const [fetchedData, setFetchedData] = useState([]);
  const { callUserById } = useUser();
  useEffect(() => {
    callUserById(setFetchedData, param);
  }, []);
  console.log(fetchedData);
  return (
    <div className="px-5 py-6 rounded-3xl shadow-sm shadow-black bg-white">
      <div className="flex gap-3">
        {fetchedData.map((data) => (
          <div key={data._id} className="flex w-full">
            <div className="text-black w-full flex flex-col gap-5">
              <div className="flex gap-5 items-center">
                <h1 className="text-black text-2xl font-bold">My Details</h1>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col w-full">
                  <span className="font-bold">Firstname:</span>
                  <span>{data?.userName?.firstName || "N/A"}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-bold">Lastname:</span>
                  <span>{data?.userName?.lastName || "N/A"}</span>
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col w-full">
                  <span className="font-bold">Email:</span>
                  <span>{data?.email || "N/A"}</span>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full">
                    <span className="font-bold">Phone Number:</span>
                    <span>
                      {typeof data?.phoneNumber === "object"
                        ? `${data.phoneNumber.countryCode} ${data.phoneNumber.number}`
                        : data?.phoneNumber || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col w-full">
                  <span className="font-bold">Designation:</span>
                  <span>{data?.designation || "N/A"}</span>
                </div>
              </div>

              {/* Address Section */}
              <h2 className="font-bold">Address</h2>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="font-bold">Country:</span>
                    <span>{data?.address?.country || "N/A"}</span>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <span className="font-bold">State:</span>
                    <span>{data?.address?.state || "N/A"}</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="font-bold">City:</span>
                    <span>{data?.address?.city || "N/A"}</span>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <span className="font-bold">Zip-code:</span>
                    <span>{data?.address?.zipCode || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[40%] flex flex-col items-center mx-5">
              <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full">
                <Image
                  src="/person.png"
                  alt="profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl text-black font-bold">
                {data?.userName?.firstName + " " + data?.userName?.lastName}
              </h1>
              <div className="flex gap-6 text-blue-500 my-3 cursor-pointer">
                <i className="fa-solid fa-envelope border px-3 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
                <i className="fa-solid fa-phone border px-3 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
                <i className="fa-solid fa-ellipsis-vertical border px-5 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
