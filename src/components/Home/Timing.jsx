import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const DEFAULT_GYM_HOURS = [
  { title: "Morning",   time: "5:30 AM – 11:00 AM" },
  { title: "Evening",   time: "4:30 PM – 10:30 PM" },
  { title: "Open Days", time: "Monday – Saturday"   },
];

function TimingsPreview() {
  const [gymHours, setGymHours] = useState(DEFAULT_GYM_HOURS);

  useEffect(() => {
fetch("https://gym-backend-8aij.onrender.com/api/timetable/hours")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setGymHours(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#0b0b0b] text-white py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <Clock className="text-red-600" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">Gym Timings</h2>
        </div>

        <p className="text-white/70 max-w-2xl mx-auto text-center mb-10 sm:mb-12 text-sm sm:text-base">
          Train at a time that fits your routine. We offer flexible morning
          and evening sessions throughout the week.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {gymHours.map((card, i) => (
            <div
              key={i}
              className={`timing-card animate-float w-full max-w-xs ${
                i === 0 ? "delay-0" : i === 1 ? "delay-200" : "delay-400"
              }`}
            >
              <h4>{card.title}</h4>
              <p>{card.time}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="/timetable"
            className="bg-red-600 px-8 py-3 rounded font-semibold hover:bg-red-700 transition text-center"
          >
            View Full Timetable
          </a>
        </div>

      </div>
    </section>
  );
}

export default TimingsPreview;
