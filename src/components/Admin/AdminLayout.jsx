import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ enquiries: 0, joinRequests: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [eRes, jRes, tRes] = await Promise.all([
          fetch("https://gym-backend-8aij.onrender.com/api/enquiries"),
          fetch("https://gym-backend-8aij.onrender.com/api/join"),
          fetch("https://gym-backend-8aij.onrender.com/api/trainers"),
        ]);
        const enquiries    = await eRes.json();
        const joinRequests = await jRes.json();
        const trainerApps  = await tRes.json();
        const readIds = new Set(JSON.parse(localStorage.getItem("read_enquiry_ids") || "[]"));
        setCounts({
          enquiries:    Array.isArray(enquiries)    ? enquiries.filter(e => !readIds.has(e.id)).length : 0,
          joinRequests: Array.isArray(joinRequests) ? joinRequests.filter(r => r.status === "Pending").length : 0,
          trainerApps:  Array.isArray(trainerApps)  ? trainerApps.filter(t => t.status === "Pending").length : 0,
        });
      } catch {}
    }
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    window.addEventListener("refreshAdminCounts", fetchCounts);
    return () => {
      clearInterval(interval);
      window.removeEventListener("refreshAdminCounts", fetchCounts);
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} counts={counts} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
