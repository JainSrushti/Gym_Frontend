import { useState, useEffect } from "react";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat"];

function TimetablePage() {
  const [gymHours,  setGymHours]  = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [hoursRes, tableRes] = await Promise.all([
          fetch("https://gym-backend-8aij.onrender.com/api/timetable/hours"),
          fetch("https://gym-backend-8aij.onrender.com/api/timetable/weekly"),
        ]);

        if (hoursRes.ok) {
          const data = await hoursRes.json();
          if (Array.isArray(data)) setGymHours(data);
        }

        if (tableRes.ok) {
          const data = await tableRes.json();
          if (Array.isArray(data)) setTimetable(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-24 text-center">
        <div className="animate-pulse">Loading timetable...</div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-24 px-6 select-none">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-4">
          <span className="text-red-600 font-semibold tracking-widest">SCHEDULE</span>
          <h1 className="text-4xl md:text-5xl font-bold">Gym Timings & Schedule</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Plan your workouts with clarity. Find gym hours, program timings,
            trainer availability, and holiday information in one place.
          </p>
        </div>

        {/* GYM HOURS */}
        {gymHours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gymHours.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.time}</p>
              </div>
            ))}
          </div>
        )}

        {/* WEEKLY TIMETABLE */}
        {timetable.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Weekly Timetable</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-red-600 text-white">
                    {["Time Slot", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}>
                      <td className="px-4 py-3 font-medium text-red-400 whitespace-nowrap">
                        {row.slot}
                      </td>
                      {DAYS.map((d) => (
                        <td key={d} className="px-4 py-3 text-white/70">
                          {row[d] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TRAINER AVAILABILITY */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Trainer Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Morning Trainers</h3>
              <p className="text-white/70">
                Available during morning gym hours for strength, weight loss,
                and general fitness programs.
              </p>
            </div>
            <div className="border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Evening Trainers</h3>
              <p className="text-white/70">
                Available during evening slots for CrossFit, functional training,
                and personal coaching.
              </p>
            </div>
          </div>
          <p className="text-white/50 text-sm">
            Exact trainer timings are confirmed after enquiry.
          </p>
        </div>

        {/* HOLIDAYS */}
        <div className="border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-2">Weekly Off & Holidays</h2>
          <p className="text-white/70">
            Sunday is a weekly off. Public holidays may follow a modified
            schedule. Please enquire in advance for holiday timings.
          </p>
        </div>

          {/* hlo */}



        {/* CTA */}
        <div className="text-center pt-10">
          <a
            href="/contact"
            className="inline-block bg-red-600 px-8 py-4 rounded font-semibold hover:bg-red-700 transition"
          >
            Enquire for Exact Schedule
          </a>
        </div>

      </div>
    </section>
  );
}

export default TimetablePage;
