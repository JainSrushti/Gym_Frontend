import { useState, useEffect } from "react";
import { X } from "lucide-react";

const API = "http://localhost:8080/api/programs";
const FALLBACK_IMG = "https://media.istockphoto.com/id/1137123791/photo/muscular-man-doing-battle-ropes-exercise-at-the-cross-training-gym.jpg?s=612x612&w=0&k=20&c=hiBVJC3bghTJtWQieVVsEMN6GD6RhvXzqoUFXMyTNo4=";

function toArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val) return val.split(",").map(s => s.trim());
  return [];
}

function ProgramCard({ program, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#0b0b0b] border border-white/10 rounded-xl overflow-hidden hover:border-red-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <img
        src={program.photo || FALLBACK_IMG}
        alt={program.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{program.level}</span>
        <h3 className="text-xl font-bold text-white mt-1">{program.title}</h3>
        <p className="text-white/60 text-sm mt-2">{program.shortDesc}</p>
        <p className="text-red-500 text-xs font-semibold mt-4">Click to view details →</p>
      </div>
    </div>
  );
}

function Program() {
  const [programs, setPrograms] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPrograms(list.slice(-3).reverse());
      })
      .catch((err) => console.error("Programs fetch error:", err));
  }, []);

  return (
    <section className="bg-black py-20 select-none">
      <h2 className="text-3xl font-bold text-center mb-12 text-white tracking-wide">
        Our Programs
      </h2>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} onClick={() => setSelected(program)} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <a href="/programs" className="border border-red-600 text-red-500 px-8 py-3 rounded font-semibold hover:bg-red-600 hover:text-white transition duration-300">
          Explore All Programs
        </a>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0b0b0b] border border-red-600/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition">
              <X size={16} />
            </button>
            <img src={selected.photo || FALLBACK_IMG} alt={selected.title} className="w-full h-56 object-cover rounded-t-2xl" />
            <div className="p-7">
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{selected.level}</span>
              <h2 className="text-3xl font-bold text-white mt-1 mb-3">{selected.title}</h2>
              <p className="text-white/60 text-sm mb-6">{selected.fullDesc || selected.shortDesc}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[["Duration", selected.duration], ["Schedule", selected.scheduleHint], ["Best For", selected.bestFor]].map(([label, val]) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white/40 text-xs mb-1">{label}</p>
                    <p className="text-white text-sm font-semibold">{val}</p>
                  </div>
                ))}
              </div>

              {toArray(selected.benefits).length > 0 && (
                <>
                  <h4 className="text-white font-semibold mb-3">Program Benefits</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                    {toArray(selected.benefits).map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex gap-3">
                <a href="/join" className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">Join Program</a>
                <a href="/timetable" className="flex-1 text-center border border-white/20 hover:border-red-600 text-white font-semibold py-3 rounded-lg transition">View Timetable</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Program;
