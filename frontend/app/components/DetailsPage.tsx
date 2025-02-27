import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import useUser from "../api/user.api";
import { Country, State, City } from "country-state-city";
import LoaderPage from "./reusable/LoaderPage";
import { navProfilePageConst as options } from "@/app/constants/navcont";
import { useAppDispatch } from "@/app/lib/hooks";
import { userModelTrigger } from "@/app/lib/features/Model/triggerSlice";

interface UserData {
  userName?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  phoneNumber?: string;
  designation?: string;
  address?: {
    state?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
}
const DetailsPage : React.FC = () => {
  const [fetchedData, setFetchedData] = useState<UserData | null>(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);
  const { userProfile, loading } = useUser();
  useEffect(() => {
    userProfile(setFetchedData);
  }, []);
  const handleClick = (data: string) => {
    dispatch(userModelTrigger(data));
  };
  useEffect(() => {
    if (fetchedData) {
      setData({
        firstName: fetchedData.userName?.firstName || "",
        lastName: fetchedData.userName?.lastName || "",
        email: fetchedData.email || "",
        phoneNumber: fetchedData.phoneNumber || "",
        designation: fetchedData.designation || "",
        state: fetchedData.address?.state || "",
        city: fetchedData.address?.city || "",
        country: fetchedData.address?.country || "",
        zipCode: fetchedData.address?.zipCode || "",
      });
    }
  }, [fetchedData]);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(fetchedData);
  if (loading) {
    return <LoaderPage />;
  }
  return (
    <div className="px-5 py-6 rounded-3xl shadow-sm shadow-black bg-white">
      <div className="flex gap-3">
        <form className="text-black w-full flex flex-col gap-5">
          <div className="flex gap-5 items-center ">
            <h1 className="text-black text-2xl font-bold">My Details</h1>
            <i className="fa-solid fa-pen" onClick={() => setEdit(!edit)} />
          </div>
          <div className="flex w-full gap-5">
            <div className="flex relative flex-col w-full">
              <input
                className="input-class peer border shadow-sm shadow-white"
                type="text"
                name="name"
                value={data.firstName}
                onChange={onChangeHandler}
                disabled={!edit}
              />
              <label className="absolute left-3 -top-3 bg-white text-gray-600 text-sm">
                Firstname
              </label>
            </div>
            <div className="relative w-full">
              <input
                className="input-class peer border shadow-sm shadow-white"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={onChangeHandler}
                disabled={!edit}
              />
              <label className="absolute left-3 -top-3 bg-white text-gray-600 text-sm">
                Lastname
              </label>
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="flex relative flex-col w-full">
              <input
                className="input-class peer border shadow-sm shadow-white"
                type="email"
                value={data.email}
                disabled={true}
              />
              <label className="absolute left-3 -top-3 bg-white text-gray-600 text-sm">
                Email
              </label>
            </div>
            <div className="relative w-full">
              <input
                className="input-class peer border shadow-sm shadow-white"
                type="tel"
                value={data.phoneNumber}
                disabled={true}
              />
              <label className="absolute left-3 -top-3 bg-white text-gray-600 text-sm">
                Phone Number
              </label>
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="flex relative flex-col w-full">
              <input
                className="input-class peer border shadow-sm shadow-white"
                type="text"
                name="designation"
                value={data.designation}
                onChange={onChangeHandler}
                disabled={!edit}
              />
              <label className="absolute left-3 -top-3 bg-white text-gray-600 text-sm">
                Designation
              </label>
            </div>
          </div>
          <h2>Address</h2>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex flex-col relative w-1/2">
                {edit ? (
                  <select
                    name="country"
                    value={data.country}
                    onChange={onChangeHandler}
                    className="input-class py-3 px-4 bg-white border rounded-md shadow-sm"
                  >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="input-class peer border shadow-sm shadow-white"
                    type="text"
                    name="designation"
                    value={data.country}
                    disabled={!edit}
                  />
                )}
                <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm">
                  Country
                </label>
              </div>

              <div className="flex flex-col relative w-1/2">
                {edit ? (
                  <select
                    name="state"
                    value={data.state}
                    onChange={onChangeHandler}
                    className="input-class py-3 px-4 bg-white border rounded-md shadow-sm"
                    disabled={!data.country}
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(data.country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="input-class peer border shadow-sm shadow-white"
                    type="text"
                    name="designation"
                    value={data.state}
                    disabled={!edit}
                  />
                )}
                <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm">
                  State
                </label>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex relative flex-col w-1/2">
                {edit ? (
                  <select
                    name="city"
                    value={data.city}
                    onChange={onChangeHandler}
                    className="input-class py-3 px-4 bg-white border rounded-md shadow-sm"
                    disabled={!data.state}
                  >
                    <option value="">Select City</option>
                    {City.getCitiesOfState(data.country, data.state).map(
                      (city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    className="input-class peer border shadow-sm shadow-white"
                    type="text"
                    name="designation"
                    value={data.city}
                    disabled={!edit}
                  />
                )}
                <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm">
                  City
                </label>
              </div>

              <div className="flex relative flex-col w-1/2">
                <input
                  className="input-class py-3 px-4 bg-white border rounded-md shadow-sm"
                  type="text"
                  value={data.zipCode}
                  name="zipCode"
                  onChange={onChangeHandler}
                  disabled={!edit}
                />
                <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm">
                  Zip-code
                </label>
              </div>
            </div>
          </div>

          {edit && (
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          )}
        </form>
        <div className="w-[40%] flex flex-col  items-center  mx-5">
          <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full">
            <Image
              src="/person.png"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-xl text-black font-bold">
            {fetchedData?.userName?.firstName +
              " " +
              fetchedData?.userName?.lastName}
          </h1>
          <div className="flex gap-6 text-blue-500 my-3">
            <i className="fa-solid fa-envelope border px-3 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
            <i className="fa-solid fa-phone border px-3 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
            <i className="fa-solid fa-ellipsis-vertical border px-5 py-2 rounded-xl bg-gray-400/10 shadow-xl shadow-white" />
          </div>
          <div className="flex gap-3 mt-4 ml-3">
            <div className="flex flex-col gap-4">
              {options.icons.map((data, index) => (
                <div key={index}>
                  <i className={`${data} text-blue-500 text-lg`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 mb-5">
              {options.fields.map((data, index) => (
                <div key={index} className="text-black font-bold capitalize">
                  <button onClick={() => handleClick(data)}>{data}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
