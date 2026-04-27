// import { useState } from "react";
// import initialPrograms from "./programs.json";
// import { Link } from "react-router-dom";
// import { X } from "lucide-react";

// const STORAGE_KEY = "admin_programs";

// function Program() {
//   const [filter, setFilter] = useState("All");
//   const [selected, setSelected] = useState(null);
//   const levels = ["All", "Beginner", "Intermediate", "Expert"];

//   const programs = (() => {
//     try {
//       const stored = localStorage.getItem(STORAGE_KEY);
//       const parsed = stored ? JSON.parse(stored) : initialPrograms;
//       return Array.isArray(parsed) ? parsed : initialPrograms;
//     } catch { return initialPrograms; }
//   })();

//   const filtered = programs.filter(
//     (p) => filter === "All" || p.level === filter
//   );

//   return (
//     <section className="bg-black py-24 px-6 select-none">
//       <div className="max-w-6xl mx-auto">

//         <div className="text-center mb-16">
//           <span className="text-red-600 font-semibold tracking-widest">PROGRAMS</span>
//           <h2 className="text-4xl font-bold text-white mt-4 mb-6">Program Overview</h2>
//           <p className="text-white/70 max-w-2xl mx-auto text-lg">
//             Explore our structured training programs designed for different fitness levels and goals.
//           </p>
//         </div>

//         <div className="flex justify-center gap-3 flex-wrap mb-12">
//           {levels.map((level) => (
//             <button key={level} onClick={() => setFilter(level)}
//               className={`px-5 py-2 rounded border text-sm font-semibold transition ${
//                 filter === level
//                   ? "bg-red-600 border-red-600 text-white"
//                   : "border-white/20 text-white/70 hover:border-red-600 hover:text-white"
//               }`}
//             >
//               {level}
//             </button>
//           ))}
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filtered.map((program) => (
//             <div
//               key={program.id}
//               onClick={() => setSelected(program)}
//               className="group border border-white/10 rounded-xl overflow-hidden hover:border-red-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/10 cursor-pointer bg-[#0b0b0b]"
//             >
//               <img
//                 src={program.photo || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"}
//                 alt={program.title}
//                 className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               <div className="p-5">
//                 <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">{program.level}</span>
//                 <h3 className="text-xl font-bold text-white mt-1">{program.title}</h3>
//                 <p className="text-white/60 text-sm mt-1">{program.shortDesc}</p>
//                 <p className="text-red-500 text-xs mt-4 font-medium">Click to view details →</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Expanded Modal Card */}
//       {selected && (
//         <div
//           className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
//           onClick={() => setSelected(null)}
//         >
//           <div
//             className="bg-[#0b0b0b] border border-red-600/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-600/10 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setSelected(null)}
//               className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition"
//             >
//               <X size={16} />
//             </button>

//             {/* Image */}
//             <img
//               src={selected.photo || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"}
//               alt={selected.title}
//               className="w-full h-56 object-cover rounded-t-2xl"
//             />

//             <div className="p-7">
//               <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">{selected.level}</span>
//               <h2 className="text-3xl font-bold text-white mt-1 mb-3">{selected.title}</h2>
//               <p className="text-white/60 text-sm mb-6">{selected.fullDesc}</p>

//               {/* Info boxes */}
//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
//                   <p className="text-white/40 text-xs mb-1">Duration</p>
//                   <p className="text-white text-sm font-semibold">{selected.duration}</p>
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
//                   <p className="text-white/40 text-xs mb-1">Schedule</p>
//                   <p className="text-white text-sm font-semibold">{selected.scheduleHint}</p>
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
//                   <p className="text-white/40 text-xs mb-1">Best For</p>
//                   <p className="text-white text-sm font-semibold">{selected.bestFor}</p>
//                 </div>
//               </div>

//               {/* Benefits */}
//               <h4 className="text-white font-semibold mb-3">Program Benefits</h4>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
//                 {selected.benefits.map((b, i) => (
//                   <li key={i} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 rounded-lg px-3 py-2">
//                     <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
//                     {b}
//                   </li>
//                 ))}
//               </ul>

//               {/* CTA */}
//               <div className="flex gap-3">
//                 <Link to="/join" onClick={() => setSelected(null)}
//                   className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
//                 >
//                   Join Program
//                 </Link>
//                 <Link to="/timetable" onClick={() => setSelected(null)}
//                   className="flex-1 text-center border border-white/20 hover:border-red-600 text-white font-semibold py-3 rounded-lg transition"
//                 >
//                   View Timetable
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Program;
