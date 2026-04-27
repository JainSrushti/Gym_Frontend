function MembershipCTA() {
  return (
    <section className="bg-black py-24 select-none">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Start Your Fitness Journey?
        </h2>

        <p className="text-white/70 max-w-2xl mx-auto mb-12 text-lg">
          Not sure which membership plan suits you best?
          Talk to us and we’ll help you choose the right option.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="https://wa.me/919876543210?text=Hi%20Power%20GYM,%20I%20want%20to%20know%20about%20membership%20plans."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-600 text-green-500 px-10 py-3 rounded font-semibold
                       hover:bg-green-600 hover:text-white transition"
          >
            WhatsApp Enquiry
          </a>
        </div>

      </div>
    </section>
  );
}

export default MembershipCTA;
