function ContactForm() {
  return (
    <section className="bg-black px-6 py-20 select-none">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT: Visual / Info */}
        <div className="text-center md:text-left">
          <img
            src="https://www.rsproducts.net/images/enquiry.png"
            alt="Gym Enquiry"
            className="max-w-sm mx-auto md:mx-0 mb-6 opacity-90"
          />
          <h3 className="text-3xl font-bold text-white mb-3">
            We're Here to Help
          </h3>
          <p className="text-white/60 max-w-sm">
            Have questions about training, memberships, or timings?
            Our team will get back to you shortly.
          </p>
        </div>

        {/* RIGHT: Enquiry CTA */}
        <div className="flex flex-col items-center justify-center gap-6 bg-[#0b0b0b] border border-white/10 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-white/60 text-sm max-w-xs">
            Send us your enquiry and we'll help you find the right program, trainer, or membership plan.
          </p>
          <a
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition w-full text-center"
          >
            Enquire Now
          </a>
          <a
            href="/join"
            className="border border-white/20 hover:border-red-600 text-white/70 hover:text-white font-semibold px-8 py-3 rounded transition w-full text-center"
          >
            Join Now
          </a>
        </div>

      </div>
    </section>
  );
}

export default ContactForm;
