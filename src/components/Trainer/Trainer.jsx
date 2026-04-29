import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080/api/gym-trainers";

async function loadTrainers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch trainers");
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

function TrainerCard({ trainer }) {
  return (
    <div className="group relative bg-[#0b0b0b] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/10 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={trainer.photo || "https://via.placeholder.com/400x300?text=No+Photo"}
          alt={trainer.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Normal Card */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
        <p className="text-red-400 text-sm font-medium mt-1">{trainer.specialty}</p>
        <p className="text-gray-400 text-sm mt-1">{trainer.experience}</p>
        <p className="text-gray-500 text-sm mt-1">{trainer.availability}</p>
      </div>

      {/* Hover Card */}
      <div className="absolute inset-0 bg-black/90 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
        <p className="text-red-400 text-sm font-semibold mb-3">{trainer.specialty}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-red-500 font-bold">⏱</span>
            <span>{trainer.experience} of experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-red-500 font-bold">🕐</span>
            <span>Availability: {trainer.availability}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-3">{trainer.bio}</p>

        {trainer.bestFor && (
          <p className="text-white text-sm">
            <span className="font-semibold text-red-500">Best For:</span> {trainer.bestFor}
          </p>
        )}

        {trainer.programsHandled && (
          <p className="text-white text-sm mt-2">
            <span className="font-semibold text-red-500">Programs:</span> {trainer.programsHandled}
          </p>
        )}

        <br />
        <a
          href={`https://wa.me/91${trainer.phoneNumber}?text=Hi%20${encodeURIComponent(trainer.name)},%20I%20want%20to%20talk%20about%20training.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white text-center px-3 py-1.5 text-sm rounded-md hover:bg-green-700 transition mr-3"
        >
          Talk to Trainer
        </a>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-black text-white py-24 px-6 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-red-600 font-semibold tracking-widest">OUR COACHES</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Meet Our <span className="text-red-600">Expert Trainers</span>
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Our certified trainers are committed to your progress. With structured programs,
            personalized attention, and disciplined coaching, they help you train smarter and
            achieve real results.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#trainers" className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700 transition">
              View Trainers
            </a>
            <a href="/contact" className="border border-white/30 px-6 py-3 rounded hover:border-red-600 transition">
              Talk to a Trainer
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/10 rounded-xl blur-2xl" />
          <img
            src="https://img.freepik.com/premium-photo/male-african-american-trains-sport-equipment-gym-red-balck-light-gym-background_116317-21466.jpg?w=740"
            alt="Trainer Coaching"
            className="relative w-150 h-80 object-cover max-w-md mx-auto rounded-xl border border-white/10 shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

// ─── TrainerList ──────────────────────────────────────────────────────────────
function TrainerList() {
  const [filter, setFilter] = useState("All");
  const [trainers, setTrainers] = useState([]);

  // ✅ FIXED: Always fetch from API, never localStorage
  useEffect(() => {
    loadTrainers().then((data) => setTrainers(data));
  }, []);

  const filters = ["All", "2+ Years", "4+ Years", "6+ Years"];

  const parseYears = (exp) => {
    if (!exp) return 0;
    const match = String(exp).match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const filtered = trainers.filter((t) => {
    const years = parseYears(t.experience || t.experienceYears);
    if (filter === "All") return true;
    if (filter === "2+ Years") return years >= 2;
    if (filter === "4+ Years") return years >= 4;
    if (filter === "6+ Years") return years >= 6;
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
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded border text-sm font-semibold transition ${
                filter === item
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-white/20 text-white/70 hover:border-red-600 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-white/50">No trainers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── ClientReview ─────────────────────────────────────────────────────────────
const REVIEWS = [
  { review: "Working with Trainer Alex has been a game-changer! His personalized approach and unwavering support helped me achieve my fitness goals faster than expected.", title: "Emily R.", desc: "Client since 2022", img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg" },
  { review: "Trainer Sarah's expertise and motivation pushed me beyond my limits. Her structured workouts transformed both my body and mindset.", title: "Michael T.", desc: "Client since 2021", img: "https://img.freepik.com/premium-photo/users-rate-their-service-experience-online-application-customer-satisfaction-survey-concept_150418-1584.jpg" },
  { review: "Trainer David's guidance and discipline helped me stay consistent. I've never felt stronger or more confident.", title: "Sophia L.", desc: "Client since 2023", img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg" },
  { review: "Trainer Mark's structured programs and progress tracking made a massive difference in my health and confidence.", title: "David W.", desc: "Client since 2020", img: "https://img.freepik.com/premium-photo/users-rate-their-service-experience-online-application-customer-satisfaction-survey-concept_150418-1584.jpg" },
  { review: "Trainer Emily helped me push past limits I never thought possible. The results speak for themselves.", title: "Olivia M.", desc: "Client since 2022", img: "https://static.vecteezy.com/system/resources/previews/013/936/728/non_2x/businessman-giving-rating-with-hand-touching-virtual-screen-customer-experience-concept-customer-service-and-satisfaction-feedback-concept-free-photo.jpg" },
];

function ClientReview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((p) => (p + 1) % REVIEWS.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black w-full py-24 select-none overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
        What Clients Say About Our Trainers
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {REVIEWS.map((card, index) => {
            const isActive = index === currentIndex;
            return (
              <div key={index} className="w-full shrink-0 flex flex-col md:flex-row items-center px-6 md:px-16 gap-10">
                <div className={`w-full md:w-1/2 space-y-4 transition-all duration-700 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
                  <p className="text-red-600 font-semibold tracking-wide">VERIFIED CLIENT</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.desc}</p>
                  <p className="text-white/80 text-lg leading-relaxed">"{card.review}"</p>
                  <a href="/trainers" className="inline-block mt-4 border border-red-600 text-red-500 px-6 py-3 rounded font-semibold hover:bg-red-600 hover:text-white transition">
                    View Trainers
                  </a>
                </div>
                <div className={`w-full md:w-1/2 transition-all duration-700 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
                  <img src={card.img} alt={card.title} className="w-full h-64 md:h-72 object-cover rounded-xl border border-white/10 shadow-lg" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── JobForm ──────────────────────────────────────────────────────────────────
function JobForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialty: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/trainer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", specialty: "", experience: "" });
    } catch {
      console.error("Submit failed");
    }
  }

  return (
    <section className="bg-black min-h-screen py-24 px-6 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="hidden md:flex justify-center">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.3yYbXvuLFhVj1jmc1glbjAHaHa?pid=ImgDetMain"
            alt="Trainer Application"
            className="w-full max-w-md rounded-xl border border-white/10 shadow-xl opacity-90"
          />
        </div>
        <div className="border border-white/10 rounded-xl p-8 shadow-xl">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="text-5xl">✅</div>
              <h3 className="text-white text-2xl font-bold">Application Submitted!</h3>
              <p className="text-white/60 text-sm">Thank you! We will contact you soon.</p>
              <button onClick={() => setSubmitted(false)} className="block w-full text-white/40 hover:text-white text-xs mt-2 transition">Submit another</button>
            </div>
          ) : (
            <>
              <span className="text-red-600 font-semibold tracking-widest block mb-2">CAREERS</span>
              <h2 className="text-3xl font-bold text-white mb-6">Apply as a Trainer</h2>
              <p className="text-white/70 mb-8">
                Join Power GYM as a certified trainer and help members achieve real, sustainable fitness results.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name",           key: "name",       type: "text" },
                  { label: "Email Address",        key: "email",      type: "email" },
                  { label: "Phone Number",         key: "phone",      type: "tel" },
                  { label: "Specialization",       key: "specialty",  type: "text" },
                  { label: "Years of Experience",  key: "experience", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm text-white/80 mb-2">{label}</label>
                    <input
                      type={type} value={form[key]} required
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full p-3 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                ))}
                <button type="submit" className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition">
                  Submit Application
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── TrainerDetails ───────────────────────────────────────────────────────────
function TrainerDetails() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    loadTrainers().then((data) => {
      const found = data.find((t) => String(t.id) === String(id));
      setTrainer(found);
    });
  }, [id]);

  if (!trainer) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Trainer not found.</p>
      </section>
    );
  }

  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
          <div className="md:col-span-1">
            <img src={trainer.photo} alt={trainer.name} className="w-full h-80 object-cover rounded-xl border border-white/10" />
          </div>
          <div className="md:col-span-2">
            <span className="text-red-600 font-semibold tracking-widest">TRAINER PROFILE</span>
            <h1 className="text-4xl font-bold text-white mt-4 mb-4">{trainer.name}</h1>
            <p className="text-white/70 mb-2"><span className="text-white font-medium">Specialization:</span> {trainer.specialty}</p>
            <p className="text-white/70 mb-6"><span className="text-white font-medium">Experience:</span> {trainer.experience}</p>
            <p className="text-white/70 text-lg leading-relaxed">{trainer.bio}</p>
          </div>
        </div>
        <Link to="/programs" className="border border-white/20 text-white px-8 py-3 rounded hover:border-red-600 transition">
          View Programs
        </Link>
      </div>
    </section>
  );
}

// ─── Main Trainer Page ────────────────────────────────────────────────────────
function Trainer() {
  return (
    <div className="trainer">
      <Hero />
      <TrainerList />
      <ClientReview />
      <JobForm />
    </div>
  );
}

export { TrainerDetails };
export default Trainer;
