"use client";

import { TextField, Button, Paper } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName.trim(),
          password: password.trim(),
          expiresInMins: 30,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      login(data, data.token);
      // Redirect to dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Paper elevation={3} className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">
            Enter your credentials to access dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Forgot Password */}
          <div className="text-right mt-2 mb-4">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            className="!mt-4 !bg-indigo-600 hover:!bg-indigo-700 !py-3 !text-base !font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up */}
          <div className="text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}
