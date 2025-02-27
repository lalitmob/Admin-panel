"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Login as constdata } from "@/app/constants/Auth.js";
import Link from "next/link";
import useAuth from "../api/Auth.api";
interface ErrorState {
  email?: string;
  password?: string;
}
const Login = () => {
  const [error, setError] = useState<ErrorState>({});
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const errorhandler = () => {
    const newError: ErrorState = {};
    const Eregex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!data.email.trim()) {
      newError.email = "Email field is empty";
    } else if (!Eregex.test(data.email)) {
      newError.email = "Invalid email address";
    }
    if (!data.password.trim()) {
      newError.password = "Password field is required";
    }
      setError(newError);
      return Object.keys(newError).length === 0
    
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[name as keyof ErrorState];
      return updatedErrors;    
    });
  };
  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorValidation=errorhandler();
    if (errorValidation) {
      login(data);
    }
  };

  return (
    <div className="w-full h-screen px-[30%] bg-gray-300/80 py-[4%]  ">
      <div className="w-full flex flex-col bg-white items-center rounded-3xl shadow-lg shadow-black  px-[10%] py-[10%]">
        <div className="relative">
          <Image
            src={constdata.Icon}
            alt={constdata.Iconalt}
            width={150}
            height={150}
            className="rounded-3xl"
          />
        </div>

        <form
          onSubmit={handleformSubmit}
          className="w-full mt-[18%]  flex gap-5  flex-col "
        >
          <h1 className="text-3xl text-center font-bold">{constdata.header}</h1>
          <div className="flex flex-col gap-4">
            <label className="label-class">{constdata.email.label}</label>

            <input
              value={data.email}
              name={constdata.email.name}
              required
              onChange={onChangehandler}
              type={constdata.email.type}
              className="input-class"
              placeholder={constdata.email.placeholder}
            />
          </div>
          {error?.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
          <div className="flex flex-col gap-4">
            <label className="label-class">{constdata.password.label}</label>
            <div className="relative w-full">
              <input
                value={data.password}
                name={constdata.password.name}
                required
                onChange={onChangehandler}
                type={
                  showPassword
                    ? constdata.password.type.hide
                    : constdata.password.type.show
                }
                className="input-class"
                placeholder={constdata.password.placeholder}
              />
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(false)}
                  className="fa-solid fa-eye absolute hover:cursor-pointer top-4 right-7"
                />
              ) : (
                <i
                  onClick={() => setShowPassword(true)}
                  className="fa-solid fa-eye-slash absolute hover:cursor-pointer top-4 right-7"
                />
              )}
            </div>
            {error?.password && (
              <span className="text-sm text-red-500">{error.password}</span>
            )}
          </div>
          <button type="submit" className="button-class mt-1 bg-green-400/70">
            LOG IN
          </button>
        </form>
        <Link href="/forget" className="text-gray-400 text-sm mt-5 border-b">
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default Login;
