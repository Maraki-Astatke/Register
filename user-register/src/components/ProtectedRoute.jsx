import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, isTokenExpired, logout } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // First check if token exists
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }
      
      // Check if token is expired
      if (isTokenExpired()) {
        console.log("Token expired, logging out");
        logout();
        setIsAuth(false);
        setIsLoading(false);
        return;
      }
      
      // Verify token with backend
      const authenticated = await isAuthenticated();
      
      if (!authenticated) {
        // Token invalid, clear storage
        logout();
      }
      
      setIsAuth(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Show loading spinner while checking
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

  // Redirect to login if not authenticated
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Show protected content
  return children;
}