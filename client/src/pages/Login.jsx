import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authService";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     setLoading(true);

     const { data } = await loginUser(email, password);

     localStorage.setItem("token", data.token);

     toast.success(data.message || "Login successful");

     navigate("/profile");
   } catch (error) {
     toast.error(error?.response?.data?.message || "Login failed");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-[fadeIn_.6s_ease]">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

            <p className="text-white/80 mt-2">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm mb-2 block text-left">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-white/70" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block text-left">Password</label>

              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-white/70" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white transition"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-white hover:text-yellow-300 transition"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              {loading ? "Signing In..." : "Login"}
              {!loading && <FaArrowRight />}
            </button>

            <div className="text-center text-white/80 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-yellow-300 hover:text-yellow-200"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
