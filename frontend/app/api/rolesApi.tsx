import { useState } from "react";
import axios, { AxiosError } from "axios";
const URL = "http://localhost:5000";
const useRoles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userAuthToken = localStorage.getItem("token");
  const fetchTypes = async (type: string, setData: (data: unknown) => void) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/roles/fetch/${type}`, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
    
        setError(error?.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  const createRole = async (payload: object) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${URL}/roles/create`,
         payload ,
        {
          headers: {
            Authorization: `Bearer ${userAuthToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("role added");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
       
        setError(error?.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  return { fetchTypes, createRole, loading, error };
};
export default useRoles;
