function MembershipFAQ() {
  const faqs = [
    {
      q: "Can beginners join the gym?",
      a: "Yes. Our programs are designed for beginners as well as experienced members, with proper guidance provided from day one.",
    },
    {
      q: "Is personal training included in membership?",
      a: "Trainer guidance is included. Dedicated one-on-one personal training can be discussed separately if required.",
    },
    {
      q: "Can I upgrade or change my plan later?",
      a: "Yes. Membership plans can be upgraded or adjusted based on availability and discussion with the gym staff.",
    },
    {
      q: "Do you offer a trial session?",
      a: "Trial sessions or short-term access may be available depending on current offers. Please enquire for details.",
    },
    {
      q: "What are the gym timings?",
      a: "We offer flexible morning and evening sessions. Full timing details are available on the Timetable page.",
    },
  ];

  return (
    <section className="bg-[#0b0b0b] py-24 select-none">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">
            FAQs
          </span>
          <h2 className="text-4xl font-bold text-white mt-4">
            Membership Questions
          </h2>
          <p className="text-white/70 mt-6 text-lg">
            Clear answers to common questions about membership and training.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.q}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MembershipFAQ;
