import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isTokenExpired, logout, getCurrentUser } from "../utils/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userFromState = location.state?.username;
    const userFromStorage = getCurrentUser();
    
    if (userFromState) {
      setUsername(userFromState);
    } else if (userFromStorage?.name) {
      setUsername(userFromStorage.name);
    } else {
      setUsername("User");
    }
    
    if (isTokenExpired()) {
      logout();
      navigate("/login");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome {username}!
          </CardTitle>
          <CardDescription className="text-center">
            You are now logged in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              You are now logged in as <span className="font-semibold text-purple-600">{username}</span>
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="destructive" 
            className="w-full"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}