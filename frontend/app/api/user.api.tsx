import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const URL = "http://localhost:5000";
const useUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userAuthToken = localStorage.getItem("token");
  const userProfile = async (setFetchedData) => {
    console.log("userAuthToken", userAuthToken);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (response.status === 200) {
        setFetchedData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }
        setError(error?.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  const allUsersDetails = async (setData, search, sort) => {
    try {
      const response = await axios.get(`${URL}/users`, {
        params: {
          searchFromEmail: "nipun.bhardwaj@gmail.com",
          // skip: 0,
          // limit: 10,
          field: sort || "email",
        },
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      
      if (response.status === 200) {
        console.log(response.data.data);
        setData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }
        setError(error?.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occured");
      }
    }
  };
  return { userProfile, allUsersDetails, error, loading };
};
export default useUser;
