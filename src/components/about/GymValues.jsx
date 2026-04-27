function GymValues() {
  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-semibold tracking-widest mb-3">
            OUR VALUES
          </span>
          <h2 className="text-4xl font-bold text-white tracking-wide">
            What Sets Power GYM Apart
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            Our values define how we train, how we guide our members,
            and how we maintain a professional fitness environment.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-3">
              Certified Trainers
            </h3>
            <p className="text-white/70 leading-relaxed">
              Our trainers are certified, experienced, and committed to guiding
              members with correct techniques and safe training practices.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-3">
              Clean & Safe Environment
            </h3>
            <p className="text-white/70 leading-relaxed">
              We maintain a hygienic, organized, and well-monitored training space
              to ensure comfort and safety for every member.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-3">
              Modern Equipment
            </h3>
            <p className="text-white/70 leading-relaxed">
              Our facility is equipped with modern machines, free weights,
              and functional training zones for complete workouts.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
            <h3 className="text-xl font-semibold text-white mb-3">
              Personalized Attention
            </h3>
            <p className="text-white/70 leading-relaxed">
              We focus on individual progress by offering guidance,
              form correction, and support tailored to each member.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default GymValues;
