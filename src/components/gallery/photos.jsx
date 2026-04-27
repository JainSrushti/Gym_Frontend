import data from "./photos.json";
import { useState } from "react";

function GalleryPhotos() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: "All" },
    { key: "trainers", label: "Trainers" },
    { key: "events", label: "Events" },
    { key: "workouts", label: "Workouts" },
    { key: "facilities", label: "Facilities" },
  ];

  return (
    <section className="bg-black py-24 px-6 select-none">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Training Moments
        </h2>

        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          A look into our daily training environment, equipment, and community.
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`
                px-5 py-2 rounded font-semibold border
                transition
                ${filter === cat.key
                  ? "bg-red-600 text-white border-red-600"
                  : "border-white/20 text-white/70 hover:border-red-600 hover:text-white"}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.images
            .filter(img => filter === "all" || img.category === filter)
            .map(img => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-lg border border-white/10"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-44 sm:h-52 object-cover
                             transition-transform duration-700
                             group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 flex items-end
                             bg-black/60 opacity-0
                             group-hover:opacity-100 transition"
                >
                  <div className="p-4">
                    <h3 className="text-white font-semibold">
                      {img.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {img.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}

export default GalleryPhotos;
