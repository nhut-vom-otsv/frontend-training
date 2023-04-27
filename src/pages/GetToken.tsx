import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DotsLoading from "../components/Animation/DotsLoading";
import { updateLocalStorageValue } from "../utils/LocalStorage";
import { NotificationContext } from "../context/NotificationContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import DecodeEmailFromJWT from "../utils/DecodeJWT";
import { useMutation } from "@tanstack/react-query";
import { loginFacebook } from "../services/auth.api";
import { AuthContext } from "../context/AuthContext";
import { facebookConstants } from "../constants/data";

const DELAY_WHILE_LOADING = 2000;

const GetToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { notify } = useContext(NotificationContext);
  const { updateUserData } = useContext(AuthContext);
  const { redirect } = useNavigatePage();

  const { mutate, isLoading } = useMutation(loginFacebook, {
    onSuccess: (response) => {
      notify({
        content: `Login successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      updateUserData({
        email: DecodeEmailFromJWT(response?.accessToken),
        accessToken: response?.accessToken,
        refreshToken: response?.refreshToken,
      });
    },
    onError: () => {
      notify({
        content: `Wrong credentials`,
        type: "error",
        open: true,
        id: crypto.randomUUID(),
      });
    },
  });

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      mutate({ code: authCode, callbackUrl: facebookConstants.callbackUrl });
    }

    if (!isLoading) {
      const timer = setTimeout(() => {
        isLoading ? redirect("/") : redirect("/login");
      }, DELAY_WHILE_LOADING);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <DotsLoading />
    </div>
  );
};

export default GetToken;
