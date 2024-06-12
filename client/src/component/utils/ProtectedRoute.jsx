import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentLoginUser = useSelector((state) => state.Authentication.UserAuthLogin);
  let location = useLocation();

  if (!currentLoginUser.data?.refreshToken || !!currentLoginUser.data?.accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
