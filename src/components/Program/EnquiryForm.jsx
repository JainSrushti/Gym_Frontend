// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import programsData from "./programs.json";

// function ProgramEnquiryForm() {
//   const { id } = useParams();
//   const program = programsData.find(p => p.id === id);

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   if (!program) {
//     return (
//       <section className="min-h-screen bg-black flex items-center justify-center text-white">
//         <p>Program not found.</p>
//       </section>
//     );
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     setSubmitted(true);
//   }

//   return (
//     <section className="bg-black py-24 px-6 select-none">
//       <div className="max-w-4xl mx-auto">

//         {!submitted ? (
//           <>
//             {/* Header */}
//             <div className="text-center mb-12">
//               <span className="text-red-600 font-semibold tracking-widest">
//                 PROGRAM ENQUIRY
//               </span>
//               <h1 className="text-4xl font-bold text-white mt-4 mb-4">
//                 {program.title}
//               </h1>
//               <p className="text-white/70 text-lg">
//                 Submit your details and our team will contact you with guidance
//                 and availability for this program.
//               </p>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="border border-white/10 rounded-xl p-8 space-y-6"
//             >
//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Selected Program
//                 </label>
//                 <input
//                   type="text"
//                   value={program.title}
//                   readOnly
//                   className="w-full p-3 rounded bg-black border border-white/20
//                              text-white cursor-not-allowed"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={e => setName(e.target.value)}
//                   required
//                   className="w-full p-3 rounded bg-black border border-white/20
//                              text-white focus:outline-none focus:border-red-600"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={e => setPhone(e.target.value)}
//                   required
//                   className="w-full p-3 rounded bg-black border border-white/20
//                              text-white focus:outline-none focus:border-red-600"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   className="w-full p-3 rounded bg-black border border-white/20
//                              text-white focus:outline-none focus:border-red-600"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-red-600 text-white py-3 rounded
//                            font-semibold hover:bg-red-700 transition"
//               >
//                 Submit Enquiry
//               </button>
//             </form>
//           </>
//         ) : (
//           /* Success State */
//           <div className="text-center border border-white/10 rounded-xl p-12">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Enquiry Submitted
//             </h2>
//             <p className="text-white/70 mb-8">
//               Thank you for your interest in the <strong>{program.title}</strong>.
//               Our team will contact you shortly.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href={`https://wa.me/919876543210?text=Hi%20Power%20GYM,%20I%20enquired%20about%20the%20${encodeURIComponent(
//                   program.title
//                 )}%20program.`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-green-600 text-green-500 px-6 py-3 rounded
//                            font-semibold hover:bg-green-600 hover:text-white transition"
//               >
//                 WhatsApp Enquiry
//               </a>

//               <Link
//                 to="/membership"
//                 className="border border-white/20 text-white px-6 py-3 rounded
//                            hover:border-red-600 transition"
//               >
//                 View Membership Plans
//               </Link>
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default ProgramEnquiryForm;
