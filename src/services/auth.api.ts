import axios from "axios";
import jwtDecode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import {
  getLocalStorageValue,
  updateLocalStorageValue,
} from "../utils/LocalStorage";
import DecodeEmailFromJWT from "../utils/DecodeJWT";

export type UserDataType = {
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};

type LoginType = {
  email: string;
  password: string;
};

type FacebookLoginType = {
  code: string;
  callbackUrl: string;
};

const authApi = axios.create({
  baseURL: "http://localhost:3000/",
});

const getUserData = (): UserDataType | null => {
  const user = getLocalStorageValue({ key: "key" });
  if (!user) {
    return null;
  }

  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    email: user.email,
  };
};

const refreshToken = async () => {
  try {
    const { data } = await authApi.post("/auth/refresh-token", {
      email: getUserData()?.email,
      refreshToken: getUserData()?.refreshToken,
    });
    updateLocalStorageValue({
      key: "key",
      value: { ...data, email: getUserData()?.email },
    });

    return data.accessToken;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("key");
    }

    throw error;
  }
};

authApi.interceptors.request.use(
  (config) => {
    if (config.url === "/auth/login" || config.url === "/auth/facebook")
      return config;

    const user = getUserData();
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url === "/auth/login" ||
      originalRequest.url === "/auth/facebook"
    )
      return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshToken();
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return authApi(originalRequest);
        }
      } catch (error) {
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

const loginFacebook = (loginData: FacebookLoginType) => {
  return authApi.post("/auth/facebook", loginData).then((response) => {
    updateLocalStorageValue({
      key: "key",
      value: {
        email: DecodeEmailFromJWT(response.data?.accessToken),
        accessToken: response.data?.accessToken,
        refreshToken: response.data?.refreshToken,
      },
    });
    console.log(DecodeEmailFromJWT(response.data?.accessToken));
    return response.data;
  });
};

const login = (loginData: LoginType) => {
  return authApi.post("/auth/login", loginData).then((response) => {
    updateLocalStorageValue({
      key: "key",
      value: {
        email: loginData.email,
        accessToken: response.data?.accessToken,
        refreshToken: response.data?.refreshToken,
      },
    });

    return response.data;
  });
};

const getUserInfo = ({ email }: { email: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () =>
      authApi.get(`users/${email}`).then((response) => {
        return response.data;
      }),
  });

  return { userInfo: data, error, isLoading };
};

export { authApi, login, getUserInfo, loginFacebook };
