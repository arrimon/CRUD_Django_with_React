import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

// Route wrapper that allows nested routes to render via <Outlet /> when authenticated
const ProtectedRoute = () => {
  const token = localStorage.getItem("admin"); // or your auth logic

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
