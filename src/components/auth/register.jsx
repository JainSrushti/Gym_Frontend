import logo from "../../assets/logo2.png";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="bg-[#222831] text-[#EEEEEE] rounded-xl shadow-xl
                   w-[90%] max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-0 mb-5">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-full"
          />
          <h2 className="text-2xl font-bold text-center leading-tight mt-1">
            Create Account
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {[
            "Username",
            "Email",
            "Password",
            "Phone Number",
            "City",
            "State",
            "Zip Code",
          ].map((placeholder, i) => (
            <input
              key={i}
              type={placeholder === "Password" ? "password" : "text"}
              placeholder={placeholder}
              className="w-full px-4 py-2 rounded bg-[#393E46]
                         text-[#EEEEEE] placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            />
          ))}
        </div>

        {/* Register Button */}
        <button
          onClick={() => console.log("Registered")}
          className="w-full mt-5 bg-[#00ADB5] text-[#222831]
                     font-semibold py-2 rounded
                     hover:opacity-90 transition"
        >
          Register
        </button>

        {/* Switch to Login */}
        <div className="text-center mt-4 text-sm">
          <span className="text-gray-400">Already have an account?</span>
          <button
            onClick={onSwitchToLogin}
            className="ml-2 text-[#00ADB5] hover:underline"
          >
            Login
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#00ADB5]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
