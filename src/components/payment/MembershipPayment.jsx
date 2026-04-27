import { useState } from "react";

const plans = [
  { id: "monthly", name: "Monthly", duration: "1 Month", price: "₹2000" },
  { id: "quarterly", name: "Quarterly", duration: "3 Months", price: "₹5500" },
  { id: "annual", name: "Annual", duration: "12 Months", price: "₹20000" },
];

function MembershipPayment() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const activePlan = plans.find(p => p.id === selectedPlan);

  return (
    <section className="bg-black py-16 px-6 select-none">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Membership Payment
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select a membership plan after confirming duration, pricing,
            and availability with the gym staff.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {plans.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                bg-[#0b0b0b] border rounded-xl p-6 text-center cursor-pointer
                transition-all duration-300
                ${selectedPlan === plan.id
                  ? "border-red-600 scale-105"
                  : "border-white/10 hover:border-white/30"}
              `}
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-white/60 text-sm mb-2">
                {plan.duration}
              </p>
              <p className="text-red-500 font-bold text-lg">
                {plan.price}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        {activePlan && (
          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-8">
            <p className="text-white text-sm">
              <span className="font-semibold">Selected Plan:</span> {activePlan.name}<br />
              <span className="font-semibold">Duration:</span> {activePlan.duration}<br />
              <span className="font-semibold">Price:</span> {activePlan.price}
            </p>
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
            I have confirmed all membership details with the gym
          </label>

          <button
            disabled={!selectedPlan || !confirmed}
            className={`
              w-full py-3 rounded font-semibold transition
              ${selectedPlan && confirmed
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-600/40 cursor-not-allowed text-white/60"}
            `}
          >
            Proceed to Payment
          </button>

          <p className="text-xs text-white/50 mt-3 text-center">
            Payments are non-refundable once processed.
          </p>
        </div>

      </div>
    </section>
  );
}

export default MembershipPayment;
