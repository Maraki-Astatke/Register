import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();

    for (let key in form) {
      if (!form[key]) {
        return setError("All fields are required");
      }
    }

    console.log("User signed up:", form);
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/welcome", { state: { username: form.name } });
  };
 const handleGoogleSuccess = async (response) => {
    console.log("Google Login Success:", response);
    setIsLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      
      const data = await res.json();
      console.log("User data:", data);
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      navigate("/welcome", { state: { username: data.user?.username || "Google User" } });
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-200">
          <h2 className="text-4xl italic font-bold mb-2 text-center text-black to-pink-500 bg-clip-text ">
            Create Account
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-xl">
              <p className="text-red-600 text-center text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative mt-9">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
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
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
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
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 -top-2 text-xs text-purple-600 bg-white px-1">
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
                className="peer w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1">
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
              className="w-full py-3 rounded-xl bg-amber-700 to-pink-500 text-white font-semibold transition-all hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>


          <div className="flex justify-center mt-5">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="mt-6 text-center text-gray-500 ">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}