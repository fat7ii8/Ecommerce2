import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "./../Context/Token.Context";

export default function ProtectedRoutes({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
