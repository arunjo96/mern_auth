import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/authService";

import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    
    const handleUpdate = async () => {
      try {
        setLoading(true);

        const { data } = await updateProfile(user);

        toast.success(data.message || "Profile updated successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Update failed");
      } finally {
        setLoading(false);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
     
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>

        

          <button
            onClick={handleLogout}
            className="
    group
    relative
    overflow-hidden
    bg-gradient-to-r
    from-red-500
    to-pink-500
    hover:from-red-600
    hover:to-pink-600
    text-white
    px-6
    py-3
    rounded-2xl
    flex
    items-center
    gap-3
    font-semibold
    shadow-lg
    hover:shadow-red-500/40
    hover:scale-105
    active:scale-95
    transition-all
    duration-300
  "
          >
            <span
              className="
      absolute
      inset-0
      bg-white/10
      translate-x-[-100%]
      group-hover:translate-x-[100%]
      transition-transform
      duration-700
    "
            />

            <FaSignOutAlt
              className="
      text-lg
      group-hover:rotate-12
      transition-transform
      duration-300
    "
            />

            <span>Logout</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <FaUser className="text-white text-5xl" />
              </div>

              <h2 className="text-2xl font-bold text-white">{user.name}</h2>

              <p className="text-white/70 mt-1">{user.email}</p>

              <div className="mt-6 w-full space-y-4">
                <div className="bg-white/10 rounded-xl p-4 text-white">
                  <p className="text-sm text-white/60">Gender</p>
                  <p>{user.gender || "Not Added"}</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-white">
                  <p className="text-sm text-white/60">Age</p>
                  <p>{user.age || "Not Added"}</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-white">
                  <p className="text-sm text-white/60">Contact</p>
                  <p>{user.contact || "Not Added"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-white/70" />

                <input
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none"
                />
              </div>

              <div className="relative">
                <FaVenusMars className="absolute left-4 top-4 text-white/70" />

                <input
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none"
                />
              </div>

              <div className="relative">
                <FaBirthdayCake className="absolute left-4 top-4 text-white/70" />

                <input
                  name="age"
                  value={user.age || ""}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none"
                />
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-4 text-white/70" />

                <input
                  name="contact"
                  value={user.contact || ""}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full pl-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none"
                />
              </div>

              <div className="md:col-span-2 relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-white/70" />

                <textarea
                  rows="5"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full pl-12 pt-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <FaSave />

                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
