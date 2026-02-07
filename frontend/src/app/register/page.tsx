"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setSuccess("Registration successful! Redirecting...");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {success && (
          <div className="mb-3 text-green-700 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}
        <input className="w-full mb-3 p-2 border rounded" placeholder="name" onChange={(e)=>setUsername(e.target.value)}>
        
        </input>
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
