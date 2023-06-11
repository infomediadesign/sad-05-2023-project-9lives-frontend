import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useGlobalContext } from "./Hooks/context";

const ProtectedRoute = () => {
  // let auth = {
  //   token: JSON.parse(localStorage.getItem("loggedInUser")).accessToken
  // };
  const { auth } = useGlobalContext();
  const { isExpired } = useJwt(auth.token);

  console.log("Home: ", isExpired);
  return auth.token && !isExpired ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
