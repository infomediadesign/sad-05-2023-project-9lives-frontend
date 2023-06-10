import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";

const ProtectedRoute = () => {
  let auth = {
    token: JSON.parse(localStorage.getItem("loggedInUser")).accessToken
  };
  const { decodedToken, isExpired } = useJwt(auth.token);
  // const isIdMatch = decodedToken.id === auth.token._id;
  // debugger
  console.log("Home: ", isExpired);
  return auth.token && !isExpired ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
