function Class() {
  return (
    <section className="bg-[#EEEEEE] w-full py-20 select-none">

      <h2 className="text-3xl font-bold text-center mb-12 text-[#222831]">
        Class Timings
      </h2>

      <div className="max-w-7xl mx-auto px-5 overflow-x-auto">
        <table className="min-w-225  w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-white/80">

          <thead className="bg-[#222831] text-[#EEEEEE]">
            <tr>
              <th className="px-4 py-4 text-center">Time</th>
              <th className="px-4 py-4 text-center">Class</th>
              <th className="px-6 py-4 text-center hidden md:table-cell">Trainer</th>
              <th className="px-4 py-4 text-center">Price</th>
              <th className="px-4 py-4 text-center hidden lg:table-cell">Level</th>
              <th className="px-4 py-4 text-center hidden lg:table-cell">Duration</th>
            </tr>
          </thead>

          <tbody className="text-[#393E46] text-lg">
            {Array(9).fill().map((_, i) => (
              <tr
                key={i}
                className={`border-b transition-colors
                  hover:bg-[#00ADB5]/10
                  ${i % 2 === 1 ? "bg-[#F9F9F9]" : "bg-white"}`}
              >
                <td className="px-4 py-3 text-center">6:00 – 7:00 AM</td>
                <td className="px-4 py-3 text-center font-medium">Yoga</td>
                <td className="px-6 py-3 text-center hidden md:table-cell">
                  Siddhesh Jadhav
                </td>
                <td className="px-4 py-3 text-center font-semibold">₹500</td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  Beginner
                </td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  60 min
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
}

export default Class;
