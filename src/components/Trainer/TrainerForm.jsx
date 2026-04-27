// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import trainersData from "./trainers.json";

// function TrainerEnquiryForm() {
//   const { id } = useParams();
//   const trainer = trainersData.find(t => t.id === id);

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   if (!trainer) {
//     return (
//       <section className="min-h-screen bg-black flex items-center justify-center text-white">
//         <p>Trainer not found.</p>
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
//                 TRAINER ENQUIRY
//               </span>
//               <h1 className="text-4xl font-bold text-white mt-4 mb-4">
//                 Talk to {trainer.name}
//               </h1>
//               <p className="text-white/70 text-lg">
//                 Share your details and our team will help connect you with the
//                 trainer for guidance and availability.
//               </p>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="border border-white/10 rounded-xl p-8 space-y-6"
//             >
//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Selected Trainer
//                 </label>
//                 <input
//                   type="text"
//                   value={trainer.name}
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

//               <div>
//                 <label className="block text-white/80 mb-2 text-sm">
//                   Message (optional)
//                 </label>
//                 <textarea
//                   value={message}
//                   onChange={e => setMessage(e.target.value)}
//                   rows="4"
//                   placeholder="Tell us your goals or preferred timing"
//                   className="w-full p-3 rounded bg-black border border-white/20
//                              text-white placeholder-white/40
//                              focus:outline-none focus:border-red-600"
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
//               Thank you for reaching out. Our team will contact you shortly
//               regarding your enquiry with <strong>{trainer.name}</strong>.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href={`https://wa.me/919876543210?text=Hi%20Power%20GYM,%20I%20want%20to%20talk%20to%20${encodeURIComponent(
//                   trainer.name
//                 )}.`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-green-600 text-green-500 px-6 py-3 rounded
//                            font-semibold hover:bg-green-600 hover:text-white transition"
//               >
//                 WhatsApp Enquiry
//               </a>

//               <Link
//                 to="/programs"
//                 className="border border-white/20 text-white px-6 py-3 rounded
//                            hover:border-red-600 transition"
//               >
//                 View Programs
//               </Link>
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default TrainerEnquiryForm;
