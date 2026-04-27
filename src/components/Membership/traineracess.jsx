function TrainerAccess() {
  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <span className="text-red-600 font-semibold tracking-widest">
            TRAINER SUPPORT
          </span>

          <h2 className="text-4xl font-bold text-white mt-4 mb-6">
            Guidance That Makes the Difference
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            All memberships include access to experienced and certified trainers
            who guide your workouts, correct form, and help you train safely.
          </p>

          <p className="text-white/70 text-lg leading-relaxed">
            Whether you are new to fitness or working toward specific goals,
            our trainers ensure you stay consistent and progress correctly.
          </p>
        </div>

        {/* Visual */}
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <img
            src="https://i.ytimg.com/vi/FHUnSiCflVA/maxresdefault.jpg"
            alt="Trainer Guidance"
            className="w-full h-80 object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default TrainerAccess;
