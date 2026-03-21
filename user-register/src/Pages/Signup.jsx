import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    for (let key in form)
      if (!form[key]) return setError("⚠️ All fields are required");

    setIsLoading(true);
   

    setError("");
    console.log("✅ User signed up:", form);
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/welcome", { state: { username: form.name } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">

     
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">

          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Create Account
          </h2>
        

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-200 text-center text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">

           
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Phone Number
              </label>
            </div>

      
            <div className="relative">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Email Address
              </label>
            </div>

           
            <div className="relative">
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 -top-2 text-xs text-pink-400 bg-slate-900/70 px-1">
                Date of Birth
              </label>
            </div>

       
            <div className="relative">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Location
              </label>
            </div>

        
            <div className="relative">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>

          </form>

          <div className="mt-6 text-center text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}