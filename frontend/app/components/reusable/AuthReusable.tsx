"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthFormProps {
  icon: string;
  iconAlt: string;
  title: string;
  fields: { label: string; type: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  link?: { href: string; text: string };
  children?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ icon, iconAlt, title, fields, buttonText, onSubmit, link, children }) => {
  return (
    <div className="w-full h-screen px-[30%] bg-gray-300/80 py-[4%] text-black">
      <div className="w-full flex flex-col bg-white rounded-3xl shadow-lg shadow-black px-[10%] py-[5%]">
        <div className="relative self-center mb-5">
          <Image src={icon} alt={iconAlt} width={80} height={80} className="rounded-xl" />
        </div>
        <h1 className="capitalize text-start text-4xl font-bold mb-3">{title}</h1>
        {children}
        <form onSubmit={onSubmit} className="w-full mt-[5%] flex gap-8 mb-5 flex-col">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="label-class text-2xl">{field.label}</label>
              <input className="input-class rounded-lg" type={field.type} name={field.name} value={field.value} onChange={field.onChange} />
            </div>
          ))}
          <button type="submit" className="button-class text-black bg-purple-400 rounded-lg">{buttonText}</button>
        </form>
        {link && <Link href={link.href} className="text-center text-lg text-blue-500">{link.text}</Link>}
      </div>
    </div>
  );
};

export default AuthForm;
