import { useEffect, useState } from "react";

function OfferCard({ offer, visible }) {
  const [hovered, setHovered] = useState(false);
  const details = typeof offer.details === "string"
    ? offer.details.split(",").map(d => d.trim())
    : offer.details || [];

  return (
    <div
      style={{
        transform: visible ? "translateX(0)" : "translateX(140px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-64 bg-black/60 backdrop-blur-md border border-white/10 hover:border-red-500 rounded-2xl overflow-visible cursor-default transition-colors duration-300 mt-4 offer-card-glow"
    >
      {/* Title badge on top border */}
      <div className="absolute -top-3.5 left-4 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30 whitespace-nowrap">
          {offer.tag}
        </span>
      </div>

      {/* Default content */}
      <div className="p-5 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{offer.icon}</span>
          <span className="text-red-400 text-sm font-bold tracking-widest">{offer.title}</span>
        </div>
        <div className="h-px bg-gradient-to-r from-red-600/50 to-transparent mb-3" />
        <p className="text-white/55 text-xs leading-relaxed">{offer.desc}</p>
        <a
          href={`/contact?offer=${encodeURIComponent(offer.title)}`}
          className="block mt-2 w-full text-center border border-white/20 hover:border-red-500 text-white/60 hover:text-white text-xs py-1.5 rounded-lg transition duration-300"
        >
          Enquire Now
        </a>
      </div>

      {/* Expanded content on hover */}
      <div style={{ maxHeight: hovered ? "400px" : "0px", transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)", overflow: "hidden", borderRadius: "0 0 1rem 1rem" }}>
        <div className="px-5 pb-5 space-y-3">
          <div className="h-px bg-white/10" />
          <div className="bg-red-600/15 border border-red-600/30 rounded-lg px-3 py-2">
            <p className="text-red-400 text-xs font-bold break-words">{offer.price}</p>
          </div>
          <ul className="space-y-1.5">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-white/65 text-xs leading-relaxed">
                <span className="text-red-500 mt-0.5 shrink-0">✓</span>
                <span className="break-words min-w-0">{d}</span>
              </li>
            ))}
          </ul>
          {offer.urgent && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-semibold">Limited time — Act fast!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Intro() {
  const [offers, setOffers]   = useState([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/offers")
      .then(res => res.json())
      .then(data => setOffers(Array.isArray(data) ? data : []))
      .catch(err => console.error("Offers fetch error:", err));
  }, []);

  useEffect(() => {
    setVisible(offers.map(() => false));
    const timers = offers.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
      }, 300 + i * 220)
    );
    return () => timers.forEach(clearTimeout);
  }, [offers]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      <video className="absolute inset-0 w-full h-full object-cover" src="https://www.pexels.com/download/video/5319099/" autoPlay loop muted playsInline />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">Welcome to Power GYM</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-wide">
              Unleash Your <br /><span className="text-red-500">Power</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
              Power GYM is where discipline meets strength. Train with purpose,
              stay consistent, and build real power in a focused environment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/membership" className="inline-block bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition duration-300">View Memberships</a>
              <a href="/about" className="inline-block border border-white/30 text-white px-8 py-3 rounded font-semibold hover:border-white transition duration-300">Learn More</a>
            </div>
          </div>

          {/* RIGHT — Offer Cards */}
          <div className="flex gap-4 items-start justify-end">
            {offers.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} visible={visible[i] || false} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Intro;
