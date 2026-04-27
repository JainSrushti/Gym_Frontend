// function TrainerCard({ trainer }) {
//   return (
//     <div className="group relative bg-[#0b0b0b] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/10 cursor-pointer">

//       {/* Photo */}
//       <div className="overflow-hidden">
//         <img
//           src={trainer.photo || "https://via.placeholder.com/400x300?text=No+Photo"}
//           alt={trainer.name}
//           className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>

//       {/* Default info — always visible */}
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
//         <p className="text-red-400 text-sm font-medium mt-1">{trainer.specialization}</p>
//         <p className="text-gray-400 text-sm mt-1">{trainer.experience} experience</p>
//       </div>

//       {/* Hover overlay — slides up on hover */}
//       <div className="absolute inset-0 bg-black/90 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
//         <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
//         <p className="text-red-400 text-sm font-semibold mb-3">{trainer.specialization}</p>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center gap-2 text-sm text-gray-300">
//             <span className="text-red-500 font-bold">⏱</span>
//             <span>{trainer.experience} experience</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-300">
//             <span className="text-red-500 font-bold">🕐</span>
//             <span>{trainer.availability}</span>
//           </div>
//         </div>

//         <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{trainer.bio}</p>
//       </div>

//     </div>
//   );
// }

// export default TrainerCard;
