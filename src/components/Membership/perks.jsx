function GymPerks() {
  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">
            FACILITIES & PERKS
          </span>
          <h2 className="text-4xl font-bold text-white mt-4">
            Gym Perks & Facilities
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            Everything you need to train effectively, stay consistent,
            and maintain a disciplined fitness routine.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="border border-white/10 rounded-xl p-8 hover:border-red-600 transition">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Equipment
            </h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>• Modern cardio machines</li>
              <li>• Free weights & resistance equipment</li>
              <li>• Functional training zone</li>
              <li>• Stretching & mobility area</li>
              <li>• Locker rooms & showers</li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-xl p-8 hover:border-red-600 transition">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Member Perks
            </h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>• Fitness assessment & goal tracking</li>
              <li>• Group fitness classes</li>
              <li>• Nutrition guidance support</li>
              <li>• Member-only events</li>
              <li>• Exclusive partner discounts</li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-xl p-8 hover:border-red-600 transition">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Services
            </h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>• Certified personal trainers</li>
              <li>• Strength, HIIT & yoga sessions</li>
              <li>• Nutrition consultation</li>
              <li>• Wellness workshops</li>
              <li>• Online guidance support</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

export default GymPerks;
