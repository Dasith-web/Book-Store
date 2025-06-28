import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBooksPage from "./pages/AdminBooksPage.jsx"; // admin books management page
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected user routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Protected admin-only routes */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<p className="p-8 text-center">404 – Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
