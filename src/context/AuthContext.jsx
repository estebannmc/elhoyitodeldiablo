import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Si hay usuario guardado, cargarlo
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        localStorage.removeItem("currentUser"); // Clear bad data
        return null;
      }
    }
    return null;
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    // navigate("/"); // por si queres redirigir después de login
  };

  // --- ACA ESTÁ EL LOGOUT ---
  const logout = () => {
    setUser(null); // borrar usuario del context
    localStorage.removeItem("currentUser"); // borra del localStorage
    navigate("/"); // redirige a inicio
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}