"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <Link href="/" className="font-bold">Task Manager</Link>

      <div className="space-x-4">
        {!isAuthenticated && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
