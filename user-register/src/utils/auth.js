import API_URL from "../config/api";

// Check if user is authenticated (token exists AND is valid)
export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Check token expiration
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};