import logo from "../../assets/logo2.png";

const Dumbbell = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-8 h-8 fill-white"
  >
    <rect x="28" y="10" width="8" height="44" rx="2" />
    <rect x="16" y="14" width="8" height="36" rx="2" />
    <rect x="40" y="14" width="8" height="36" rx="2" />
  </svg>
);

function Footer() {
  const handleHit = (e) => {
    const btn = e.currentTarget;
    btn.classList.remove("hit");
    void btn.offsetWidth; // force reflow
    btn.classList.add("hit");
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Power GYM" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold tracking-wide">
              Power<span className="text-red-600">GYM</span>
            </h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Power GYM is dedicated to helping you build strength, discipline,
            and confidence through professional training and a focused
            environment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-white/70">
            <li><a href="/" className="hover:text-red-500">Home</a></li>
            <li><a href="/programs" className="hover:text-red-500">Programs</a></li>
            <li><a href="/trainer" className="hover:text-red-500">Trainers</a></li>
            <li><a href="/timetable" className="hover:text-red-500">Timetable</a></li>
            <li><a href="/membership" className="hover:text-red-500">Membership</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
            Contact
          </h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>📍 Wagholi, Pune, Maharashtra</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ powergym@email.com</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Power GYM. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
