function MembershipOffers() {
  const offers = [
    {
      title: "Student Discount",
      desc: "Special membership pricing available for students with valid ID.",
    },
    {
      title: "Long-Term Membership Benefit",
      desc: "Better value pricing for quarterly and yearly memberships.",
    },
    {
      title: "Couple / Friends Plan",
      desc: "Join with a friend or partner and enjoy exclusive benefits.",
    },
    {
      title: "Limited-Time Offers",
      desc: "Seasonal membership offers available for a short duration.",
    },
  ];

  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-widest">
            OFFERS & BENEFITS
          </span>
          <h2 className="text-4xl font-bold text-white mt-4">
            Membership Offers
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
            We provide flexible offers designed to make fitness accessible,
            affordable, and sustainable for everyone.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {offers.map((offer, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl p-6
                         hover:border-red-600 transition"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {offer.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {offer.desc}
              </p>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
        </div>

      </div>
    </section>
  );
}

export default MembershipOffers;
