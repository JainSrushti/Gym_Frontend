import { useState } from "react";

const DEFAULT_TRAINERS = [
  {
    id: "rahul-sharma",
    name: "Rahul Sharma",
    photo: "https://img.freepik.com/premium-photo/young-black-personal-trainer-gym-smiling-with-crossed-arms_641878-388.jpg?w=996",
    experience: "6+ years", experienceYears: 6,
    specialization: "Strength & Muscle Building",
    bio: "Focused on progressive overload and sustainable muscle growth. Works closely with beginners and intermediate lifters with emphasis on correct form.",
    bestFor: ["Beginners", "Strength training", "Muscle gain"],
    programsHandled: ["Strength Training", "Personal Training", "Body Recomposition"],
    availability: "Morning & Evening",
  },
  {
    id: "siddhesh-jadhav",
    name: "Siddhesh Jadhav",
    photo: "https://img.freepik.com/premium-photo/handsome-athletic-man-smiling-looking-camera-fitness-trainer-gym-jock_826801-5741.jpg?w=900",
    experience: "4+ years", experienceYears: 4,
    specialization: "Weight Loss & HIIT",
    bio: "Specializes in fat loss programs using functional training and high-intensity workouts to help members stay consistent and motivated.",
    bestFor: ["Weight loss", "Fat loss programs", "Group training"],
    programsHandled: ["Weight Loss Program", "HIIT", "Functional Training"],
    availability: "Morning & Evening",
  },
  {
    id: "amit-patel",
    name: "Amit Patel",
    photo: "https://img.freepik.com/premium-photo/young-black-personal-trainer-gym-smiling-with-crossed-arms_641878-387.jpg?w=996",
    experience: "8+ years", experienceYears: 8,
    specialization: "Cardio, Yoga & Mobility",
    bio: "Experienced in cardiovascular conditioning, yoga, and pilates with focus on flexibility, endurance, and overall wellness.",
    bestFor: ["Cardio fitness", "Flexibility", "Recovery training"],
    programsHandled: ["Cardio Training", "Yoga", "Pilates"],
    availability: "Morning & Evening",
  },
];

export function loadTrainers() {
  try {
    const s = localStorage.getItem("admin_trainers");
    return s ? JSON.parse(s) : DEFAULT_TRAINERS;
  } catch {
    return DEFAULT_TRAINERS;
  }
}

function toArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val) return val.split(",").map((s) => s.trim());
  return [];
}

function TrainerCard({ trainer }) {
  const [hovered, setHovered] = useState(false);
  const bestFor   = toArray(trainer.bestFor);
  const programs  = toArray(trainer.programsHandled);
  const noPhoto   = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='16' font-family='sans-serif'%3ENo Photo%3C/text%3E%3C/svg%3E";

  return (
    <div
      className="bg-[#0b0b0b] border border-white/10 rounded-xl transition-all duration-500 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={trainer.photo || noPhoto}
          alt={trainer.name}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Always visible */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
        <p className="text-red-400 text-sm font-medium mt-1">{trainer.specialization}</p>
        <p className="text-gray-400 text-sm mt-1">{trainer.experience} experience</p>
      </div>

      {/* Scrollable detail panel */}
      <div
        style={{ height: hovered ? "220px" : "0px", transition: "height 0.4s ease" }}
        className="overflow-y-auto border-t border-white/10"
      >
        <div className="px-5 py-4 space-y-3">
  <p className="text-sm text-gray-300">
    <span className="text-white font-medium">Availability:</span>{" "}
    {trainer.availability}
  </p>

  {trainer.bio && (
    <p className="text-gray-400 text-xs leading-relaxed">
      {trainer.bio}
    </p>
  )}

  {/* Best For (string safe) */}
  {trainer.bestFor && (
    <div>
      <p className="text-white text-xs font-semibold mb-1">Best For</p>
      <div className="flex flex-wrap gap-1">
        {trainer.bestFor.split(",").map((item, i) => (
          <span
            key={i}
            className="bg-red-600/20 text-red-400 text-xs px-2 py-0.5 rounded"
          >
            {item.trim()}
          </span>
        ))}
      </div>
    </div>
  )}

  {/* Programs (string safe) */}
  {trainer.programsHandled && (
    <div>
      <p className="text-white text-xs font-semibold mb-1">
        Programs
      </p>
      <div className="flex flex-wrap gap-1">
        {trainer.programsHandled.split(",").map((p, i) => (
          <span
            key={i}
            className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded"
          >
            {p.trim()}
          </span>
        ))}
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
}

function TrainerList() {
  const [filter, setFilter] = useState("All");
  const trainers = loadTrainers();
  const filters = ["All", "2+ Years", "4+ Years", "6+ Years"];

  const filtered = trainers.filter((t) => {
    if (filter === "All") return true;
    if (filter === "2+ Years") return t.experienceYears >= 2;
    if (filter === "4+ Years") return t.experienceYears >= 4;
    if (filter === "6+ Years") return t.experienceYears >= 6;
    return true;
  });

  return (
    <section id="trainers" className="bg-black py-24 px-6 select-none">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">TRAINERS</span>
          <h1 className="text-4xl font-bold text-white mt-4 mb-6">Meet Our Trainers</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Certified professionals focused on disciplined and result-driven training.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded border text-sm font-semibold transition ${
                filter === item
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-white/20 text-white/70 hover:border-red-600 hover:text-white"
              }`}>
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filtered.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainerList;
