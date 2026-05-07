import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const API = "https://gym-backend-8aij.onrender.com/api";

const programs = [
  { label: "Strength Training", group: "program" },
  { label: "Weight Loss Program", group: "program" },
  { label: "Personal Training", group: "program" },
  { label: "Functional Training", group: "program" },
  { label: "Cardio & HIIT", group: "program" },
  { label: "Body Transformation", group: "program" },
  { label: "Membership - Monthly Plan", group: "membership" },
  { label: "Membership - Quarterly Plan", group: "membership" },
  { label: "Membership - Yearly Plan", group: "membership" },
];

function JoinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showProgramError, setShowProgramError] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();

  // scroll to form
  useEffect(() => {
    if (location.hash === "#join-form") {
      setTimeout(() => {
        document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  // close dropdown
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    if (!program) { setShowProgramError(true); return; }

    try {
      const response = await fetch(`${API}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, program }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setName("");
      setPhone("");
      setProgram("");
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <section id="join-form" className="bg-black py-20 px-6 select-none">
      <div className="max-w-xl mx-auto">

        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold tracking-widest text-sm">
            GET STARTED
          </span>
          <h2 className="text-4xl font-bold text-white mt-3">
            Join Power<span className="text-red-500">GYM</span>
          </h2>
        </div>

        {submitted ? (
          <div className="bg-[#0b0b0b] border border-green-600/30 rounded-xl p-8 text-center">
            <div className="text-5xl">✅</div>
            <h3 className="text-white text-xl font-bold mt-3">
              Submitted Successfully!
            </h3>
            <p className="text-white/60 text-sm mt-2">
              We will contact you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-white/50 mt-4 text-sm"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b0b0b] border border-white/10 rounded-xl p-8 space-y-5"
          >

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-black border border-white/20 text-white rounded"
            />

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number (10 digits)"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(val);
                }}
                className={`w-full p-3 bg-black border text-white rounded focus:outline-none focus:border-red-600 ${
                  phone.length > 0 && phone.length < 10 ? "border-red-500" : "border-white/20"
                }`}
              />
              {phone.length > 0 && phone.length < 10 && (
                <p className="text-red-400 text-xs mt-1">Enter a valid 10-digit mobile number</p>
              )}
            </div>

            {/* Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full p-3 bg-black border text-left flex justify-between text-white ${
                  showProgramError && !program ? "border-red-500" : "border-white/20"
                }`}
              >
                <span className={program ? "text-white" : "text-white/40"}>
                  {program || "Select Program"}
                </span>
                <ChevronDown />
              </button>
              {showProgramError && !program && (
                <p className="text-red-400 text-xs mt-1">Please select a program or membership</p>
              )}

              {dropdownOpen && (
                <div className="absolute w-full bg-[#111] border border-white/10 mt-1 z-20 max-h-60 overflow-y-auto">

                  <p className="text-xs text-red-500 p-2">Programs</p>
                  {programs
                    .filter((p) => p.group === "program")
                    .map((p) => (
                      <div
                        key={p.label}
                        onClick={() => {
                          setProgram(p.label);
                          setShowProgramError(false);
                          setDropdownOpen(false);
                        }}
                        className="p-2 text-white hover:bg-red-600/20 cursor-pointer"
                      >
                        {p.label}
                      </div>
                    ))}

                  <p className="text-xs text-red-500 p-2 border-t border-white/10">Membership</p>
                  {programs
                    .filter((p) => p.group === "membership")
                    .map((p) => (
                      <div
                        key={p.label}
                        onClick={() => {
                          setProgram(p.label);
                          setShowProgramError(false);
                          setDropdownOpen(false);
                        }}
                        className="p-2 text-white hover:bg-red-600/20 cursor-pointer"
                      >
                        {p.label}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <button className="w-full bg-red-600 text-white p-3 rounded">
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default JoinForm;