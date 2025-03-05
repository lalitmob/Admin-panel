"use client";
import { AlertCircle } from "lucide-react";

export default function TokenExpiredPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto" />
        <h1 className="text-2xl font-bold mt-4 text-red-600">Link has expired</h1>
        <p className="text-gray-600 mt-2">Please request a new link and try again</p>
        
      </div>
    </div>
  );
}
