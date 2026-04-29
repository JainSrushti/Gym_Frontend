import React from "react";
import logo from "../../assets/logo2.png";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Dumbbell, ClipboardList, MessageSquare,
  CalendarDays, Image, Users, Settings, LogOut, X, UserPlus, Tag,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "/adminpage/dashboard" },
  { icon: Dumbbell,        label: "Trainers",     path: "/adminpage/trainers",    countKey: "trainerApps" },
  { icon: ClipboardList,   label: "Programs",     path: "/adminpage/programs" },
  { icon: MessageSquare,   label: "Enquiries",    path: "/adminpage/enquiries",   countKey: "enquiries" },
  { icon: CalendarDays,    label: "Timetable",    path: "/adminpage/timetable" },
  { icon: Users,           label: "Memberships",  path: "/adminpage/memberships" },
  { icon: UserPlus,        label: "Join Requests",path: "/adminpage/joinrequests", countKey: "joinRequests" },
  { icon: Tag,             label: "Offers",       path: "/adminpage/offers" },
  { icon: Settings,        label: "Settings",     path: "/adminpage/settings" },
];

function AdminSidebar({ isOpen, setIsOpen, counts = {} }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-[#0a0a0a] text-white flex flex-col border-r border-red-600/40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-800">
          <Link to="/adminpage/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="PowerGYM" className="h-10 w-10" />
            <h1 className="text-xl font-bold tracking-wide">
              Power<span className="text-red-500">GYM</span>
            </h1>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden bg-red-600 hover:bg-red-700 p-1 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-6 py-3 border-b border-gray-800">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-500">Admin Panel</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            const count  = item.countKey ? counts[item.countKey] : 0;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-gray-400 hover:bg-red-600/10 hover:text-white"
                }`}
              >
                <item.icon size={19} className={active ? "text-white" : "text-gray-500 group-hover:text-red-400"} />
                <span className="font-medium text-sm flex-1">{item.label}</span>

                {/* Red dot with count for pending trainer apps */}
                {item.countKey === "trainerApps" && count > 0 && (
                  <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    {count}
                  </span>
                )}

                {/* Number badge for others */}
                {item.countKey !== "trainerApps" && count > 0 && (
                  <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                    {count}
                  </span>
                )}

                {active && !count && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => { localStorage.removeItem("adminAuth"); window.location.href = "/admin"; }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600/10 border border-red-600/30 hover:bg-red-600 text-red-400 hover:text-white transition-all duration-200"
          >
            <LogOut size={17} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
