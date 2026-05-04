import { useState } from "react";

function JobForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialization: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://gym-backend-8aij.onrender.com/api/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", specialization: "", experience: "" });
    } catch (error) {
      console.error("Submit failed:", error);
    }
  }

  return (
    <section className="bg-black min-h-screen py-24 px-6 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex justify-center">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.3yYbXvuLFhVj1jmc1glbjAHaHa?pid=ImgDetMain"
            alt="Trainer Application"
            className="w-full max-w-md rounded-xl border border-white/10 shadow-xl opacity-90"
          />
        </div>

        {/* RIGHT */}
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
                Join Power GYM as a certified trainer and help members achieve real,
                sustainable fitness results through disciplined training.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name",            key: "name",           type: "text" },
                  { label: "Email Address",        key: "email",          type: "email" },
                  { label: "Phone Number",         key: "phone",          type: "tel" },
                  { label: "Specialization",       key: "specialization", type: "text" },
                  { label: "Years of Experience",  key: "experience",     type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm text-white/80 mb-2">{label}</label>
                    <input type={type} value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
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

export default JobForm;
