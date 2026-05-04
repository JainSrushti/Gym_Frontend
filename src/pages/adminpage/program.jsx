import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Pencil } from "lucide-react";
import ConfirmDialog from "../../components/Admin/ConfirmDialog.jsx";

const API = "https://gym-backend-8aij.onrender.com/api/programs";
const LEVELS = ["Beginner", "Intermediate", "Expert"];

const levelColor = {
  Beginner: "text-green-400 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Expert: "text-red-400 bg-red-500/10 border-red-500/20",
};

const emptyForm = {
  title: "",
  shortDesc: "",
  fullDesc: "",
  level: "Beginner",
  duration: "",
  bestFor: "",
  scheduleHint: "",
  benefits: "",
  photo: "",
};

function ProgramAdmin() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmId, setConfirmId] = useState(null);

  // 🔥 FETCH FROM DATABASE
  const fetchPrograms = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setForm({
      ...p,
      benefits: p.benefits || "",
    });
    setShowForm(true);
  };

  // 📷 IMAGE TO BASE64
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

      const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(editId ? `${API}/${editId}` : API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Save failed");

      await fetchPrograms();

      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchPrograms();
      setConfirmId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const inputCls =
    "w-full bg-black border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-red-500 placeholder-gray-600";

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Programs</h2>
          <p className="text-gray-500 text-sm">{programs.length} programs total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {programs.map((p) => (
          <div key={p.id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-red-600/40 transition">
            <img
              src={p.photo || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"}
              className="h-40 w-full object-cover"
              alt={p.title}
            />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${levelColor[p.level] || "text-gray-400"}`}>
                  {p.level}
                </span>
              </div>
              <p className="text-gray-400 text-xs line-clamp-2 mb-2">{p.shortDesc}</p>
              <div className="text-gray-500 text-xs mb-3">⏱ {p.duration} · 📅 {p.scheduleHint}</div>

              {p.benefits && (
                <ul className="space-y-1 mb-3">
                  {(Array.isArray(p.benefits) ? p.benefits : p.benefits.split(",")).slice(0, 3).map((b, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {b.trim()}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex gap-2 mt-auto">
                <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-700 text-gray-300 hover:border-red-500 hover:text-white py-1.5 rounded-lg text-xs transition">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => setConfirmId(p.id)} className="flex-1 flex items-center justify-center gap-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white py-1.5 rounded-lg text-xs transition">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-[#111] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h3 className="text-white font-bold text-lg">{editId ? "Edit Program" : "Add New Program"}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{editId ? "Update program details" : "Fill in the details below"}</p>
              </div>
              <button
                onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">

              {/* Photo Upload */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2">Program Photo</label>
                <div className="relative border-2 border-dashed border-gray-700 rounded-xl overflow-hidden hover:border-red-500 transition">
                  {form.photo ? (
                    <div className="relative">
                      <img src={form.photo} alt="preview" className="w-full h-36 object-cover" />
                      <button type="button"
                        onClick={() => setForm({ ...form, photo: "" })}
                        className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-red-600 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-36 cursor-pointer">
                      <span className="text-gray-500 text-sm">Click to upload photo</span>
                      <span className="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  )}
                </div>
              </div>

              {/* Two column row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Duration</label>
                  <input className={inputCls} placeholder="e.g. 8 Weeks" value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Level</label>
                  <select className={inputCls} value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}>
                    {LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              {/* Fields */}
              {[
                { label: "Title",            field: "title",       placeholder: "e.g. Strength Training",        required: true },
                { label: "Schedule",         field: "scheduleHint",placeholder: "e.g. Morning & Evening",        required: true },
                { label: "Best For",         field: "bestFor",     placeholder: "e.g. Fat loss and endurance",   required: true },
                { label: "Short Description",field: "shortDesc",   placeholder: "One-line summary",              required: true },
              ].map(({ label, field, placeholder, required }) => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs font-medium mb-1">{label}</label>
                  <input className={inputCls} placeholder={placeholder} value={form[field]} required={required}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                </div>
              ))}

              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">Full Description</label>
                <textarea className={inputCls} rows={3} placeholder="Detailed description..."
                  value={form.fullDesc} onChange={(e) => setForm({ ...form, fullDesc: e.target.value })} />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">
                  Benefits <span className="text-gray-600">(comma separated)</span>
                </label>
                <textarea className={inputCls} rows={2} placeholder="e.g. Build strength, Improve posture, Burn fat"
                  value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button"
                  onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }}
                  className="flex-1 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 py-2.5 rounded-lg text-sm transition">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition">
                  {editId ? "Update Program" : "Add Program"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this program?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}

    </div>
  );
}

export default ProgramAdmin;