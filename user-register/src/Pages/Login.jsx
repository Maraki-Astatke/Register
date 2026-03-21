import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DEMO_USER = { username: "maki", phone: "0911995992", password: "123456" };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      form.username === DEMO_USER.username &&
      form.phone === DEMO_USER.phone &&
      form.password === DEMO_USER.password
    ) {
      setError("");
      console.log("✅ User logged in:", form.username);
      navigate("/welcome", { state: { username: form.username } });
    } else {
      setError("❌ Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">

          <h2 className="text-4xl font-bold mb-2 text-center text-white">
            Welcome Back
          </h2>
       

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-200 text-center text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* USERNAME */}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Username
              </label>
            </div>

            {/* PHONE */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Phone Number
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
              <label className="absolute left-4 top-3 text-white/60 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-slate-900/70 peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-slate-900/70 peer-not-placeholder-shown:px-1">
                Password
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* DEMO */}
            <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 text-center">
                Username: maki | Phone: 0911995992 | Password: 123456
              </p>
            </div>
          </form>

          {/* SIGNUP */}
          <div className="mt-6 text-center text-white/60">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-400 hover:underline">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}