import React, { useEffect, useState } from "react";
import { MessageSquare, CheckCheck } from "lucide-react";

const READ_KEY = "read_enquiry_ids";

function getReadIds() {
  try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || "[]")); }
  catch { return new Set(); }
}

function saveReadIds(set) {
  localStorage.setItem(READ_KEY, JSON.stringify([...set]));
}

function EnquiryAdmin() {
  const [enquiries, setEnquiries] = useState([]);
  const [readIds, setReadIds]     = useState(getReadIds);

  useEffect(() => {
    fetch("http://localhost:8080/api/enquiries")
      .then((r) => r.json())
      .then((data) => setEnquiries([...data].reverse()))
      .catch((err) => console.error("Error fetching enquiries:", err));
  }, []);

  function markRead(id) {
    const updated = new Set(readIds);
    updated.add(id);
    setReadIds(updated);
    saveReadIds(updated);
    window.dispatchEvent(new Event("refreshAdminCounts"));
  }

  function markAllRead() {
    const updated = new Set(enquiries.map((e) => e.id));
    setReadIds(updated);
    saveReadIds(updated);
    window.dispatchEvent(new Event("refreshAdminCounts"));
  }

  const unreadCount = enquiries.filter((e) => !readIds.has(e.id)).length;

  return (
    <div className="p-6 text-white space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare size={24} className="text-red-500" />
          <div>
            <h2 className="text-xl font-bold">Enquiries</h2>
            <p className="text-gray-500 text-xs">{enquiries.length} total · {unreadCount} unread</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 border border-white/10 hover:border-red-500 text-gray-400 hover:text-white text-xs px-4 py-2 rounded-lg transition"
          >
            <CheckCheck size={14} /> Mark all as read
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4 w-2" />
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Type</th>
              <th className="p-4">Message</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((e) => {
                const isUnread = !readIds.has(e.id);
                return (
                  <tr key={e.id} className={`border-t border-white/10 transition ${isUnread ? "bg-red-600/5" : "hover:bg-zinc-900"}`}>
                    {/* Unread dot */}
                    <td className="pl-4">
                      {isUnread && <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />}
                    </td>
                    <td className={`p-4 ${isUnread ? "text-white font-medium" : "text-gray-400"}`}>{e.name}</td>
                    <td className="p-4 text-gray-400">{e.phone}</td>
                    <td className="p-4 text-gray-400">{e.enquiryType}</td>
                    <td className="p-4 text-gray-400">{e.message || "-"}</td>
                    <td className="p-4 text-right">
                      {isUnread && (
                        <button
                          onClick={() => markRead(e.id)}
                          className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-red-500 px-3 py-1.5 rounded-lg transition"
                        >
                          Mark as read
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">No enquiries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryAdmin;
