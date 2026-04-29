import { useState, useEffect } from "react";
import { CheckCircle, Clock, Users } from "lucide-react";

const API = "http://localhost:8080/api";

function joinrequests() {
  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [approving, setApproving] = useState(null); // id being approved

  // ─── Fetch all requests ───────────────────────────────────────────────────
  async function fetchRequests() {
    try {
      const res = await fetch(`${API}/join`);
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sort: Pending first, then by newest date
        setRequests(data.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") return -1;
          if (a.status !== "Pending" && b.status === "Pending") return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }));
      }
    } catch (err) {
      console.error("Failed to fetch join requests", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  // ─── Approve handler ──────────────────────────────────────────────────────
  async function handleApprove(id) {
    setApproving(id);
    try {
      const res = await fetch(`${API}/approve/${id}`, { method: "PUT" });
      if (!res.ok) throw new Error("Approve failed");

      // ✅ Update status in UI immediately without full reload
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
      );

      // ✅ Trigger sidebar count refresh
      window.dispatchEvent(new Event("refreshAdminCounts"));
    } catch (err) {
      alert("Failed to approve request. Please try again.");
      console.error(err);
    }
    setApproving(null);
  }

  // ─── Counts ───────────────────────────────────────────────────────────────
  const total    = requests.length;
  const pending  = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;

  if (loading) {
    return (
      <div className="text-white text-center py-20 animate-pulse">
        Loading join requests...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
            <Users size={18} className="text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Total Requests</p>
            <p className="text-white text-2xl font-bold">{total}</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
            <Clock size={18} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Pending</p>
            <p className="text-white text-2xl font-bold">{pending}</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
            <CheckCircle size={18} className="text-green-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Approved</p>
            <p className="text-white text-2xl font-bold">{approved}</p>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">All Join Requests</h2>
        </div>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-gray-400 uppercase text-xs">
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Program</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr
                    key={req.id}
                    className="border-t border-white/5 hover:bg-white/[0.02] transition"
                  >
                    <td className="px-5 py-4 text-gray-500">{i + 1}</td>

                    <td className="px-5 py-4 text-white font-medium">{req.name}</td>

                    <td className="px-5 py-4 text-gray-300">{req.phone}</td>

                    <td className="px-5 py-4 text-gray-300">{req.program}</td>

                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {req.createdAt
                        ? new Date(req.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })
                        : "—"}
                    </td>

                    {/* ── Status Badge ── */}
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === "Approved"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* ── Approve Button ── */}
                    <td className="px-5 py-4">
                      {req.status === "Approved" ? (
                        <span className="text-green-500 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle size={14} /> Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApprove(req.id)}
                          disabled={approving === req.id}
                          className={`px-4 py-1.5 rounded text-xs font-semibold transition ${
                            approving === req.id
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          {approving === req.id ? "Approving..." : "Approve"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default joinrequests;
