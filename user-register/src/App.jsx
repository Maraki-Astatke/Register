import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/welcome" 
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}