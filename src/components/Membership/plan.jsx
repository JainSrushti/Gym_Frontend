import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/membership-plans";

function MembershipPlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  // ✅ FETCH FROM DATABASE
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section className="bg-black py-24 select-none min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">
            MEMBERSHIP
          </span>
          <h2 className="text-4xl font-bold text-white mt-4">
            Choose Your Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id} // ✅ FIXED KEY WARNING
              className={`relative flex flex-col group border rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? "bg-[#0b0b0b] border-red-600 shadow-lg shadow-red-600/20"
                  : "bg-[#0b0b0b] border-white/10 hover:border-red-600"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                  {plan.badge}
                </span>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-1">
                {plan.title}
              </h3>
              <p className="text-white/50 text-sm mb-6">
                {plan.duration} · {plan.bestFor}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40 line-through text-sm mb-1">
                    {plan.originalPrice}
                  </span>
                </div>
                <p className="text-red-400 text-sm font-medium mt-1">
                  {plan.perMonth}
                </p>
              </div>

              <div className="border-t border-white/10 mb-6" />

              {/* ✅ BENEFITS (STRING → ARRAY) */}
              <ul className="space-y-3 mb-8 flex-1">
                {(plan.benefits
                  ? plan.benefits.split(",")
                  : []
                ).map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-white/70 text-sm"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </span>
                    {benefit.trim()}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() =>
                  navigate(`/join?plan=Membership - ${plan.title}`)
                }
                className="w-full py-3 rounded-lg font-semibold border border-white/20 text-white/50 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MembershipPlans;