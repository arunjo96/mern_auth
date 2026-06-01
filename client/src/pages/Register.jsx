import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authService";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaArrowRight,
} from "react-icons/fa";

import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    dob: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await registerUser(formData);

      localStorage.setItem("token", data.token);

      toast.success(data.message || "Registration successful");

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 animate-[fadeIn_.6s_ease]">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-3xl" />
            </div>

            <h1 className="text-4xl font-bold text-white">Create Account</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-white/70" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-white/70" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-white/70" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative">
              <FaVenusMars className="absolute left-4 top-4 text-white/70" />
              <select
                name="gender"
                onChange={handleChange}
                className="w-full pl-12 py-3 rounded-xl cursor-pointer bg-white/15 border border-white/20 text-white focus:ring-2 focus:ring-white outline-none"
              >
                <option value="" className="text-black">
                  Select Gender
                </option>
                <option value="male" className="text-black">
                  Male
                </option>
                <option value="female" className="text-black">
                  Female
                </option>
                <option value="other" className="text-black">
                  Other
                </option>
              </select>
            </div>

            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-white/70" />
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-4 text-white/70" />
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative md:col-span-2">
             
              <FaPhoneAlt className="absolute left-4 top-4 text-white/70" />
              <input
                type="text"
                name="contact"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none"
              />
            </div>

            <div className="relative md:col-span-2">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-white/70" />

              <textarea
                rows="4"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="w-full pl-12 pt-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Register"}
                {!loading && <FaArrowRight />}
              </button>
            </div>

            <div className="md:col-span-2 text-center text-white/80">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-yellow-300 hover:text-yellow-200"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
