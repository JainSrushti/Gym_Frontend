import { useEffect, useState } from "react";
import equipmentData from "./Equipments.json";

const equipmentSections = equipmentData.equipmentSections;

export default function EquipmentSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = equipmentSections.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const section = equipmentSections[activeIdx];

  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-7xl mx-auto">

        {/* CONTENT + IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-5 transition-all duration-700">
            <span className="text-red-600 font-semibold tracking-widest">
              EQUIPMENT
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {section.title}
            </h2>

            <p className="text-white/70 max-w-md leading-relaxed">
              {section.description ||
                "Professional-grade equipment designed for safe, effective, and progressive training."}
            </p>
          </div>

          {/* RIGHT IMAGES */}
          <div className="grid grid-cols-2 gap-4 transition-all duration-700">
            {section.images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg border border-white/10"
              >
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  className="w-full h-44 md:h-52 object-cover
                             transition-transform duration-700
                             hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center gap-3 mt-12">
          {equipmentSections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 w-8 rounded-full transition
                ${idx === activeIdx
                  ? "bg-red-600"
                  : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
