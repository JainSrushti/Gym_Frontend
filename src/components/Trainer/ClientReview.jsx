// import { useEffect, useState } from "react";

// function Why() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const totalCards = 5;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % totalCards);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   const cards = [
//     {
//       review:
//         "Working with Trainer Alex has been a game-changer! His personalized approach and unwavering support helped me achieve my fitness goals faster than expected.",
//       title: "Emily R.",
//       desc: "Client since 2022",
//       img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg",
//     },
//     {
//       review:
//         "Trainer Sarah's expertise and motivation pushed me beyond my limits. Her structured workouts transformed both my body and mindset.",
//       title: "Michael T.",
//       desc: "Client since 2021",
//       img: "https://img.freepik.com/premium-photo/users-rate-their-service-experience-online-application-customer-satisfaction-survey-concept_150418-1584.jpg",
//     },
//     {
//       review:
//         "Trainer David’s guidance and discipline helped me stay consistent. I’ve never felt stronger or more confident.",
//       title: "Sophia L.",
//       desc: "Client since 2023",
//       img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg",
//     },
//     {
//       review:
//         "Trainer Mark’s structured programs and progress tracking made a massive difference in my health and confidence.",
//       title: "David W.",
//       desc: "Client since 2020",
//       img: "https://img.freepik.com/premium-photo/users-rate-their-service-experience-online-application-customer-satisfaction-survey-concept_150418-1584.jpg",
//     },
//     {
//       review:
//         "Trainer Emily helped me push past limits I never thought possible. The results speak for themselves.",
//       title: "Olivia M.",
//       desc: "Client since 2022",
//       img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg",
//     },
//   ];

//   return (
//     <section className="bg-black w-full py-24 select-none overflow-x-hidden">
//       <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
//         What Clients Say About Our Trainers
//       </h2>

//       <div className="relative w-full overflow-hidden">
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {cards.map((card, index) => {
//             const isActive = index === currentIndex;

//             return (
//               <div
//                 key={index}
//                 className="w-full shrink-0 flex flex-col md:flex-row items-center
//                            px-6 md:px-16 gap-10"
//               >
//                 {/* TEXT */}
//                 <div
//                   className={`
//                     w-full md:w-1/2 space-y-4
//                     transition-all duration-700
//                     ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}
//                   `}
//                 >
//                   <p className="text-red-600 font-semibold tracking-wide">
//                     VERIFIED CLIENT
//                   </p>

//                   <h3 className="text-2xl md:text-3xl font-bold text-white">
//                     {card.title}
//                   </h3>

//                   <p className="text-white/60 text-sm">
//                     {card.desc}
//                   </p>

//                   <p className="text-white/80 text-lg leading-relaxed">
//                     “{card.review}”
//                   </p>

//                   <a
//                     href="/trainers"
//                     className="inline-block mt-4 border border-red-600 text-red-500
//                                px-6 py-3 rounded font-semibold
//                                hover:bg-red-600 hover:text-white transition"
//                   >
//                     View Trainers
//                   </a>
//                 </div>

//                 {/* IMAGE */}
//                 <div
//                   className={`
//                     w-full md:w-1/2
//                     transition-all duration-700
//                     ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}
//                   `}
//                 >
//                   <img
//                     src={card.img}
//                     alt={card.title}
//                     className="w-full h-64 md:h-72 object-cover rounded-xl
//                                border border-white/10 shadow-lg"
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Why;
