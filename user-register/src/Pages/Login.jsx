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

  const handleLogin = (e) => {
    e.preventDefault();

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
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-200">
          <h2 className="text-4xl italic font-bold mb-8 text-center text-black to-pink-500 bg-clip-text ">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-xl">
              <p className="text-red-600 text-center text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
                Phone Number
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white bg-amber-700 font-semibold transition-all"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-700 hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}