import logo from "../../assets/logo2.png";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[#222831] text-white rounded-xl w-[90%] max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-5">
          <img src={logo} className="w-20 h-20 rounded-full" />
          <h2 className="text-xl font-bold">Create Account</h2>
        </div>

        <div className="space-y-3">
          <input className="w-full p-2 bg-[#393E46]" placeholder="Username" />
          <input className="w-full p-2 bg-[#393E46]" placeholder="Email" />
          <input className="w-full p-2 bg-[#393E46]" placeholder="Password" />
        </div>

        <button className="w-full mt-5 bg-[#00ADB5] py-2 rounded">
          Register
        </button>

        <p className="text-center mt-3 text-sm">
          Already have account?{" "}
          <button onClick={onSwitchToLogin} className="text-[#00ADB5]">
            Login
          </button>
        </p>

        <button onClick={onClose} className="absolute top-2 right-3">
          ✕
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;