import { useLocation, useNavigate } from "react-router-dom";

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "User";


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
  
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Decorative card glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200 transform transition-all duration-300 hover:scale-[1.02]">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

         
          <div className="text-center mb-8">
            <p className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-3">
              Welcome {username}!
            </p>
        
          </div>

        

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              You are now logged in as <span className="font-semibold text-purple-600">{username}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}