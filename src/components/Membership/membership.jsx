function MembershipBenefits() {
  const benefits = [
    {
      title: "Trainer Guidance",
      desc: "Certified trainers available to guide workouts, correct form, and support safe progress.",
    },
    {
      title: "Personalized Workouts",
      desc: "Training plans adjusted according to fitness level, goals, and consistency.",
    },
    {
      title: "Flexible Timings",
      desc: "Morning and evening sessions designed to fit work, study, and daily routines.",
    },
    {
      title: "Modern Equipment",
      desc: "Access to well-maintained machines, free weights, and functional training areas.",
    },
    {
      title: "Clean & Safe Facility",
      desc: "Hygienic environment with disciplined gym rules for focused training.",
    },
    {
      title: "Progress Tracking",
      desc: "Regular guidance to help track strength, endurance, and overall improvement.",
    },
  ];

  return (
    <section className="bg-[#0b0b0b] py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">
            MEMBERSHIP BENEFITS
          </span>
          <h2 className="text-4xl font-bold text-white mt-4">
            What You Get With Membership
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            Every membership is designed to support disciplined training,
            consistency, and long-term fitness progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl p-6
                         hover:border-red-600 transition"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MembershipBenefits;
