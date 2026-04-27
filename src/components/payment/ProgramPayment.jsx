import { useState } from "react";

const programs = [
  { id: "strength", name: "Strength Training", duration: "8 Weeks", price: "₹3500" },
  { id: "weightloss", name: "Weight Loss Program", duration: "10 Weeks", price: "₹4000" },
  { id: "bodytrans", name: "Body Transformation", duration: "12 Weeks", price: "₹5000" },
  { id: "crossfit", name: "CrossFit / Functional Training", duration: "6 Weeks", price: "₹3000" },
];

function ProgramPayment() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const activeProgram = programs.find(p => p.id === selectedProgram);

  return (
    <section className="bg-black py-16 px-6 select-none">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Program Payment
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select a training program after confirming batch timing and
            availability with the gym.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {programs.map(program => (
            <div
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={`
                bg-[#0b0b0b] border rounded-xl p-6 text-center cursor-pointer
                transition-all duration-300
                ${selectedProgram === program.id
                  ? "border-red-600 scale-105"
                  : "border-white/10 hover:border-white/30"}
              `}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {program.name}
              </h3>
              <p className="text-white/60 text-sm mb-1">
                Duration: {program.duration}
              </p>
              <p className="text-red-500 font-bold">
                {program.price}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        {activeProgram && (
          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-8 text-sm text-white">
            <p><span className="font-semibold">Program:</span> {activeProgram.name}</p>
            <p><span className="font-semibold">Duration:</span> {activeProgram.duration}</p>
            <p><span className="font-semibold">Price:</span> {activeProgram.price}</p>
          </div>
        )}

        {/* Confirmation */}
        <div className="max-w-md mx-auto">
          <label className="flex items-center gap-3 text-white/80 text-sm mb-4">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={e => setConfirmed(e.target.checked)}
              className="accent-red-600 w-4 h-4"
            />
            I have confirmed program schedule and batch timing with the gym
          </label>

          <button
            disabled={!selectedProgram || !confirmed}
            className={`
              w-full py-3 rounded font-semibold transition
              ${selectedProgram && confirmed
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-600/40 cursor-not-allowed text-white/60"}
            `}
          >
            Proceed to Payment
          </button>

          <p className="text-xs text-white/50 mt-3 text-center">
            Program fees are non-refundable once payment is completed.
          </p>
        </div>

      </div>
    </section>
  );
}

export default ProgramPayment;
