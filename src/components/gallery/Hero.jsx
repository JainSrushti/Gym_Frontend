function Hero() {
  

  return (
    <section className="relative w-screen min-h-screen overflow-hidden select-none bg-black">
      
      
   {/* Background Image */}
<div className="absolute inset-0">
  <img
    src="https://i.pinimg.com/736x/46/cf/c4/46cfc4fb25aa7555c69e09cacf576ef6.jpg"
    alt="bg"
    className="w-full h-full object-cover"
  />
</div>

{/* Overlay */}
{/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" /> */}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* CENTER CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-1">
        <span className="text-red-600 font-semibold tracking-widest mb-4">
          OUR SPACE
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Inside Power GYM
        </h1>

        <p className="max-w-2xl text-white/70 text-lg md:text-xl leading-relaxed">
          A glimpse into our training environment, equipment, and disciplined
          atmosphere designed for serious fitness progress.
        </p>
      </div>

    </section>
  );
}

export default Hero;
