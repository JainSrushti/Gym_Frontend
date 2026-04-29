import logo from "../../assets/logo2.png";
import { useState } from "react";

function Modal({ isOpen, onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Login Successful");
        setEmail("");
        setPassword("");
        onClose();
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[#222831] text-[#EEEEEE] rounded-xl shadow-xl w-[90%] max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-20 h-20 rounded-full" />
          <h2 className="text-2xl font-bold">Login to Power GYM</h2>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full p-2 rounded bg-[#393E46]"
          />

          <input
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-[#393E46]"
          />
        </div>

        {/* Login */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-[#00ADB5] py-2 rounded"
        >
          Login
        </button>

        {/* Switch */}
        <p className="text-center mt-4 text-sm">
          Don't have account?{" "}
          <button onClick={onSwitchToRegister} className="text-[#00ADB5]">
            Sign up
          </button>
        </p>

        <button onClick={onClose} className="absolute top-2 right-3">
          ✕
        </button>
      </div>
    </div>
  );
}

export default Modal;