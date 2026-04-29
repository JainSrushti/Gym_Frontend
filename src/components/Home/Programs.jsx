import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const API = "http://localhost:8080/api/programs";
const FALLBACK = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61";

function getBenefits(p) {
  if (Array.isArray(p.benefits)) return p.benefits;
  if (typeof p.benefits === "string") return p.benefits.split(",").map(b => b.trim()).filter(Boolean);
  return [];
}

function Program() {
  const [programs, setPrograms] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => setPrograms(Array.isArray(data) ? data.slice(-3).reverse() : []))
      .catch(() => {});
  }, []);

  return (
    <section className="bg-black py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold tracking-widest">PROGRAMS</span>
          <h2 className="text-3xl font-bold text-white mt-4">Our Programs</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => setSelected(program)}
              className="group border border-white/10 rounded-xl overflow-hidden hover:border-red-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#0b0b0b]"
            >
              <img
                src={program.photo || FALLBACK}
                alt={program.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-5">
                <span className="text-xs text-red-500 uppercase tracking-widest">{program.level}</span>
                <h3 className="text-xl font-bold text-white mt-1">{program.title}</h3>
                <p className="text-white/60 text-sm mt-1">{program.shortDesc}</p>
                <p className="text-red-500 text-xs mt-4 font-medium">Click to view details →</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Info Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 py-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#0b0b0b] border border-red-600/30 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <img
              src={selected.photo || FALLBACK}
              alt={selected.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />

            <div className="p-7">

              {/* Level + Title */}
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                {selected.level}
              </span>
              <h2 className="text-3xl font-bold text-white mt-1 mb-3">
                {selected.title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {selected.fullDesc || selected.shortDesc}
              </p>

              {/* Info boxes */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  ["Duration",  selected.duration],
                  ["Schedule",  selected.scheduleHint],
                  ["Best For",  selected.bestFor],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white/40 text-xs mb-1">{label}</p>
                    <p className="text-white text-sm font-semibold">{val || "—"}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              {getBenefits(selected).length > 0 && (
                <>
                  <h4 className="text-white font-semibold mb-3">Program Benefits</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                    {getBenefits(selected).map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Link
                  to="/join"
                  onClick={() => setSelected(null)}
                  className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Join Program
                </Link>
                <Link
                  to="/timetable"
                  onClick={() => setSelected(null)}
                  className="flex-1 text-center border border-white/20 hover:border-red-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  View Timetable
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Program;
