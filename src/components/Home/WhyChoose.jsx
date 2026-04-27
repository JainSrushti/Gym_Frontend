import { useEffect, useState } from "react";
import programImage from "../../assets/program.png";
function Why() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Certified Personal Trainers",
      desc: "Train under certified and experienced fitness professionals who focus on correct form, safety, and sustainable long-term progress.",
      btn: "Talk to a Trainer",
      img: "https://th.bing.com/th/id/OIP.s8grxXgiXvDnCe0ciFQKewHaE8",
    },
    {
      title: "Personalized Workout Plans",
      desc: "Customized training programs designed around your fitness level, body type, and goals for visible and measurable results.",
      btn: "Start Your Journey",
      img: "https://th.bing.com/th/id/OIP.s8grxXgiXvDnCe0ciFQKewHaE8",
    },
    {
      title: "Modern Equipment & Facility",
      desc: "Train with modern machines, free weights, and functional zones in a clean, organized, and performance-focused environment.",
      btn: "Visit the Gym",
      img: "https://th.bing.com/th/id/OIP.s8grxXgiXvDnCe0ciFQKewHaE8",
    },
    {
      title: "Motivating Training Environment",
      desc: "A disciplined and energetic atmosphere that keeps you focused, consistent, and mentally strong throughout your fitness journey.",
      btn: "Train With Us",
      img: "https://th.bing.com/th/id/OIP.s8grxXgiXvDnCe0ciFQKewHaE8",
    },
    {
      title: "Flexible Timings & Affordable Plans",
      desc: "Convenient morning and evening slots with affordable plans suited for students, professionals, and athletes.",
      btn: "Check Timings",
      img: "https://th.bing.com/th/id/OIP.s8grxXgiXvDnCe0ciFQKewHaE8",
    },
  ];

  return (
    <section className="bg-black w-full py-20 select-none overflow-x-hidden">
      <h2 className="text-3xl font-bold text-center mb-14 text-white tracking-wide">
        Why Choose Power GYM
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full shrink-0 flex flex-col md:flex-row items-center
                         px-6 md:px-16 gap-10"
            >
            <div className="w-full md:w-1/2 space-y-6 md:pr-10 sm:justify-center md:justify-start text-center md:text-left">
                <h3 className="text-3xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="text-white/70 text-lg leading-relaxed">
                  {card.desc}
                </p>

                <a
                  href="/contact"
                  className="inline-block bg-red-600 text-white
                             px-7 py-3 rounded font-semibold
                             hover:bg-red-700 transition duration-300 "
                >
                  {card.btn}
                </a>
              </div>

              <div className="w-full md:w-1/2">
                <img
                  src={programImage}
                  alt={card.title}
                  className="w-full h-64 md:h-72 object-cover rounded-xl
                             border border-white/10
                             hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Why;
