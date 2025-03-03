"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode"
import LoaderPage from "../components/reusable/LoaderPage";

const isTokenExpired = (token: string): boolean => {
  if (!token) return true; 

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime; 
  } catch (error) {
    return true; 
  }
};

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token"); 
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <LoaderPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
