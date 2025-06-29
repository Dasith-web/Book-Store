import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ books: 0, users: 0 });

  // ───────────────────────────────────────────────
  //  Fetch simple stats (total books, total users)
  // ───────────────────────────────────────────────
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats"); // make this route in backend
        setStats(data);
      } catch {
        /* ignore errors for now */
      }
    };
    fetchStats();
  }, []);

  // test endpoint button
  const pingAdmin = async () => {
    const { data } = await api.get("/dashboard/admin/dashboard");
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-purple-600">{user?.name}</span>!
        </h1>

        <button
          onClick={logout}
          className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </header>

      {/* Stats grid */}
      <section className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Books */}
        <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow">
          <div className="rounded-lg bg-purple-100 p-3">
            <BookOpenIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Books</p>
            <p className="text-xl font-semibold">{stats.books}</p>
          </div>
        </div>

        {/* Total Users (example) */}
        <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow">
          <div className="rounded-lg bg-emerald-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.33 0 4.518.597 6.379 1.65M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Registered Users</p>
            <p className="text-xl font-semibold">{stats.users}</p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-12 flex flex-wrap gap-4">
        <Link
          to="/admin/books"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          <BookOpenIcon className="h-5 w-5" />
          Manage Books
        </Link>

        <Link
          to="/admin/books?mode=add"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Add New Book
        </Link>

        <button
          onClick={pingAdmin}
          className="rounded-lg bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
        >
          Ping Admin API
        </button>
      </section>

      {/* Anything else you like… */}
    </div>
  );
}
