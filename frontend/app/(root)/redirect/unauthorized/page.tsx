"use client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto" />
        <h1 className="text-2xl font-bold mt-4 text-red-600">Unauthorized</h1>
        <p className="text-gray-600 mt-2 mb-5">You are not authorized to access this page information.</p>
        <Link className="border px-5 py-3 rounded-sm bg-red-400" href="/admin">Go back</Link>
      </div>
    </div>
  );
}
