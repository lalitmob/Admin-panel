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
  const removeUserApi = async (id) => {
    try {
      const resposne = await axios.delete(`${URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (resposne.status === 200) {
        alert("user removed succesfully");
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
  const callUserById = async (setFetchedData, param) => {
    console.log("userAuthToken", userAuthToken);
    setLoading(true);
    setError(null);
    try {
      const params =  {
        searchFromEmail : decodeURIComponent(param.userId)
      }
      const response = await axios.get(`${URL}/users`, 
        {
          params,
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

  return { userProfile, error, removeUserApi,callUserById, loading };
};
export default useUser;
