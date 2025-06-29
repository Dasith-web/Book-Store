import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";

import ShopHome from "./pages/ShopHome.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBooksPage from "./pages/AdminBooksPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ───────────────────── Default = /login ───────────────────── */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* ───────────────────── Public auth pages ───────────────────── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ─────────────────────── Public store  ─────────────────────── */}
            {/* Move storefront to /shop so we can guard / with redirect above */}
            <Route path="/shop" element={<ShopHome />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* ─────────────────────── User‑only pages ───────────────────── */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
            </Route>

            {/* ────────────────────── Admin‑only pages ───────────────────── */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/books" element={<AdminBooksPage />} />
            </Route>

            {/* ────────────────────────── Fallback 404 ───────────────────── */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
