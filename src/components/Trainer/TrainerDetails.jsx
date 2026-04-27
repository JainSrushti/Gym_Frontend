// import { useParams, Link } from "react-router-dom";
// import trainersData from "./trainers.json";

// function TrainerDetails() {
//   const { id } = useParams();
//   const trainer = trainersData.find(t => t.id === id);

//   if (!trainer) {
//     return (
//       <section className="min-h-screen bg-black flex items-center justify-center text-white">
//         <p>Trainer not found.</p>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-black py-24 px-6 select-none">
//       <div className="max-w-5xl mx-auto">

//         {/* Header */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
//           <div className="md:col-span-1">
//             <img
//               src={trainer.photo}
//               alt={trainer.name}
//               className="w-full h-80 object-cover rounded-xl border border-white/10"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <span className="text-red-600 font-semibold tracking-widest">
//               TRAINER PROFILE
//             </span>
//             <h1 className="text-4xl font-bold text-white mt-4 mb-4">
//               {trainer.name}
//             </h1>

//             <p className="text-white/70 mb-2">
//               <span className="text-white font-medium">Specialization:</span>{" "}
//               {trainer.specialization}
//             </p>

//             <p className="text-white/70 mb-6">
//               <span className="text-white font-medium">Experience:</span>{" "}
//               {trainer.experience}
//             </p>

//             <p className="text-white/70 text-lg leading-relaxed">
//               {trainer.bio}
//             </p>
//           </div>
//         </div>

//         {/* Info Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

//           {/* Best For */}
//           <div className="border border-white/10 rounded-xl p-6">
//             <h2 className="text-xl font-semibold text-white mb-4">
//               Best For
//             </h2>
//             <ul className="space-y-2 text-white/70">
//               {trainer.bestFor.map((item, index) => (
//                 <li key={index}>• {item}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Programs Handled */}
//           <div className="border border-white/10 rounded-xl p-6">
//             <h2 className="text-xl font-semibold text-white mb-4">
//               Programs Handled
//             </h2>
//             <ul className="space-y-2 text-white/70">
//               {trainer.programsHandled.map((program, index) => (
//                 <li key={index}>• {program}</li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* Availability */}
//         <div className="border border-white/10 rounded-xl p-6 mb-16">
//           <h2 className="text-xl font-semibold text-white mb-3">
//             Availability
//           </h2>
//           <p className="text-white/70">
//             {trainer.availability}
//           </p>
//         </div>

//         {/* CTA */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link
//             to="/programs"
//             className="border border-white/20 text-white px-8 py-3 rounded
//                        hover:border-red-600 transition text-center"
//           >
//             View Programs
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default TrainerDetails;
