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
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    // navigate("/"); // si quieres redirigir después de login
  };

  // --- AQUÍ ESTÁ EL LOGOUT ---
  const logout = () => {
    setUser(null); // borra usuario del context
    localStorage.removeItem("currentUser"); // borra del localStorage
    navigate("/"); // redirige a inicio (opcional)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}