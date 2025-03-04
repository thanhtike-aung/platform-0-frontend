import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) localStorage.removeItem("access-token");
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
