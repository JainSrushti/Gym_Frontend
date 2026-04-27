function WhoWeAre() {
  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: Text */}
        <div>
          <span className="inline-block text-red-600 font-semibold tracking-widest mb-4">
            ABOUT POWER GYM
          </span>

          <h2 className="text-4xl font-bold text-white mb-8 leading-tight">
            Built on Discipline,<br />Focused on Results
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Power GYM was established with a simple vision — to create a training
            space where discipline, consistency, and correct methods come before
            shortcuts and trends.
          </p>

          <p className="text-white/70 text-lg leading-relaxed">
            Our approach is grounded in structured training and guided workouts.
            With experienced trainers and a focused environment, we help members
            progress safely, build real strength, and maintain long-term fitness
            habits.
          </p>
        </div>

        {/* Right: Visual Blocks */}
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-red-600 mb-2">10+</h3>
            <p className="text-white/70">Years of Training Experience</p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-red-600 mb-2">500+</h3>
            <p className="text-white/70">Members Trained</p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-red-600 mb-2">100%</h3>
            <p className="text-white/70">Focused Training</p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-red-600 mb-2">0</h3>
            <p className="text-white/70">Shortcuts Promised</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhoWeAre;
