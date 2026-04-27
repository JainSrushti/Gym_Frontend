import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo2.png";
import { useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Trainers", path: "/trainer" },
    { name: "Timetable", path: "/timetable" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Membership", path: "/membership" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4  flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Power GYM" className="w-20 h-20 rounded-full" />
          <h1 className="text-2xl font-bold tracking-wide">
            Power<span className="text-red-600">GYM</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`text-sm uppercase tracking-wide transition relative pb-0.5 ${
                  active
                    ? "text-red-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                    : "text-white/80 hover:text-red-500"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/join" className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200 transition">
            Join Now
          </a>
          <a href="/contact" className="bg-red-600 px-5 py-2 rounded font-semibold hover:bg-red-700 transition">
            Enquire Now
          </a>
        </div>

        <a href="/admin" className="hidden md:block border border-gray-600 text-gray-400 hover:border-red-600 hover:text-white px-4 py-2 rounded text-xs font-semibold transition">
          Admin Login
        </a>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 border border-white/20 rounded"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`uppercase tracking-wide transition border-b-2 pb-1 ${
                  active
                    ? "text-red-500 border-red-500"
                    : "text-white/80 hover:text-red-500 border-transparent"
                }`}
              >
                {item.name}
              </a>
            );
          })}

          <a href="/join" onClick={() => setMenuOpen(false)} className="mt-1 border border-white text-white py-2 rounded font-semibold hover:bg-white hover:text-black transition text-center block">
            Join Now
          </a>
          <a href="/contact" className="mt-1 bg-red-600 py-2 rounded font-semibold hover:bg-red-700 text-center block">
            Enquire Now
          </a>
          <a href="/admin" onClick={() => setMenuOpen(false)} className="mt-1 border border-gray-600 text-gray-400 py-2 rounded text-xs font-semibold hover:border-red-600 hover:text-white transition text-center block">
            Admin Login
          </a>
        </div>
      )}

    </header>
  );
}

export default Header;
