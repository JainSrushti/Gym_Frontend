function Hero(){

    return(
        <section className="hero-section bg-[#000000] text-white py-20 px-5 text-center w-full h-screen flex flex-col justify-center items-center">
            <img src="https://images.pexels.com/photos/17211446/pexels-photo-17211446.jpeg" alt="Hero Image" className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-30"   
      />

      <div className="absolute inset-0 bg-black/20" />
       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className=" text-4xl md:text-3xl font-bold mb-4 ">Why to Join Us ?</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
                At Power GYM, we are dedicated to helping you achieve your fitness goals. 
                Our state-of-the-art facilities, experienced trainers, and supportive community 
                provide the perfect environment for you to thrive. Whether you're a beginner or 
                a seasoned athlete, we have the resources and programs to help you succeed.
            </p>
            <button
              onClick={() => window.location.href = '/join'}
              className="mt-8 bg-red-600 text-white px-6 py-3 rounded
                               font-semibold hover:bg-red-700 
                               transition-colors duration-300 w-40 h-12">
                Join Now
            </button>
          </div>
        </section>
    )

}
export default Hero;