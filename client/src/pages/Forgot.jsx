import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authService";
import { toast } from "react-toastify";

import { FaEnvelope, FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     setLoading(true);

     const { data } = await forgotPassword(email);

     toast.success(data.message || "Reset link sent successfully");

     setEmail("");
   } catch (error) {
     toast.error(error?.response?.data?.message || "Something went wrong");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-[fadeIn_.6s_ease]">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>

            <p className="text-white/80 mt-2">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-white/70" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-xl
                  bg-white/15
                  border
                  border-white/20
                  text-white
                  placeholder-white/60
                  focus:ring-2
                  focus:ring-white
                  outline-none
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-white
                text-indigo-700
                py-3
                rounded-xl
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:scale-[1.02]
                active:scale-95
                transition-all
                duration-300
              "
            >
              {loading ? "Sending..." : "Send Reset Link"}

              {!loading && <FaPaperPlane />}
            </button>
          </form>

         
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2
                text-white/80
                hover:text-yellow-300
                transition
              "
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
