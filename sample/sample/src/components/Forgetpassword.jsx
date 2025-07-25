import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("OTP sent to your email. Please check your inbox.");
        setTimeout(() => {
          navigate("/verify-otp", { state: { token: data.token } });
        }, 1500);
      } else {
        setMsg(data.message || "Failed to send OTP.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md bg-black rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          Forgot Password
        </h2>
        <p className="text-red-200 mb-6 text-center">
          Enter your registered email to receive an OTP.
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleForgot}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-red-200 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-red-700 bg-black text-white placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          {msg && (
            <div className="text-center text-sm text-red-300">{msg}</div>
          )}
          <div className="text-center mt-2">
            <Link to="/" className="text-red-400 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}