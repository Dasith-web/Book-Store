import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // role mismatch
  if (roles && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  // authorised
  return <Outlet />;
}
