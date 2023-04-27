import jwtDecode from "jwt-decode";
import React from "react";

export type JWTDecodeType = {
  email?: string;
  iat?: any;
  exp?: any;
};

const DecodeEmailFromJWT = (token?: string) => {
  if (!token) return undefined;

  const decodedJWT: JWTDecodeType = jwtDecode(token);
  const email = decodedJWT.email;
  return email;
};

export default DecodeEmailFromJWT;
