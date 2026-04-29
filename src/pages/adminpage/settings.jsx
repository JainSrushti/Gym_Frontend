import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const inp =
  "w-full bg-black border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-red-500 placeholder-gray-600";

function SettingsAdmin() {
  const [pwd, setPwd] = useState({
    current: "",
    newPwd: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPwd: false,
    confirm: false,
  });

  const [msg, setMsg] = useState("");

  function toggleShow(field) {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  // ✅ UPDATED SUBMIT (CALL BACKEND)
  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!pwd.current || !pwd.newPwd || !pwd.confirm) {
      setMsg("All fields are required.");
      return;
    }

    if (pwd.newPwd.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    if (pwd.newPwd !== pwd.confirm) {
      setMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("adminEmail"), // ✅ from login
          current: pwd.current,   // ✅ matches backend
          newPwd: pwd.newPwd,     // ✅ matches backend
        }),
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      setMsg("Password updated successfully.");
      setPwd({ current: "", newPwd: "", confirm: "" });

      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(err.message || "Error updating password.");
    }
  }

  const fields = [
    { label: "Current Password", field: "current" },
    { label: "New Password", field: "newPwd" },
    { label: "Confirm Password", field: "confirm" },
  ];

  return (
    <div className="max-w-md space-y-6 text-white">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-gray-500 text-sm">Manage your admin account</p>
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-white font-bold text-base border-b border-gray-800 pb-3 mb-4">
          🔒 Change Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ label, field }) => (
            <div key={field}>
              <label className="block text-gray-400 text-xs font-medium mb-1">
                {label}
              </label>

              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                {/* ✅ FIXED SHOW/HIDE */}
                <input
                  type={show[field] ? "text" : "password"}
                  className={`${inp} pl-8 pr-10`}
                  value={pwd[field]}
                  onChange={(e) =>
                    setPwd({ ...pwd, [field]: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                />

                <button
                  type="button"
                  onClick={() => toggleShow(field)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {show[field] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          ))}

          {/* MESSAGE */}
          {msg && (
            <p
              className={`text-xs ${
                msg.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {msg}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsAdmin;