function TrainingPhilosophy() {
  return (
    <section className="bg-[#0b0b0b] py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-semibold tracking-widest mb-3">
            OUR APPROACH
          </span>
          <h2 className="text-4xl font-bold text-white tracking-wide">
            Our Training Philosophy
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            We believe real fitness is built through discipline, consistency,
            and correct training methods — not shortcuts or temporary motivation.
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-4">
              Discipline First
            </h3>
            <p className="text-white/70 leading-relaxed">
              Progress comes from routine and commitment. We train with structure,
              focus, and accountability every day.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-4">
              Correct Form & Safety
            </h3>
            <p className="text-white/70 leading-relaxed">
              Every movement matters. We emphasize proper form and injury prevention
              to ensure long-term, sustainable fitness.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-4">
              Consistency Over Motivation
            </h3>
            <p className="text-white/70 leading-relaxed">
              Motivation fades, consistency stays. Our programs are designed to
              build habits that last beyond short-term excitement.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-4">
              Long-Term Results
            </h3>
            <p className="text-white/70 leading-relaxed">
              We focus on real progress — strength, endurance, and confidence —
              built gradually and maintained over time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TrainingPhilosophy;
