import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, isTokenExpired, logout } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      if (isTokenExpired()) {
        console.log("Token expired, logging out");
        logout();
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      const authenticated = await isAuthenticated();
      
      if (!authenticated) {
        logout();
      }
      
      setIsAuth(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
    return children;
}