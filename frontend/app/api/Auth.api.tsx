import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/hooks";
import { userToken, userInformation } from "../lib/features/Model/user.slice";
const URL = "http://localhost:5000";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userAuthToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const register = async (payload: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${URL}/users/register`, payload, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (response.status === 201) {
        alert("User successfully added");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${URL}/users/login`, data);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        const user = JSON.stringify(response.data.data.user);
        localStorage.setItem("user", user);
        router.push("/admin");
        dispatch(userToken(response.data.token.token));
        dispatch(userInformation(user));
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.status === 404) {
          alert("Invalid credentials. Please try again.");
        }
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const forgetPass = async (email: string) => {
    try {
      console.log(email);
      const Mailresponse = await axios.post(`${URL}/users/sendResetMail`, {
        email,
      });
      if (Mailresponse.status === 200) {
        alert("mail has been sent successfull");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert("Email not found");
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const resetPass = async (password: string, token: string) => {
    try {
      const Mailresponse = await axios.patch(
        `${URL}/users/resetPassword`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      );
      if (Mailresponse.status === 200) {
        alert("Password Changed successfully");
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    console.log("userToken", userToken);
    try {
      const response = await axios.get(`${URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, login, forgetPass, logout, resetPass, loading, error };
};

export default useAuth;
