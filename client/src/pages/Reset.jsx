import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../api/authService";
import { toast } from "react-toastify";

import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.warning("Please enter new password");
      return;
    }

    try {
      setLoading(true);

      const { data } = await resetPassword(token, newPassword);

      toast.success(data.message || "Password reset successful");

      setNewPassword("");

      setTimeout(() => {
        navigate("/");
      }, 800);
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
              <FaLock className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-white">Reset Password</h1>

            <p className="text-white/80 mt-2">Create a new secure password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-white/70" />

              <input
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="
                  w-full
                  pl-12
                  pr-12
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

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-4 text-white/70 hover:text-white"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
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
                hover:scale-[1.02]
                active:scale-95
                transition-all
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

       
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-yellow-300 transition"
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

export default Reset;
