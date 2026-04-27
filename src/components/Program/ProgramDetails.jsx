// import { useParams, Link } from "react-router-dom";
// import programsData from "./programs.json";

// function ProgramDetails() {
//   const { id } = useParams();
//   const program = programsData.find(p => p.id === id);

//   if (!program) {
//     return (
//       <section className=" min-h-screen bg-black flex items-center justify-center text-white">
//         <p>Program not found.</p>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-black py-24 px-6 select-none ">
//       <div className="max-w-5xl mx-auto">
//         <div className="border border-white rounded-2xl p-10     backdrop-blur-sm ">
//         {/* Header */}
//         <div className="mb-16 ">
//           <span className="text-red-600 font-semibold tracking-widest">
//             PROGRAM DETAILS
//           </span>
//           <h1 className="text-4xl font-bold text-white mt-4 mb-6">
//             {program.title}
//           </h1>
//           <p className="text-white/70 text-lg max-w-3xl">
//             {program.fullDesc}
//           </p>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

//           <div className="border border-white/10 rounded-xl p-6">
//             <h4 className="text-white font-semibold mb-2">Duration</h4>
//             <p className="text-white/70">{program.duration}</p>
//           </div>

//           <div className="border border-white/10 rounded-xl p-6">
//             <h4 className="text-white font-semibold mb-2">Best For</h4>
//             <p className="text-white/70">{program.bestFor}</p>
//           </div>

//           <div className="border border-white/10 rounded-xl p-6">
//             <h4 className="text-white font-semibold mb-2">Schedule</h4>
//             <p className="text-white/70">{program.scheduleHint}</p>
//           </div>

//         </div>

//         {/* Benefits */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-white mb-6">
//             Program Benefits
//           </h2>

//           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {program.benefits.map((benefit, index) => (
//               <li
//                 key={index}
//                 className="border border-white/10 rounded-lg p-4 text-white/80"
//               >
//                 {benefit}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* CTA */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link
//             to="/join"
//             className="bg-red-600 text-white px-8 py-3 rounded font-semibold
//                        hover:bg-red-700 transition text-center"
//           >
//             Join Program
//           </Link>
//           <Link
//             to="/timetable"
//             className="border border-white/20 text-white px-8 py-3 rounded
//                        hover:border-red-600 transition text-center"
//           >
//             View Timetable
//           </Link>
//         </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProgramDetails;
