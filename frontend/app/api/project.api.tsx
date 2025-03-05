import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const URL = "http://localhost:5000";
const useProject = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userAuthToken = localStorage.getItem("token");
  
  const projectCreate = async (payload: object) => {
    setLoading(true);
    setError(null);
    console.log("payload", payload);
    try {
      const response = await axios.post(`${URL}/projects`, payload, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (response.status === 201) {
        alert("project created");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }
        setError(error?.response?.data?.message || "Project creation failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const requestQuot = async (projectToken: string, setData : (data : unknown)=>void) => {
    console.log("project token", projectToken);
    try {
      const response = await axios.get(
        `${URL}/projects/projectInfo/${projectToken}`
      );
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message || "Project creation failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  const confirmProjectsApi = async (data : object) => {
    try {
      console.log(data)
      const response = await axios.patch(`${URL}/projects/confirmProject`, data);
      if (response.status === 200) {
        alert("Submitted successfully");
        router.replace("/redirect/Thankyou")
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if(error.status === 401){
         router.push("redirect/Expired") 
        }
        setError(error?.response?.data?.message || "Project creation failed");
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  return { projectCreate, requestQuot,confirmProjectsApi, loading, error };
};
export default useProject;
