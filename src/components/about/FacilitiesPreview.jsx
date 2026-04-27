function FacilitiesPreview() {
  return (
    <section className="bg-[#0b0b0b] py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-semibold tracking-widest mb-3">
            OUR FACILITY
          </span>
          <h2 className="text-4xl font-bold text-white tracking-wide">
            Built for Serious Training
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            Our facility is designed to support disciplined training with
            modern equipment, clean spaces, and a focused workout environment.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="group overflow-hidden rounded-xl border border-white/10">
            <img
              src="https://img.freepik.com/premium-photo/sport-portrait-african-american-athlete-strong-bodybuilder-man-posing-gym-looking-his-biceps-dark-colors-portrait_116317-19120.jpg?w=2000"
              alt="Strength Training Area"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                Strength Training Zone
              </h3>
              <p className="text-white/70">
                Dedicated area with free weights and machines for structured
                strength training.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-xl border border-white/10">
            <img
              src="https://img.freepik.com/premium-photo/gym-with-red-wall-black-bar-that-says-use-weights_876956-1220.jpg"
              alt="Cardio Area"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                Cardio & Conditioning
              </h3>
              <p className="text-white/70">
                Modern cardio equipment to support fat loss, endurance,
                and conditioning workouts.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-xl border border-white/10">
            <img
              src="https://i.pinimg.com/736x/68/33/07/6833079d2c591dd2f84f053533a8fca1.jpg"
              alt="Functional Training Zone"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                Functional Training Area
              </h3>
              <p className="text-white/70">
                Open space for mobility, core workouts, and functional
                training routines.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FacilitiesPreview;
