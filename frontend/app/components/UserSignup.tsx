"use client";
import React, { ChangeEvent, FormEvent, useState, KeyboardEvent } from "react";
import { userDetailsUiConst as constData } from "@/app/constants/userDetails.js";
import { Country, State, City } from "country-state-city";
import useAuth from "../api/Auth.api";

const UserDetails = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roles: [] as string[],
    designation: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const [error, setError] = useState< {[key : string] : [string]}>({});
  const { register } = useAuth();
  const handleError = () => {
    const newError: { [key: string]: string } = {}; 
    if (!data.firstName.trim()) {
      newError.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      newError.lastName = "Last name is required";
    }

    const emailRegex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!data.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newError.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{6,15}$/;
    if (!data.phoneNumber.trim()) {
      newError.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(data.phoneNumber)) {
      newError.phoneNumber = "Invalid phone number format";
    }

    if (data.roles.length === 0) {
      newError.roles = "At least one role must be selected";
    }

    if (!data.designation.trim()) {
      newError.designation = "Designation is required";
    }

    if (!data.state.trim()) {
      newError.state = "State is required";
    }

    if (!data.city.trim()) {
      newError.city = "City is required";
    }

    if (!data.country.trim()) {
      newError.country = "Country is required";
    }

    const zipCodeRegex = /^[0-9]{5,6}$/;
    if (!data.zipCode.trim()) {
      newError.zipCode = "Zip code is required";
    } else if (!zipCodeRegex.test(data.zipCode)) {
      newError.zipCode = "Invalid zip code format";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const [roleInput, setRoleInput] = useState("");

  const onSubmithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: `+${data.country}${data.phoneNumber}`,
      designation: data.designation,
      address: {
        state: data.state,
        city: data.city,
        country: data.country,
        zipCode: String(data.zipCode),
      },
      roles: data.roles,
    };
    handleError();
    const errorValidation = handleError();
    if (errorValidation) {
      register(payload);
    }
  };

  const onChangehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => {
      if (name === "country") {
        return { ...prev, country: value, state: "", city: "" };
      }
      if (name === "state") {
        return { ...prev, state: value, city: "" };
      }
      return { ...prev, [name]: value };
    });
    setError((prev) => {
      const newError = { ...prev };
      delete newError[name];
      return newError;
    });
  };

  const onRoleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoleInput(e.target.value);
  };

  const onRoleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (roleInput.trim() && !data.roles.includes(roleInput.trim())) {
        setData((prev) => ({
          ...prev,
          roles: [...prev.roles, roleInput.trim()],
        }));
      }
      setRoleInput("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    setData((prev) => ({
      ...prev,
      roles: prev.roles.filter((role) => role !== roleToRemove),
    }));
  };

  return (
    <div className="px-5 py-6 rounded-3xl shadow-sm shadow-black bg-white">
      <form onSubmit={onSubmithandler} className="text-black">
        <h1 className="text-2xl font-semibold mb-5">New employee form</h1>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(constData).map(([key, field]) => (
            <div key={key} className="flex flex-col relative">
              {field.label === "Role" ? (
                <div>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={onRoleInputChange}
                    onKeyDown={onRoleKeyDown}
                    placeholder="Type role and press Enter"
                    className="input-class peer border shadow-sm shadow-white"
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {data.roles.map((role, index) => (
                      <span
                        key={index}
                        onClick={() => removeRole(role)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700"
                      >
                        {role} ✖
                      </span>
                    ))}
                  </div>
                 
                </div>
              ) : field.input === "select" ? null : (
                <input
                  onChange={onChangehandler}
                  value={data[field.value as keyof typeof data] || ""}
                  name={field.value}
                  type={field.input}
                  className="input-class border shadow-sm shadow-white"
                />
              )}
              {error?.[field.value as keyof typeof error] && (
                <div className="text-red-500 text-sm font-semibold flex items-center gap-1">
                  <span className=" text-sm">
                    <i className="fa-solid fa-circle-exclamation" />
                  </span>
                  {error[field.value as keyof typeof error]}
                </div>
              )}
              <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
                {field.label}
              </label>
            </div>
          ))}
          <div className="flex flex-col relative w-full">
            <div className="relative flex items-center">
              <select
                name="country"
                value={data.country}
                onChange={onChangehandler}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-20 rounded-xl  bg-transparent  text-sm px-2 h-[35px] outline-none cursor-pointer"
              >
                <option value="">+91</option>
                {Country.getAllCountries().map((country, idx) => (
                  <option key={idx} value={country.phonecode}>
                    +{country.phonecode}
                  </option>
                ))}
              </select>
              <input
                onChange={onChangehandler}
                value={data.phoneNumber}
                name="phoneNumber"
                type="number"
                className="w-full peer input-class pl-[100px] pr-3  border "
                placeholder="Enter phone number"
              />
            </div>
              {error?.phoneNumber && (
                <div className="text-red-500 text-sm font-semibold  items-center gap-1">
                  <span className=" text-sm">
                    <i className="fa-solid fa-circle-exclamation" />
                  </span>
                  {error.phoneNumber}
                </div>
              )}
            
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Phone
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col relative">
            <select
              name="country"
              value={data.country}
              onChange={onChangehandler}
              className="input-class py-4 bg-white border"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Country
            </label>
            
          </div>

          <div className="flex flex-col relative">
            <select
              name="state"
              value={data.state}
              onChange={onChangehandler}
              className="input-class  bg-white border shadow-sm shadow-white py-4"
              disabled={!data.country}
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(data.country).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              state
            </label>
          </div>

          <div className="flex relative flex-col">
            <select
              name="city"
              value={data.city}
              onChange={onChangehandler}
              className="input-class bg-white border shadow-sm shadow-white py-4 "
              disabled={!data.state}
            >
              <option value="">Select City</option>
              {City.getCitiesOfState(data.country, data.state).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              City
            </label>
          </div>
          <div className="flex relative flex-col">
            <input
              className="input-class border shadow-sm shadow-white"
              type="text"
              value={data.zipCode}
              name="zipCode"
              onChange={onChangehandler}
            />
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Zip-code
            </label>
          </div>
          <button
            type="submit"
            className="text-black button-class bg-green-300 w-[150px] mt-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
