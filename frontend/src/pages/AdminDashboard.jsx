import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const fetchMessage = async () => {
    const res = await api.get("/dashboard/admin/dashboard");
    alert(res.data.message);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        Welcome, {user?.name}! (admin dashboard)
      </h1>
      <button onClick={fetchMessage} className="bg-purple-600 text-white px-4 py-2 rounded">
        Ping Admin API
      </button>
      <button onClick={logout} className="bg-gray-700 text-white px-4 py-2 rounded w-max">
        Logout
      </button>
    </div>
  );
}
