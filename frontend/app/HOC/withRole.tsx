import useAuth from "../api/Auth.api";
import { useRouter } from "next/navigation";
import {Component, ReactNode} from "react"

const withRole =(Component :any , allowedRoles : string[]) =>{
    return function ProtectedRoute(props :any){
        const role = useAuth();
        const
    }
}
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/router";
// import { ReactNode } from "react";

// const withRole = (Component: any, allowedRoles: string[]) => {
//   return function ProtectedRoute(props: any) {
//     const { role } = useAuth();
//     const router = useRouter();

//     if (!allowedRoles.includes(role)) {
//       router.push("/unauthorized"); // Redirect if user doesn't have access
//       return null;
//     }

//     return <Component {...props} />;
//   };
// };

// export default withRole;
