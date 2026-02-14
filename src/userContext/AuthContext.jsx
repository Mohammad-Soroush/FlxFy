import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // بارگذاری اولیه user از localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(!user); // اگر user هست، دیگه loading نیست

  /* ---------------- LOAD USER AFTER LOGIN ---------------- */
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      api
        .get("/user")
        .then((res) => {
          setUser(res.data.user || null);
          if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          cleanupAuth();
        })
        .finally(() => setLoading(false));
    } else {
      // user از localStorage load شد
      setLoading(false);
    }
  }, []);

  /* ---------------- HELPERS ---------------- */
  const setAuth = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(userData || null);
  };

  const cleanupAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  /* ---------------- LOGIN ---------------- */
  const login = async (email, password, role) => {
    try {
      const res = await api.post("/v1/login", { email, password, role });
      setAuth(res.data.access_token, res.data.user);
      navigate("/profile");
      return true;
    } catch (err) {
      const Message = err.response?.data?.message || "Invalid email or password";
      throw new Error(Message);
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = async (name, email, password, role) => {
  try {
    const res = await api.post("/v1/register", { name, email, password, role });
    setAuth(res.data.access_token, res.data.user);
    navigate("/profile");
    return true;
  } catch (err) {
    console.error(err.response?.data || err.message); // <-- log exact server response
    return false;
  }
};


  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await api.post("/v1/logout");
    } catch {
      // ignore
    } finally {
      cleanupAuth();
      navigate("/login");
    }
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = async (formData) => {
    try {
      const res = await api.post("/v1/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data.user) throw new Error("Update failed");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return true;
    } catch (err) {
      console.error("Update failed:", err);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
