import React, { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../Context/Token.Context";

export default function GardRouteForLogin({ children }) {
  const { token } = useContext(TokenContext);

  if (token) {
    return <Navigate to={"home"}></Navigate>;
  } else {
    return children;
  }
}
