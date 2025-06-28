import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async (email, jwt) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/${email}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const result = await res.json();
      if (res.ok && result.data) return result.data;
      throw new Error(result.statusMessage || "Failed to fetch profile");
    } catch (error) {
      console.error("Fetch user profile error:", error);
      return null;
    }
  };


  const login = async (email, password) => {
    // authentication logic
    const mockUser = {
      id: "1",
      email,
      name: "Demo User",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  };


  const googleLogin = async (credentialResponse) => {
    try {
       const res = await fetch(`${API_BASE_URL}/auth/google`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ idToken: credentialResponse.credential }),
       });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/jobseeker");
      } else {
        console.error("Google login failed:", data);
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const register = async (userData) => {
    // registration logic
    const mockUser = {
      id: "1",
      email: userData.email,
      name: userData.name,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        googleLogin,
        fetchUserProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
