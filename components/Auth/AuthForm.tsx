"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Username or Password incorrect");
    }
  };
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-black/90 rounded-2xl border border-cyan-500/40 shadow-2xl max-w-sm w-full mx-auto p-0 overflow-hidden">
      <div className="px-8 py-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20">
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <h3 className="text-2xl font-extrabold text-cyan-400 tracking-wide">
            Sign In
          </h3>
        </div>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-cyan-200 text-sm font-semibold mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800/80 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-cyan-300 transition"
              required
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-cyan-200 text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800/80 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-cyan-300 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-bold text-lg shadow-lg hover:from-cyan-300 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            Login
          </button>
          {error && (
            <div className="text-red-400 text-center font-semibold mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
