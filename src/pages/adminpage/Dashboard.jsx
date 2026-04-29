import React, { useState, useEffect } from "react";
import { Dumbbell, ClipboardList, MessageSquare, CalendarDays, UserPlus, Tag, Users } from "lucide-react";

const TRAINERS_API     = "http://localhost:8080/api/gym-trainers";
const PROGRAMS_API     = "http://localhost:8080/api/programs";
const APPLICATIONS_API = "http://localhost:8080/api/trainers";
const JOIN_API         = "http://localhost:8080/api/join";
const ENQUIRIES_API    = "http://localhost:8080/api/enquiries";
const OFFERS_API       = "http://localhost:8080/api/offers";
const MEMBERSHIP_API   = "http://localhost:8080/api/membership-plans";

const statusColor = {
  Pending:  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
  New:      "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

function StatCard({ label, value, icon: Icon, color, loading }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-red-600/30 transition">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white text-2xl font-bold leading-tight">
          {loading ? <span className="text-gray-600 text-lg">...</span> : value}
        </p>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, count, countLabel, loading, children }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Icon size={16} className="text-red-500" /> {title}
        </h3>
        {countLabel && (
          <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">{count} {countLabel}</span>
        )}
      </div>
      <div className="divide-y divide-gray-800">
        {loading ? (
          <div className="px-5 py-8 text-center text-gray-600 text-sm">Loading...</div>
        ) : children}
      </div>
    </div>
  );
}

function EmptyRow({ text }) {
  return <div className="px-5 py-8 text-center text-gray-600 text-sm">{text}</div>;
}

function Dashboard() {
  const [trainers,     setTrainers]     = useState([]);
  const [programs,     setPrograms]     = useState([]);
  const [applications, setApplications] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [offers,       setOffers]       = useState([]);
  const [memberships,  setMemberships]  = useState([]);
  const [enquiries,    setEnquiries]    = useState([]);
  const [timetable,    setTimetable]    = useState([]);
  const [loading,      setLoading]      = useState(true);

  const DAY_KEYS  = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const DAY_NAMES  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIndex = new Date().getDay();
  const todayKey   = DAY_KEYS[todayIndex];
  const todayName  = DAY_NAMES[todayIndex];

  useEffect(() => {
    Promise.allSettled([
      fetch(TRAINERS_API).then(r => r.json()),
      fetch(PROGRAMS_API).then(r => r.json()),
      fetch(APPLICATIONS_API).then(r => r.json()),
      fetch(JOIN_API).then(r => r.json()),
      fetch(ENQUIRIES_API).then(r => r.json()),
      fetch(OFFERS_API).then(r => r.json()),
      fetch(MEMBERSHIP_API).then(r => r.json()),
      fetch("http://localhost:8080/api/timetable").then(r => r.json()),
    ]).then(([t, p, a, j, e, o, m, tt]) => {
      if (t.status  === "fulfilled") setTrainers(Array.isArray(t.value)     ? t.value  : []);
      if (p.status  === "fulfilled") setPrograms(Array.isArray(p.value)     ? p.value  : []);
      if (a.status  === "fulfilled") setApplications(Array.isArray(a.value) ? a.value  : []);
      if (j.status  === "fulfilled") setJoinRequests(Array.isArray(j.value) ? j.value  : []);
      if (e.status  === "fulfilled") setEnquiries(Array.isArray(e.value)    ? e.value  : []);
      if (o.status  === "fulfilled") setOffers(Array.isArray(o.value) ? o.value : []);
      else {
        try { const s = localStorage.getItem("admin_offers"); if (s) setOffers(JSON.parse(s)); } catch {}
      }
      if (m.status  === "fulfilled") setMemberships(Array.isArray(m.value)  ? m.value  : []);
      if (tt.status === "fulfilled" && Array.isArray(tt.value)) {
        const todayRows = tt.value.filter(row => row[DAY_KEYS[new Date().getDay()]] && row[DAY_KEYS[new Date().getDay()]].trim() !== "");
        setTimetable(todayRows);
      }
      setLoading(false);
    });
  }, []);

  const readIds  = new Set(JSON.parse(localStorage.getItem("read_enquiry_ids") || "[]"));
  const newApps   = applications.filter(a => a.status === "Pending").length;
  const newJoins  = joinRequests.filter(j => j.status === "Pending").length;
  const unreadEnq = enquiries.filter(e => !readIds.has(e.id)).length;

  const stats = [
    { label: "Total Trainers",    value: trainers.length,    icon: Dumbbell,      color: "from-red-600 to-red-800" },
    { label: "Total Programs",    value: programs.length,    icon: ClipboardList, color: "from-yellow-600 to-yellow-800" },
    { label: "Current Offers",    value: offers.length,      icon: Tag,           color: "from-pink-600 to-pink-800" },
    { label: "Membership Plans",  value: memberships.length, icon: Users,         color: "from-orange-600 to-orange-800" },
  ];

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} loading={loading} />)}
      </div>

      {/* Row 1 — Applications + Join Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <SectionCard title="Pending Trainer Applications" icon={MessageSquare} count={newApps} countLabel="pending" loading={loading}>
          {applications.filter(a => a.status === "Pending").length === 0
            ? <EmptyRow text="No pending applications" />
            : [...applications]
                .filter(a => a.status === "Pending")
                .sort((a, b) => (b.id - a.id) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                .map((a, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-800/30 transition">
                <div>
                  <p className="text-white text-sm font-medium">{a.name}</p>
                  <p className="text-gray-500 text-xs">{a.specialization} · {a.phone || a.phoneNumber}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || statusColor["Pending"]}`}>
                  {a.status || "Pending"}
                </span>
              </div>
            ))
          }
        </SectionCard>

        <SectionCard title="Pending Join Requests" icon={UserPlus} count={newJoins} countLabel="pending" loading={loading}>
          {joinRequests.filter(j => j.status === "Pending").length === 0
            ? <EmptyRow text="No pending join requests" />
            : joinRequests.filter(j => j.status === "Pending").map((j, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-800/30 transition">
                <div>
                  <p className="text-white text-sm font-medium">{j.name}</p>
                  <p className="text-gray-500 text-xs">{j.program} · {j.phone}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[j.status] || statusColor["New"]}`}>
                  {j.status || "New"}
                </span>
              </div>
            ))
          }
        </SectionCard>

      </div>

      {/* Row 2 — Enquiries + Today's Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <SectionCard title={`Today's Timetable — ${todayName}`} icon={CalendarDays} loading={loading}>
          {timetable.length === 0 ? <EmptyRow text={`No classes scheduled for ${todayName}`} /> :
            timetable.map((row, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-800/30 transition">
                <p className="text-white text-sm font-medium">{row.slot}</p>
                <span className="text-xs text-red-400 font-semibold">{row[todayKey]}</span>
              </div>
            ))
          }
        </SectionCard>

        <SectionCard title="Pending Enquiries" icon={MessageSquare} count={unreadEnq} countLabel="unread" loading={loading}>
          {enquiries.filter(e => !readIds.has(e.id)).length === 0
            ? <EmptyRow text="No new enquiries" />
            : [...enquiries].reverse().filter(e => !readIds.has(e.id)).map((e, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-800/30 transition">
                <div>
                  <p className="text-white text-sm font-medium">{e.name}</p>
                  <p className="text-gray-500 text-xs">{e.enquiryType} · {e.phone}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor["New"]}`}>New</span>
              </div>
            ))
          }
        </SectionCard>

      </div>

    </div>
  );
}

export default Dashboard;
