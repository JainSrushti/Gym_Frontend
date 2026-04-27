import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Enquiry Submitted Successfully!");
    alert(`Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);

    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-20 select-none">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT: FORM */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-10 shadow-xl flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
              Enquire Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded bg-black border border-white/20
                             text-white placeholder-white/40
                             focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded bg-black border border-white/20
                             text-white placeholder-white/40
                             focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full p-3 rounded bg-black border border-white/20
                             text-white placeholder-white/40
                             focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 rounded
                           hover:bg-red-700 transition duration-300"
              >
                Submit Enquiry
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT: VISUAL / INFO */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-10 flex items-center justify-center">
          <div className="text-center">
                <img
  src="https://www.rsproducts.net/images/enquiry.png"
  alt="Gym Enquiry"
  className="
    w-full
    max-w-xs
    sm:max-w-sm
    md:max-w-md
    lg:max-w-lg
    h-auto
    mx-auto
    mb-6
    opacity-90
  "
/>


            <h3 className="text-2xl font-semibold text-white mb-3">
              We’re Here to Help
            </h3>

            <p className="text-white/70 max-w-sm">
              Have questions about training, memberships, or timings?
              Fill out the form and our team will get back to you shortly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactForm;
