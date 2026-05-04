import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ContactPage() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from offer query param
  useEffect(() => {
    const offer = searchParams.get("offer");
    if (offer) {
      setEnquiryType("Offer Enquiry");
      setMessage(`I am interested in the ${offer} offer. Please share more details.`);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (phone.length !== 10) return;

  const enquiryData = {
    name,
    phone,
    enquiryType,
    message,
  };

  try {
    const response = await fetch("https://gym-backend-8aij.onrender.com/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enquiryData),
    });

    if (response.ok) {
      setSubmitted(true);
      setName(""); setPhone(""); setEnquiryType(""); setMessage("");
    } else {
      console.error("Failed to submit enquiry.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <section className="bg-black py-20 px-6 select-none">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Power-GYM
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Have questions about memberships, programs, or personal training?
            Reach out to us — we’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT: Contact Info */}
          <div className="space-y-8">

            <div className="flex items-start gap-4">
              <Phone className="text-red-600 mt-1" />
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-white/70 text-sm">+91 9XXXXXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-red-600 mt-1" />
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-white/70 text-sm">powergym@email.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-red-600 mt-1" />
              <div>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-white/70 text-sm">
                  Power-GYM, Main Road, Your City
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700
                           text-white font-semibold px-6 py-3 rounded transition"
              >
                <MessageCircle />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-white/50 mt-2">
                Fastest way to reach us
              </p>
            </div>

          </div>

          {/* RIGHT: Enquiry Form */}
          {submitted ? (
            <div className="bg-[#0b0b0b] border border-green-600/30 rounded-xl p-8 text-center space-y-4">
              <div className="text-5xl">✅</div>
              <h3 className="text-white text-xl font-bold">Enquiry Submitted!</h3>
              <p className="text-white/60 text-sm">Thank you! We will contact you soon.</p>
              <button onClick={() => setSubmitted(false)} className="block w-full text-white/40 hover:text-white text-xs mt-2 transition">Submit another</button>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b0b0b] border border-white/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Send an Enquiry
            </h2>

            <label className="block text-white/70 text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full mb-4 px-4 py-3 rounded bg-black border border-white/20
                         text-white placeholder-white/40 focus:outline-none focus:border-red-600"
            />

            <label className="block text-white/70 text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              required
              maxLength={10}
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
              }}
              placeholder="10-digit phone number"
              className={`w-full mb-1 px-4 py-3 rounded bg-black border text-white placeholder-white/40 focus:outline-none focus:border-red-600 ${
                phone.length > 0 && phone.length < 10 ? "border-red-500" : "border-white/20"
              }`}
            />
            {phone.length > 0 && phone.length < 10 && (
              <p className="text-red-400 text-xs mb-3">Enter a valid 10-digit mobile number</p>
            )}
            {!(phone.length > 0 && phone.length < 10) && <div className="mb-4" />}

            <label className="block text-white/70 text-sm mb-2">
              Enquiry Type
            </label>
            <select
              required
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded bg-black border border-white/20
                         text-white focus:outline-none focus:border-red-600"
            >
              <option value="" disabled>Select enquiry type</option>
              <option value="Membership">Membership</option>
              <option value="Offer Enquiry">Offer Enquiry</option>
              <option value="Personal Training">Personal Training</option>
              <option value="Training Program">Training Program</option>
              <option value="Timetable">Timetable</option>
              <option value="Trainer Info">Trainer Info</option>
              <option value="General Query">General Query</option>
            </select>

            <label className="block text-white/70 text-sm mb-2">
              Message
            </label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you are looking for"
              className="w-full mb-6 px-4 py-3 rounded bg-black border border-white/20
                         text-white placeholder-white/40 focus:outline-none focus:border-red-600 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white
                         font-semibold py-3 rounded transition"
            >
              Submit Enquiry
            </button>

            <p className="text-xs text-white/50 mt-4 text-center">
              We usually respond within working hours.
            </p>
          </form>
          )}

        </div>

      </div>
    </section>
  );
}

export default ContactPage;
