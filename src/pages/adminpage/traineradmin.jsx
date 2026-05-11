import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, CheckCircle, XCircle, Clock, Pencil } from "lucide-react";
import ConfirmDialog from "../../components/Admin/ConfirmDialog.jsx";

const API = "https://gym-backend-8aij.onrender.com/api/gym-trainers";

const statusStyles = {
  Pending:  { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: Clock },
  Approved: { color: "text-green-400 bg-green-500/10 border-green-500/20",   icon: CheckCircle },
  Rejected: { color: "text-red-400 bg-red-500/10 border-red-500/20",         icon: XCircle },
};

const NO_PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555' font-size='16' font-family='sans-serif'%3ENo Photo%3C/text%3E%3C/svg%3E";

function TrainerAdmin() {
  const [tab, setTab] = useState("trainers");
  const [trainers, setTrainers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const emptyForm = { name: "", specialization: "", experience: "", availability: "", bio: "", phoneNumber: "", photo: "", bestFor: "", programsHandled: "" };
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (t) => { setEditId(t.id); setForm({ name: t.name, specialization: t.specialization, experience: t.experience, availability: t.availability, bio: t.bio, phoneNumber: t.phoneNumber || "", photo: t.photo || "", bestFor: t.bestFor || "", programsHandled: t.programsHandled || "" }); setShowForm(true); };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 400;
      const ratio = Math.min(MAX / img.width, MAX / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      setForm((f) => ({ ...f, photo: canvas.toDataURL("image/jpeg", 0.6) }));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.error("Trainer fetch error:", err));
  }, []);

  useEffect(() => {
    fetch("https://gym-backend-8aij.onrender.com/api/trainers")
      .then((res) => res.json())
      .then((data) => setApplications([...data].reverse()))
      .catch((err) => console.error("Application fetch error:", err));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = { ...form, experienceYears: parseInt(form.experience) || 0 };
    try {
      if (editId) {
        const res = await fetch(`${API}/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const updated = await res.json();
        setTrainers((prev) => prev.map((t) => (t.id === editId ? updated : t)));
      } else {
        const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const saved = await res.json();
        setTrainers((prev) => [...prev, saved]);
      }
      setShowForm(false); setEditId(null); setForm(emptyForm);
    } catch (error) {
      console.error("Save trainer failed:", error);
    }
  };

  const handleDeleteTrainer = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTrainers(trainers.filter((t) => t.id !== id));
      setConfirmId(null);
    } catch (error) { console.error("Delete failed:", error); }
  };

  const updateAppStatus = async (id, status) => {
    try {
      const endpoint = status === "Approved" ? `https://gym-backend-8aij.onrender.com/api/trainers/${id}/approve` : `https://gym-backend-8aij.onrender.com/api/trainers/${id}/reject`;
      const res = await fetch(endpoint, { method: "PUT" });
      const updated = await res.json();
      setApplications((prev) => prev.map((app) => (app.id === id ? updated : app)));
      window.dispatchEvent(new Event("refreshAdminCounts"));
    } catch (error) { console.error("Status update failed:", error); }
  };

  const pendingCount = applications.filter((a) => a.status === "Pending").length;
  const inputCls = "w-full p-2.5 rounded-lg bg-black border border-gray-700 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Trainers</h2>
          <p className="text-gray-500 text-sm">{trainers.length} trainers · {applications.length} applications</p>
        </div>
        {tab === "trainers" && (
          <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
            <Plus size={16} /> Add Trainer
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-gray-800 rounded-xl p-1 w-fit">
        <button onClick={() => setTab("trainers")} className={`px-6 py-2.5 text-sm font-bold rounded-lg transition ${tab === "trainers" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>Trainers</button>
        <button onClick={() => setTab("applications")} className={`px-6 py-2.5 text-sm font-bold rounded-lg transition flex items-center gap-2 ${tab === "applications" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
          Applications
          {pendingCount > 0 && <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full ${tab === "applications" ? "bg-white text-red-600" : "bg-red-600 text-white"}`}>{pendingCount}</span>}
        </button>
      </div>

      {/* Trainers Tab */}
      {tab === "trainers" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainers.map((t) => (
            <div key={t.id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-red-600/40 transition">
              <div className="w-full h-52 bg-gray-900 overflow-hidden">
                <img src={t.photo || NO_PHOTO} alt={t.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">{t.name}</h3>
                <p className="text-red-400 text-sm">{t.specialization}</p>
                <p className="text-gray-500 text-xs mt-1">{t.experience} · {t.availability}</p>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2">{t.bio}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(t)} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-700 text-gray-300 hover:border-red-500 hover:text-white py-1.5 rounded-lg text-xs transition">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => setConfirmId(t.id)} className="flex-1 flex items-center justify-center gap-2 text-red-500 border border-red-600 py-1.5 rounded-lg text-xs hover:bg-red-600 hover:text-white transition">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applications Tab */}
      {tab === "applications" && (
        <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No applications yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Specialization</th>
                    <th className="p-4 text-left">Experience</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => {
                    const style = statusStyles[a.status] || statusStyles.Pending;
                    const Icon = style.icon;
                    return (
                      <tr key={a.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition">
                        <td className="p-4 text-white">{a.name}</td>
                        <td className="p-4 text-gray-400">{a.phone || a.phoneNumber}</td>
                        <td className="p-4 text-gray-400">{a.email || "-"}</td>
                        <td className="p-4 text-gray-400">{a.specialization || "-"}</td>
                        <td className="p-4 text-gray-400">{a.experience || "-"}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${style.color}`}>
                            <Icon size={11} /> {a.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {a.status !== "Approved" && (
                            <button onClick={() => updateAppStatus(a.id, "Approved")} className="text-green-400 hover:text-white hover:bg-green-600 border border-green-600/30 px-2.5 py-1.5 rounded-lg text-xs transition">Approve</button>
                          )}
                          {a.status !== "Rejected" && (
                            <button onClick={() => updateAppStatus(a.id, "Rejected")} className="text-red-400 hover:text-white hover:bg-red-600 border border-red-600/30 px-2.5 py-1.5 rounded-lg text-xs transition">Reject</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-3xl relative max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">{editId ? "Edit Trainer" : "Add Trainer"}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{editId ? "Update trainer details" : "Fill in the details below"}</p>
              </div>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }} className="bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white p-1.5 rounded-lg transition">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "name",            placeholder: "e.g. John Smith",             label: "Full Name" },
                  { key: "specialization",  placeholder: "e.g. Strength & Conditioning", label: "Specialization" },
                  { key: "experience",      placeholder: "e.g. 5+ years",               label: "Experience" },
                  { key: "availability",    placeholder: "e.g. Morning & Evening",       label: "Availability" },
                  { key: "phoneNumber",     placeholder: "e.g. 9876543210",              label: "WhatsApp Number" },
                  { key: "bestFor",         placeholder: "e.g. Beginners, Weight loss",  label: "Best For (comma separated)" },
                  { key: "programsHandled", placeholder: "e.g. HIIT, Yoga, Strength",   label: "Programs Handled (comma separated)" },
                ].map(({ key, placeholder, label }) => (
                  <div key={key}>
                    <label className="block text-gray-400 text-xs font-medium mb-1">{label}</label>
                    <input placeholder={placeholder} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputCls} />
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">Bio</label>
                <textarea placeholder="Short bio about the trainer..." value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">Trainer Photo</label>
                <div
                  className="border-2 border-dashed border-gray-700 hover:border-red-500 rounded-xl p-4 text-center transition cursor-pointer"
                  onClick={() => document.getElementById("trainer-photo").click()}
                >
                  {form.photo ? (
                    <img src={form.photo} alt="preview" className="h-36 w-full object-cover object-top rounded-lg" />
                  ) : (
                    <div className="text-gray-500">
                      <div className="text-3xl mb-1">📷</div>
                      <p className="text-xs">Click to upload photo</p>
                      <p className="text-xs text-gray-600 mt-0.5">JPG, PNG supported</p>
                    </div>
                  )}
                </div>
                <input id="trainer-photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                {form.photo && (
                  <button type="button" onClick={() => setForm({ ...form, photo: "" })} className="mt-1 text-xs text-red-500 hover:text-red-400">
                    Remove photo
                  </button>
                )}
              </div>

              <div className="border-t border-gray-800" />

              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }} className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2.5 rounded-lg text-sm font-medium transition">Cancel</button>
                <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition">{editId ? "Save Changes" : "Save Trainer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this trainer?"
          onConfirm={() => handleDeleteTrainer(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

export default TrainerAdmin;
