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
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = (): boolean => {
    const newError: ErrorState = {};
    const emailRegex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!data.email.trim()) newError.email = "Email field is empty";
    else if (!emailRegex.test(data.email)) newError.email = "Invalid email address";

    if (!data.password.trim()) newError.password = "Password field is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs()) login(data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-300/80 px-4">
      <div className="w-full max-w-md bg-white flex flex-col items-center rounded-3xl shadow-lg px-6 py-8 md:px-10 md:py-10">
        <Image src={constdata.Icon} alt={constdata.Iconalt} width={150} height={150} className="rounded-3xl" />
        <form onSubmit={handleSubmit} className="w-full mt-8 flex flex-col gap-5">
          <h1 className="text-3xl text-center font-bold">{constdata.header}</h1>
          <div className="flex flex-col gap-2">
            <label className="label-class">{constdata.email.label}</label>
            <input
              value={data.email}
              name={constdata.email.name}
              onChange={handleInputChange}
              type={constdata.email.type}
              className="input-class"
              placeholder={constdata.email.placeholder}
            />
            {error.email && <span className="text-sm text-red-500">{error.email}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-class">{constdata.password.label}</label>
            <div className="relative w-full">
              <input
                value={data.password}
                name={constdata.password.name}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                className="input-class"
                placeholder={constdata.password.placeholder}
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute cursor-pointer top-4 right-4`}
              />
            </div>
            {error.password && <span className="text-sm text-red-500">{error.password}</span>}
          </div>
          <button type="submit" className="button-class mt-2 bg-green-400/70">LOG IN</button>
        </form>
        <Link href="/forget" className="text-gray-400 text-sm mt-5 border-b">Forgot password</Link>
      </div>
    </div>
  );
};

export default Login;
