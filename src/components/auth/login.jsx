import logo from "../../assets/logo2.png";
import { useState } from "react";

function Modal({ isOpen, onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");

  if (!isOpen) return null;

  const show = () => {
    console.log(username);
    console.log(pass);

    if (username === "admin" && pass === "123") {
      setUsername("");
      setPassword("");
      alert("Login Successful");
      onClose();
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="bg-[#222831] text-[#EEEEEE] rounded-xl shadow-xl
                   w-[90%] max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-0 mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-25 h-25 rounded-full"
          />

          <h2 className="text-2xl font-bold text-center leading-tight mt-0">
            Login to Power GYM
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username or Email"
            className="w-full px-4 py-2 rounded bg-[#393E46]
                       text-[#EEEEEE] placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />

          <input
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-[#393E46]
                       text-[#EEEEEE] placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={show}
          className="w-full mt-6 bg-[#00ADB5] text-[#222831]
                     font-semibold py-2 rounded
                     hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Extra links */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Forgot your password?
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#00ADB5]"
        >
          ✕
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="ml-2 text-[#00ADB5] hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Modal;