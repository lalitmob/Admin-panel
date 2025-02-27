"use client";
import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoaderPage from "../components/reusable/LoaderPage";
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      router.replace("/");
    }
    setIsLoading(false);
  }, [router]);
  if (isLoading) {
    return <LoaderPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
