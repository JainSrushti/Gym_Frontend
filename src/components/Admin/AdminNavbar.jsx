import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react";

const pageTitles = {
  "/adminpage/dashboard":   "Dashboard",
  "/adminpage/trainers":    "Trainers",
  "/adminpage/programs":    "Programs",
  "/adminpage/enquiries":   "Enquiries",
  "/adminpage/timetable":   "Timetable",
  "/adminpage/gallery":     "Gallery",
  "/adminpage/memberships": "Memberships",
  "/adminpage/settings":    "Settings",
  "/adminpage/joinrequests": "Join Requests",
  "/adminpage/offers":       "Offers",
  "/adminpage/offers":       "Offers",
};

function AdminNavbar({ setIsOpen }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const title = pageTitles[location.pathname] || "Admin";

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsOpen((p) => !p)} className="lg:hidden text-gray-400 hover:text-white transition">
          <Menu size={22} />
        </button>
        <div>
          <h2 className="text-white font-semibold text-lg leading-none">{title}</h2>
          <p className="text-gray-500 text-xs mt-0.5">Welcome back, Admin</p>
        </div>
      </div>

      {/* Right — profile only */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((p) => !p)}
          className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 hover:border-red-600/50 transition"
        >
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-white text-sm font-medium hidden sm:block">Admin</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-[#111] border border-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="text-white text-sm font-semibold">Admin User</p>
              <p className="text-gray-500 text-xs">admin@powergym.com</p>
            </div>
            <button
              onClick={() => { window.location.href = "/adminpage/settings"; setDropdownOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-gray-800 hover:text-white transition text-sm"
            >
              <Settings size={15} /> Settings
            </button>
            <button
              onClick={() => { localStorage.removeItem("adminAuth"); window.location.href = "/admin"; }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-600/10 transition text-sm"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminNavbar;
