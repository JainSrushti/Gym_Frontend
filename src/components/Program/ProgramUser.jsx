import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { X } from "lucide-react";

const API = "https://gym-backend-8aij.onrender.com/api/programs";
const FALLBACK = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61";

function getBenefits(p) {
  if (Array.isArray(p.benefits)) return p.benefits;
  if (typeof p.benefits === "string") return p.benefits.split(",").map(b => b.trim()).filter(Boolean);
  return [];
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ProgramHero() {
  const items = [
    { title: "Structured Training",    desc: "Well-planned workout programs with proper progression for safe and effective results." },
    { title: "Goal-Oriented Programs", desc: "Focused programs for fat loss, muscle gain, strength building, and transformation." },
    { title: "All Fitness Levels",     desc: "Programs designed for beginners as well as advanced-level trainees." },
    { title: "Expert Guidance",        desc: "Designed by experienced trainers with emphasis on form, safety, and long-term growth." },
  ];
  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <span className="text-red-600 font-semibold tracking-widest">PROGRAMS</span>
        <h2 className="text-4xl font-bold text-white mt-4 mb-6">How Our Programs Work</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Our training programs are structured to deliver real, measurable results while maintaining safety and consistency.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="bg-gray-800/50 border border-white/10 rounded-xl p-6 hover:border-red-600 hover:-translate-y-2 transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Program List ─────────────────────────────────────────────────────────────
function ProgramList() {
  const [filter, setFilter] = useState("All");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const levels = ["All", "Beginner", "Intermediate", "Expert"];

  useEffect(() => {
    fetch(API).then(r => r.json())
      .then(data => { setPrograms(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = programs.filter(p => filter === "All" || p.level === filter);

  if (loading) return <section className="bg-black py-24 text-white text-center">Loading programs...</section>;

  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">PROGRAMS</span>
          <h2 className="text-4xl font-bold text-white mt-4 mb-6">Program Overview</h2>
        </div>

        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {levels.map(level => (
            <button key={level} onClick={() => setFilter(level)}
              className={`px-5 py-2 rounded border text-sm font-semibold transition ${
                filter === level ? "bg-red-600 border-red-600 text-white" : "border-white/20 text-white/70 hover:border-red-600 hover:text-white"
              }`}>{level}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(program => (
            <div key={program.id} onClick={() => setSelected(program)}
              className="group border border-white/10 rounded-xl overflow-hidden hover:border-red-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#0b0b0b]">
              <img src={program.photo || FALLBACK} alt={program.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
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

      {/* Scrollable Modal Popup */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 py-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#0b0b0b] border border-red-600/30 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <img src={selected.photo || FALLBACK} alt={selected.title}
              className="w-full h-56 object-cover rounded-t-2xl" />

            <div className="p-7">
              {/* Level + Title */}
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{selected.level}</span>
              <h2 className="text-3xl font-bold text-white mt-1 mb-3">{selected.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{selected.fullDesc || selected.shortDesc}</p>

              {/* Info boxes */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[["Duration", selected.duration], ["Schedule", selected.scheduleHint], ["Best For", selected.bestFor]].map(([label, val]) => (
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
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Link to="/join" onClick={() => setSelected(null)}
                  className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
                  Join Program
                </Link>
                <Link to="/timetable" onClick={() => setSelected(null)}
                  className="flex-1 text-center border border-white/20 hover:border-red-600 text-white font-semibold py-3 rounded-lg transition">
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

// ─── Program Details Page ─────────────────────────────────────────────────────
export function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/${id}`).then(r => r.json())
      .then(data => { setProgram(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <section className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</section>;
  if (!program) return <section className="min-h-screen bg-black flex items-center justify-center text-white">Program not found.</section>;

  const benefits = getBenefits(program);

  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-5xl mx-auto">
        <div className="border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
          <div className="mb-12">
            <span className="text-red-600 font-semibold tracking-widest">PROGRAM DETAILS</span>
            <h1 className="text-4xl font-bold text-white mt-4 mb-6">{program.title}</h1>
            <p className="text-white/70 text-lg max-w-3xl">{program.fullDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[["Duration", program.duration], ["Best For", program.bestFor], ["Schedule", program.scheduleHint]].map(([label, val]) => (
              <div key={label} className="border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-2">{label}</h4>
                <p className="text-white/70">{val}</p>
              </div>
            ))}
          </div>
          {benefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Program Benefits</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <li key={i} className="border border-white/10 rounded-lg p-4 text-white/80">{b}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/join" className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition text-center">Join Program</Link>
            <Link to="/timetable" className="border border-white/20 text-white px-8 py-3 rounded hover:border-red-600 transition text-center">View Timetable</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function ProgramUser() {
  return <><ProgramHero /><ProgramList /></>;
}

export default ProgramUser;
