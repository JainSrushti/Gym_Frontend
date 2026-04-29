import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

const DAYS       = ["mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const inp = "bg-zinc-900 text-white text-sm rounded-lg px-3 py-2 w-full border border-white/10 focus:outline-none focus:border-red-500";

function TimetableAdmin() {
  const [gymHours,  setGymHours]  = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [saved,     setSaved]     = useState(false);
  const [error,     setError]     = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/timetable/hours")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setGymHours(d.sort((a, b) => a.id - b.id)); })
      .catch(() => {});

    fetch("http://localhost:8080/api/timetable/weekly")
      .then(r => r.json())
      .then(d => { 
        if (Array.isArray(d) && d.length) setTimetable(d.sort((a, b) => a.id - b.id));
        else fetch("http://localhost:8080/api/timetable")
          .then(r => r.json())
          .then(d2 => { if (Array.isArray(d2)) setTimetable(d2.sort((a, b) => a.id - b.id)); })
          .catch(() => {});
      })
      .catch(() => {
        fetch("http://localhost:8080/api/timetable")
          .then(r => r.json())
          .then(d2 => { if (Array.isArray(d2)) setTimetable(d2.sort((a, b) => a.id - b.id)); })
          .catch(() => {});
      });
  }, []);

  function handleHourChange(i, field, value) {
    setGymHours(prev => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h));
  }

  function handleCellChange(rowIdx, field, value) {
    setTimetable(prev => prev.map((r, i) => i === rowIdx ? { ...r, [field]: value } : r));
  }

  function addHourCard() {
    setGymHours(prev => [...prev, { title: "", time: "" }]);
  }

  async function removeHourCard(i) {
    const card = gymHours[i];
    if (card.id) {
      await fetch(`http://localhost:8080/api/timetable/hours/${card.id}`, { method: "DELETE" }).catch(() => {});
    }
    setGymHours(prev => prev.filter((_, idx) => idx !== i));
  }

  async function removeRow(i) {
    const row = timetable[i];
    if (row.id) {
      await fetch(`http://localhost:8080/api/timetable/weekly/${row.id}`, { method: "DELETE" }).catch(() => {});
    }
    setTimetable(prev => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setError("");
    try {
      // Save gym hours
      await fetch("http://localhost:8080/api/timetable/hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gymHours),
      });

      // Save timetable rows — PUT for existing (has id), POST for new
      const putRequests = timetable
        .filter(r => r.id)
        .map(r => fetch(`http://localhost:8080/api/timetable/weekly/${r.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        }));

      const newRows = timetable.filter(r => !r.id);
      const postRequests = newRows.length
        ? [fetch("http://localhost:8080/api/timetable/weekly", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRows),
          })]
        : [];

      await Promise.all([...putRequests, ...postRequests]);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);

      // Reload fresh data from DB
      const [h, t] = await Promise.all([
        fetch("http://localhost:8080/api/timetable/hours").then(r => r.json()),
        fetch("http://localhost:8080/api/timetable/weekly").then(r => r.json()),
      ]);
      if (Array.isArray(h) && h.length) setGymHours(h.sort((a, b) => a.id - b.id));
      if (Array.isArray(t) && t.length) setTimetable(t.sort((a, b) => a.id - b.id));

    } catch (err) {
      console.error(err);
      setError("Failed to save. Check backend connection.");
    }
  }

  return (
    <div className="space-y-8 text-white">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Timetable Manager</h2>
          <p className="text-gray-500 text-sm">Edit gym hours and weekly schedule</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold transition"
        >
          {saved ? "Saved ✓" : "Save to Database"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Gym Hours */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-white font-bold">Gym Hours Cards</h3>
          <button
            onClick={addHourCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-gray-300 transition"
          >
            <Plus size={13} /> Add Card
          </button>
        </div>

        {gymHours.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-4">No cards yet. Click "Add Card" to create one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gymHours.map((card, i) => (
              <div key={i} className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2 relative">
                <button
                  onClick={() => removeHourCard(i)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-600/10 transition"
                >
                  <X size={13} />
                </button>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Title</label>
                  <input
                    className={inp}
                    value={card.title || ""}
                    onChange={(e) => handleHourChange(i, "title", e.target.value)}
                    placeholder="e.g. Morning"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Time / Info</label>
                  <input
                    className={inp}
                    value={card.time || ""}
                    onChange={(e) => handleHourChange(i, "time", e.target.value)}
                    placeholder="e.g. 5:30 AM – 11:00 AM"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Timetable */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-bold border-b border-gray-800 pb-3">Weekly Timetable</h3>

        {timetable.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-4">No rows yet. Click "Add Row" to create one.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-3 py-3 text-left font-semibold w-36">Time Slot</th>
                  {DAY_LABELS.map(d => (
                    <th key={d} className="px-3 py-3 text-left font-semibold">{d}</th>
                  ))}
                  <th className="px-3 py-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}>
                    <td className="px-2 py-2">
                      <input
                        className={inp}
                        placeholder="e.g. 5:30 – 7:00 AM"
                        value={row.slot || ""}
                        onChange={(e) => handleCellChange(i, "slot", e.target.value)}
                      />
                    </td>
                    {DAYS.map(d => (
                      <td key={d} className="px-2 py-2">
                        <input
                          className={inp}
                          placeholder="—"
                          value={row[d] || ""}
                          onChange={(e) => handleCellChange(i, d, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2 text-center">
                      <button
                        onClick={() => removeRow(i)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-600/10 transition"
                      >
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => setTimetable([...timetable, { slot: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "" }])}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-gray-300 transition"
        >
          <Plus size={14} /> Add Row
        </button>
      </div>

    </div>
  );
}

export default TimetableAdmin;
