import logo from "../../assets/logo2.png";

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[#0b0b0b] text-[#EEEEEE] rounded-xl shadow-xl
                   w-[90%] max-w-md p-6 relative border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Power GYM"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h2 className="text-2xl font-bold text-center">
            Enquire Now
          </h2>
          <p className="text-sm text-white/60 text-center mt-1">
            We’ll get back to you shortly
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded bg-black border border-white/20
                       text-white placeholder-white/40
                       focus:outline-none focus:border-red-600"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 rounded bg-black border border-white/20
                       text-white placeholder-white/40
                       focus:outline-none focus:border-red-600"
          />

          <select
            className="w-full px-4 py-3 rounded bg-black border border-white/20
                       text-white focus:outline-none focus:border-red-600"
          >
            <option value="">Enquiry Type</option>
            <option>Membership</option>
            <option>Training Program</option>
            <option>Personal Trainer</option>
            <option>General Query</option>
          </select>

          <textarea
            rows="3"
            placeholder="Message (optional)"
            className="w-full px-4 py-3 rounded bg-black border border-white/20
                       text-white placeholder-white/40
                       focus:outline-none focus:border-red-600 resize-none"
          />
        </form>

        {/* Submit */}
        <button
          onClick={() => {
            alert("Enquiry submitted successfully!");
            onClose();
          }}
          className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded
                     hover:bg-red-700 transition"
        >
          Submit Enquiry
        </button>

        {/* WhatsApp Option */}
        <a
          href="https://wa.me/919XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-4 text-green-500 font-semibold hover:underline"
        >
          Or chat with us on WhatsApp
        </a>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ContactModal;
