import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;