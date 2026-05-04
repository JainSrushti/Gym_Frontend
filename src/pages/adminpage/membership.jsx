import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Pencil } from "lucide-react";
import ConfirmDialog from "../../components/Admin/ConfirmDialog.jsx";

const API = "https://gym-backend-8aij.onrender.com/api/membership-plans";

const emptyForm = {
  title: "",
  duration: "",
  price: "",
  originalPrice: "",
  perMonth: "",
  badge: "",
  bestFor: "",
  highlight: false,
  benefits: "",
};

function MembershipAdmin() {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmId, setConfirmId] = useState(null);

  // ✅ FETCH FROM DATABASE
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (plan) => {
    setEditId(plan.id);
    setForm({
      ...plan,
      benefits: plan.benefits || "",
    });
    setShowForm(true);
  };

  // ✅ ADD / UPDATE
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      highlight: form.highlight === true || form.highlight === "true",
    };

    try {
      if (editId) {
        const res = await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const updated = await res.json();

        setPlans((prev) =>
          prev.map((p) => (p.id === editId ? updated : p))
        );
      } else {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const saved = await res.json();

        setPlans((prev) => [...prev, saved]);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setPlans((prev) => prev.filter((p) => p.id !== id));
      setConfirmId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">
            Membership Plans
          </h2>
          <p className="text-gray-500 text-sm">
            {plans.length} plans
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-[#111] border rounded-xl p-5 flex flex-col gap-3 ${
              plan.highlight ? "border-red-600" : "border-gray-800"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">
                  {plan.title}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {plan.duration} · {plan.bestFor}
                </p>
              </div>
              {plan.badge && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {plan.badge}
                </span>
              )}
            </div>

            <div>
              <span className="text-white text-2xl font-extrabold">
                {plan.price}
              </span>
              <span className="text-gray-500 line-through text-sm ml-2">
                {plan.originalPrice}
              </span>
              <p className="text-red-400 text-xs mt-0.5">
                {plan.perMonth}
              </p>
            </div>

            <ul className="space-y-1">
              {(plan.benefits
                ? plan.benefits.split(",")
                : []
              ).map((b, i) => (
                <li
                  key={i}
                  className="text-gray-400 text-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-auto pt-2">
              <button
                onClick={() => openEdit(plan)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-700 text-gray-300 hover:border-red-500 hover:text-white py-1.5 rounded-lg text-xs transition"
              >
                <Pencil size={12} /> Edit
              </button>

              <button
                onClick={() => setConfirmId(plan.id)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white py-1.5 rounded-lg text-xs transition"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-gray-800 rounded-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-white font-bold text-lg mb-5">
              {editId ? "Edit Plan" : "Add New Plan"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              {[
                { label: "Plan Title", key: "title" },
                { label: "Duration", key: "duration" },
                { label: "Price", key: "price" },
                { label: "Original Price", key: "originalPrice" },
                { label: "Per Month", key: "perMonth" },
                { label: "Badge", key: "badge" },
                { label: "Best For", key: "bestFor" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-gray-400 text-xs">
                    {label}
                  </label>
                  <input
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full bg-black border border-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
              ))}

              <textarea
                placeholder="Benefits (comma separated)"
                value={form.benefits}
                onChange={(e) =>
                  setForm({ ...form, benefits: e.target.value })
                }
                className="w-full bg-black border border-gray-700 text-white rounded px-3 py-2"
              />

              <button className="w-full bg-red-600 py-2 rounded text-white">
                {editId ? "Save Changes" : "Add Plan"}
              </button>
            </form>
          </div>
        </div>
      )}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this plan?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

export default MembershipAdmin;