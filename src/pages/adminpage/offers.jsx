import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Pencil } from "lucide-react";
import ConfirmDialog from "../../components/Admin/ConfirmDialog.jsx";

const API = "https://gym-backend-8aij.onrender.com/api/offers";

const emptyForm = { tag: "", title: "", desc: "", price: "", details: "" };

function OffersAdmin() {

  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [confirmId, setConfirmId] = useState(null);

  // ✅ FETCH FUNCTION (REUSABLE)
  const fetchOffers = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setOffers(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchOffers();
  }, []);

  const openAdd  = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (o) => { setEditId(o.id); setForm(o); setShowForm(true); };

  // ✅ SAVE (FIXED)
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await fetch(editId ? `${API}/${editId}` : API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // ✅ IMPORTANT FIX: RELOAD FROM DB (NO DUPLICATE)
      await fetchOffers();

      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);

    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await fetchOffers();
      setConfirmId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const inp = "w-full bg-[#1a1a1a] border border-gray-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Offers</h2>
          <p className="text-gray-500 text-sm">{offers.length} offers total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <Plus size={16} /> Add Offer
        </button>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {offers.map((o) => (
          <div key={o.id} className="bg-[#111] border border-gray-800 rounded-xl p-5 flex flex-col hover:border-red-600/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{o.icon}</span>
              {o.tag && <span className="text-xs font-bold text-red-400 bg-red-600/10 border border-red-600/20 px-2 py-0.5 rounded-full">{o.tag}</span>}
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{o.title}</h3>
            <p className="text-gray-400 text-xs line-clamp-2 mb-2">{o.desc}</p>
            {o.price && <p className="text-red-400 text-xs font-semibold mb-1">{o.price}</p>}
            {o.details && <p className="text-gray-500 text-xs">{o.details}</p>}
            <div className="flex gap-2 mt-auto pt-3">
              <button onClick={() => openEdit(o)} className="flex-1 flex items-center justify-center gap-1 border border-gray-700 text-gray-300 hover:border-red-500 hover:text-white py-1.5 rounded-lg text-xs transition">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={() => setConfirmId(o.id)} className="flex-1 flex items-center justify-center gap-1 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white py-1.5 rounded-lg text-xs transition">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">

            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-white font-bold text-lg">{editId ? "Edit Offer" : "Add New Offer"}</h3>
                <p className="text-gray-500 text-xs mt-0.5">Changes reflect on the home page instantly</p>
              </div>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }} className="text-gray-400 hover:text-white transition mt-0.5">
                <X size={18} />
              </button>
            </div>

            <div className="border-t border-gray-800 my-4" />

            <form onSubmit={handleSave} className="space-y-4">

              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Tag</label>
                <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inp} />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Title</label>
                <input value={form.title} required onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
              </div>

              {/* ❌ untouched */}
              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Short Description</label>
                <input value={form.desc} required onChange={(e) => setForm({ ...form, desc: e.target.value })} className={inp} />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Price</label>
                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Details</label>
                <input value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className={inp} />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }}
                  className="flex-1 border border-gray-700 text-gray-300 hover:text-white py-3 rounded-lg text-sm">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-sm">
                  {editId ? "Save Changes" : "Add Offer"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this offer?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

export default OffersAdmin;