import { useEffect, useState } from "react";

function OfferCard({ offer, visible }) {
  const [hovered, setHovered] = useState(false);
  const details = typeof offer.details === "string"
    ? offer.details.split(",").map(d => d.trim())
    : offer.details || [];

  return (
    <div
      style={{
        transform: visible ? "translateX(0)" : "translateX(100px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-black/60 backdrop-blur-md border border-white/10 hover:border-red-500 rounded-2xl overflow-visible cursor-default transition-colors duration-300 mt-4"
    >
      {/* Tag badge */}
      <div className="absolute -top-3.5 left-4 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-red-600/30 whitespace-nowrap">
          {offer.tag}
        </span>
      </div>

      {/* Default content */}
      <div className="p-4 pt-6 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{offer.icon}</span>
          <span className="text-red-400 text-xs font-bold tracking-widest">{offer.title}</span>
        </div>
        <div className="h-px bg-gradient-to-r from-red-600/50 to-transparent mb-2" />
        <p className="text-white/55 text-xs leading-relaxed line-clamp-2">{offer.desc}</p>
        <a
          href={`/contact?offer=${encodeURIComponent(offer.title)}`}
          className="block mt-3 w-full text-center border border-white/20 hover:border-red-500 text-white/60 hover:text-white text-xs py-1.5 rounded-lg transition duration-300"
        >
          Enquire Now
        </a>
      </div>

      {/* Expanded on hover */}
      <div style={{ maxHeight: hovered ? "400px" : "0px", transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)", overflow: "hidden" }}>
        <div className="px-4 pb-4 space-y-2">
          <div className="h-px bg-white/10" />
          <div className="bg-red-600/15 border border-red-600/30 rounded-lg px-3 py-2">
            <p className="text-red-400 text-xs font-bold">{offer.price}</p>
          </div>
          <ul className="space-y-1">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-white/65 text-xs leading-relaxed">
                <span className="text-red-500 shrink-0">✓</span>{d}
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

function MobileCarousel({ offers, visible }) {
  const [index, setIndex] = useState(0);
  if (!offers.length) return null;
  return (
    <div className="md:hidden relative">
      <div className="overflow-hidden">
        <OfferCard offer={offers[index]} visible={visible[index] || false} />
      </div>
      {/* Arrows */}
      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-red-500 transition"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {offers.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full transition ${
              i === index ? "bg-red-500" : "bg-white/30"
            }`} />
          ))}
        </div>
        <button
          onClick={() => setIndex(i => Math.min(offers.length - 1, i + 1))}
          disabled={index === offers.length - 1}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-red-500 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function Intro() {
  const [offers,  setOffers]  = useState([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    fetch("https://gym-backend-8aij.onrender.com/api/offers")
      .then(r => r.json())
      .then(data => setOffers(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!offers.length) return;
    setVisible(offers.map(() => false));
    const timers = offers.map((_, i) =>
      setTimeout(() => {
        setVisible(prev => { const next = [...prev]; next[i] = true; return next; });
      }, 400 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [offers]);

  return (
    <section className="relative w-full bg-black select-none overflow-x-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/5319099/"
        autoPlay loop muted playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-0 md:min-h-screen md:flex md:items-center">
        <div className="w-full flex flex-col md:flex-row md:gap-10 md:items-center">

          {/* LEFT — always fully visible */}
          <div className="md:w-1/2 space-y-5 shrink-0">
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">
              Welcome to Power GYM
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-wide">
              Unleash Your <br />
              <span className="text-red-500">Power</span>
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
              Power GYM is where discipline meets strength. Train with purpose,
              stay consistent, and build real power in a focused environment.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="/membership" className="inline-block bg-red-600 text-white px-5 py-2 rounded font-semibold hover:bg-red-700 transition text-sm">
                View Memberships
              </a>
              <a href="/about" className="inline-block border border-white/30 text-white px-5 py-2 rounded font-semibold hover:border-white transition text-sm">
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT — horizontal scroll on mobile, grid on desktop */}
          <div className="md:w-1/2 mt-8 md:mt-0">

            {/* Mobile: one card at a time with arrows */}
            <MobileCarousel offers={offers} visible={visible} />

            {/* Desktop: 3-col grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 items-start">
              {offers.map((offer, i) => (
                <OfferCard key={offer.id || i} offer={offer} visible={visible[i] || false} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Intro;
