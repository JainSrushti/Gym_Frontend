import { useState } from "react";

const trainers = [
  { id: "john", name: "John Abraham", specialty: "Strength & Conditioning" },
  { id: "emma", name: "Emma Singh", specialty: "Weight Loss & HIIT" },
  { id: "raj", name: "Raj Patel", specialty: "Functional Training" },
];

const paymentTypes = [
  { id: "session", label: "Per Session", price: 400 },
  { id: "monthly", label: "Monthly Package", price: 1000 },
];

function TrainerPayment() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const activePrice =
    paymentTypes.find(p => p.id === paymentType)?.price;

  return (
    <section className="bg-black py-16 px-6 select-none">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Personal Trainer Payment
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select your trainer and payment type only after confirming
            availability and session schedule with the gym.
          </p>
        </div>

        {/* Trainer Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {trainers.map(trainer => (
            <div
              key={trainer.id}
              onClick={() => setSelectedTrainer(trainer.id)}
              className={`
                bg-[#0b0b0b] border rounded-xl p-6 text-center cursor-pointer
                transition-all duration-300
                ${selectedTrainer === trainer.id
                  ? "border-red-600 scale-105"
                  : "border-white/10 hover:border-white/30"}
              `}
            >
              <h3 className="text-lg font-semibold text-white mb-1">
                {trainer.name}
              </h3>
              <p className="text-white/60 text-sm">
                {trainer.specialty}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Type */}
        {selectedTrainer && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
            {paymentTypes.map(type => (
              <div
                key={type.id}
                onClick={() => setPaymentType(type.id)}
                className={`
                  bg-[#0b0b0b] border rounded-xl p-5 text-center cursor-pointer
                  transition-all duration-300
                  ${paymentType === type.id
                    ? "border-red-600"
                    : "border-white/10 hover:border-white/30"}
                `}
              >
                <h4 className="text-white font-semibold mb-1">
                  {type.label}
                </h4>
                <p className="text-red-500 font-bold">
                  ₹{type.price} {type.id === "session" ? "/ session" : "/ month"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {selectedTrainer && paymentType && (
          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-6 text-white text-sm">
            <p>
              <span className="font-semibold">Trainer:</span>{" "}
              {trainers.find(t => t.id === selectedTrainer)?.name}
            </p>
            <p>
              <span className="font-semibold">Payment Type:</span>{" "}
              {paymentTypes.find(p => p.id === paymentType)?.label}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              ₹{activePrice}
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
            I have confirmed trainer availability and schedule with the gym
          </label>

          <button
            disabled={!selectedTrainer || !paymentType || !confirmed}
            className={`
              w-full py-3 rounded font-semibold transition
              ${selectedTrainer && paymentType && confirmed
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-600/40 cursor-not-allowed text-white/60"}
            `}
          >
            Proceed to Payment
          </button>

          <p className="text-xs text-white/50 mt-3 text-center">
            Trainer payments are non-refundable once completed.
          </p>
        </div>

      </div>
    </section>
  );
}

export default TrainerPayment;
