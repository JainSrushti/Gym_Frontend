import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const programs = [
  { label: "Strength Training",          group: "program" },
  { label: "Weight Loss Program",         group: "program" },
  { label: "Personal Training",           group: "program" },
  { label: "Functional Training",         group: "program" },
  { label: "Cardio & HIIT",               group: "program" },
  { label: "Body Transformation",         group: "program" },
  { label: "Membership - Monthly Plan",   group: "membership" },
  { label: "Membership - Quarterly Plan", group: "membership" },
  { label: "Membership - Yearly Plan",    group: "membership" },
];

function JoinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const preSelected = new URLSearchParams(location.search).get("plan") || "";
  const [program, setProgram] = useState(preSelected);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (location.hash === "#join-form") {
      setTimeout(() => {
        document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!program) {
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        program: program,
      }),
    });

    if (!response.ok) throw new Error("Failed to submit");
    setSubmitted(true);
    setName(""); setPhone(""); setProgram("");
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <section id="join-form" className="bg-black py-20 px-6 select-none">
      <div className="max-w-xl mx-auto">

        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold tracking-widest text-sm">GET STARTED</span>
          <h2 className="text-4xl font-bold text-white mt-3">Join Power<span className="text-red-500">GYM</span></h2>
          <p className="text-white/60 mt-3 text-sm">Fill in your details and we'll get you started on your fitness journey.</p>
        </div>

        {submitted ? (
          <div className="bg-[#0b0b0b] border border-green-600/30 rounded-xl p-8 text-center space-y-4">
            <div className="text-5xl">✅</div>
            <h3 className="text-white text-xl font-bold">Submitted Successfully!</h3>
            <p className="text-white/60 text-sm">Thank you! We will contact you soon.</p>
            <button onClick={() => setSubmitted(false)} className="block w-full text-white/40 hover:text-white text-xs mt-2 transition">Submit another</button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b0b0b] border border-white/10 rounded-xl p-8 space-y-5"
          >
          {/* Name */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Contact Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              className="w-full px-4 py-3 rounded bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Program dropdown */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Select Program</label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-full px-4 py-3 rounded bg-black border border-white/20 text-left flex items-center justify-between focus:outline-none focus:border-red-600"
              >
                <span className={program ? "text-white" : "text-white/40"}>
                  {program || "Select Program"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <ul className="absolute top-full left-0 w-full mt-1 bg-[#111] border border-white/10 rounded-lg overflow-hidden z-20 shadow-xl">
                  <li className="px-4 py-2 text-xs font-bold text-red-500 uppercase tracking-widest bg-[#0a0a0a]">
                    Programs
                  </li>
                  {programs.filter((p) => p.group === "program").map((p) => (
                    <li key={p.label} onClick={() => { setProgram(p.label); setDropdownOpen(false); }}
                      className={`px-4 py-3 text-sm cursor-pointer transition ${
                        program === p.label ? "bg-red-600 text-white" : "text-gray-300 hover:bg-red-600/20 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </li>
                  ))}
                  <li className="px-4 py-2 text-xs font-bold text-red-500 uppercase tracking-widest bg-[#0a0a0a] border-t border-white/10">
                    Membership Plans
                  </li>
                  {programs.filter((p) => p.group === "membership").map((p) => (
                    <li key={p.label} onClick={() => { setProgram(p.label); setDropdownOpen(false); }}
                      className={`px-4 py-3 text-sm cursor-pointer transition ${
                        program === p.label ? "bg-red-600 text-white" : "text-gray-300 hover:bg-red-600/20 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition"
          >
            Submit
          </button>
          </form>
        )}

      </div>
    </section>
  );
}

export default JoinForm;
