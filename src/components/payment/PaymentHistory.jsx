import { useState } from "react";

const mockHistory = [
  { date: "01 Jan 2026", type: "Membership", amount: "₹2000", status: "Paid" },
  { date: "10 Jan 2026", type: "Program", amount: "₹500", status: "Paid" },
  { date: "15 Jan 2026", type: "Trainer", amount: "₹1000", status: "Paid" },
];

function PaymentHistory() {
  const [phone, setPhone] = useState("");
  const [txnId, setTxnId] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <section className="bg-black py-16 px-6 select-none">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Payment History
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            View your past payments using your registered phone number.
            No login required.
          </p>
        </div>

        {/* Lookup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-10"
        >
          <label className="block text-white/70 text-sm mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit phone number"
            className="w-full mb-4 px-4 py-3 rounded bg-black border border-white/20
                       text-white placeholder-white/40 focus:outline-none focus:border-red-600"
          />

          <label className="block text-white/70 text-sm mb-2">
            Transaction ID (optional)
          </label>
          <input
            type="text"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            placeholder="Transaction reference"
            className="w-full mb-6 px-4 py-3 rounded bg-black border border-white/20
                       text-white placeholder-white/40 focus:outline-none focus:border-red-600"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition"
          >
            Show Payment History
          </button>
        </form>

        {/* Results */}
        {showResults && (
          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 overflow-x-auto">

            <table className="w-full text-left text-sm text-white">
              <thead className="bg-[#111] text-white/80">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold
                                       bg-green-600/20 text-green-400">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-6">
              <button
                type="button"
                className="border-2 border-red-600 text-white px-6 py-2 rounded
                           hover:bg-red-600 transition font-semibold"
              >
                Download Receipt
              </button>
              <p className="text-xs text-white/50 mt-2">
                Receipt will be downloaded as PDF
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default PaymentHistory;
