import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo2.png";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("https://gym-backend-8aij.onrender.com/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    localStorage.setItem("adminAuth", "true");
    localStorage.setItem("adminEmail", data.email || form.email);
    navigate("/adminpage/dashboard");

  } catch {
    setError("Invalid email or password.");
  }
};

  return (
    <div className="min-h-screen bg-black flex">

      {/* LEFT — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/3 border-r border-gray-900 p-10 bg-gradient-to-b from-black to-[#0a0a0a]">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="PowerGYM" className="h-20 w-20" />
          <span className="text-white text-2xl font-bold">Power<span className="text-red-500">GYM</span></span>
        </div>

        <div className="space-y-6">
          <div className="w-12 h-1 bg-red-600 rounded-full" />
          <h2 className="text-4xl font-bold text-white leading-tight">
            Manage your<br />gym with ease.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Access trainers, programs, memberships, enquiries and more — all from one powerful dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center">
            <span className="text-red-500 text-xs font-bold">A</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin Access Only</p>
            <p className="text-gray-600 text-xs">Authorized personnel only</p>
          </div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm mx-auto">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src={logo} alt="PowerGYM" className="h-12 w-12" />
            <span className="text-white text-xl font-bold">Power<span className="text-red-500">GYM</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-white text-2xl font-bold">Sign in</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="email" required placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-gray-800 text-white text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-red-500 placeholder-gray-700 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type={showPass ? "text" : "password"} required placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-gray-800 text-white text-sm rounded-xl pl-10 pr-11 py-3.5 focus:outline-none focus:border-red-500 placeholder-gray-700 transition"
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition">
                  {showPass ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg px-4 py-2.5">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition text-sm mt-2 shadow-lg shadow-red-600/20">
              Sign In to Dashboard
            </button>

          </form>

          <p className="text-gray-700 text-xs text-center mt-8">
            © {new Date().getFullYear()} PowerGYM. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  );
}

export default AdminLogin;
