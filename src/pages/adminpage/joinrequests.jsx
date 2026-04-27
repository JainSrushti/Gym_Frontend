import React, { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";

const statusStyles = {
  Pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: Clock,
  },
  Approved: {
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: CheckCircle,
  },
};

function JoinRequests() {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch join requests
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/join");
      const data = await res.json();

      const formatted = data.map((item) => ({
        ...item,
        status: item.status || "Pending",
        date: item.date || new Date().toISOString().split("T")[0],
      })).reverse();

      setRequests(formatted);
    } catch (err) {
      console.error("Error fetching join requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve and save in DB
  const updateStatus = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/join/${id}/approve`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve");
      }

      const updated = await response.json();

      setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: updated.status } : r)
      );
      // notify layout to refresh badge count
      window.dispatchEvent(new Event("refreshAdminCounts"));
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

  const counts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-bold">
          Join Requests
        </h2>
        <p className="text-gray-500 text-sm">
          {counts.total} total requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total", value: counts.total, color: "text-white" },
          {
            label: "Pending",
            value: counts.pending,
            color: "text-yellow-400",
          },
          {
            label: "Approved",
            value: counts.approved,
            color: "text-green-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#111] border border-gray-800 rounded-xl px-5 py-4"
          >
            <p className="text-gray-500 text-xs">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase">
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left hidden sm:table-cell">
                Phone
              </th>
              <th className="px-5 py-3 text-left hidden md:table-cell">
                Program
              </th>
              <th className="px-5 py-3 text-left hidden lg:table-cell">
                Date
              </th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {requests.map((r) => {
              const { color, icon: Icon } =
                statusStyles[r.status] || statusStyles.Pending;

              return (
                <tr
                  key={r.id}
                  className="hover:bg-gray-800/30 transition"
                >
                  <td className="px-5 py-4 text-white font-medium">
                    {r.name}
                  </td>

                  <td className="px-5 py-4 text-gray-400 hidden sm:table-cell">
                    {r.phone}
                  </td>

                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">
                    {r.program}
                  </td>

                  <td className="px-5 py-4 text-gray-400 hidden lg:table-cell">
                    {r.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${color}`}
                    >
                      <Icon size={11} /> {r.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      {r.status !== "Approved" && (
                        <button
                          onClick={() => updateStatus(r.id)}
                          className="text-green-400 hover:text-white hover:bg-green-600 border border-green-600/30 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JoinRequests;