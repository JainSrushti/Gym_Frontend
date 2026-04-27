import React from "react";

function PaymentIntro() {
  return (
    <section className="w-full bg-black py-16 px-6 select-none">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-4">
            Payments & Memberships
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            This page allows you to make payments for gym memberships, training programs,
            and personal trainer sessions at <span className="text-white font-semibold">Power-GYM</span>.
            Please proceed carefully and only after confirming details with our staff.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">
              Membership Payments
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Choose a suitable membership plan based on your goals, schedule,
              and duration discussed with the gym team.
            </p>
          </div>

          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">
              Program Payments
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Make payments for specific fitness programs such as weight loss,
              strength training, or transformation plans after understanding the structure.
            </p>
          </div>

          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">
              Personal Trainer Payments
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Trainer payments should be made only after confirming trainer availability,
              session type, and schedule with the assigned trainer.
            </p>
          </div>

        </div>

        {/* Warning Box */}
        <div className="bg-[#0b0b0b] border border-red-600/60 rounded-xl p-6 md:p-8">
          <h4 className="text-red-500 font-semibold mb-3 text-lg">
            Important Notice
          </h4>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Before making any payment, please confirm all details related to memberships,
            programs, or trainers directly with the gym staff.
            <br /><br />
            Payments made without prior confirmation may lead to scheduling or service issues.
            <span className="text-red-500 font-semibold">
              {" "}All payments are non-refundable once processed.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

export default PaymentIntro;
