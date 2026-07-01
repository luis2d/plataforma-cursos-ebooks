import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  async function cargarSesion() {
    try {
      const { data } = await api.get("/auth/me");
      setUsuario(data.usuario);
    } catch {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarSesion();
  }, []);

  async function login(correo, contrasena) {
    const { data } = await api.post("/auth/login", { correo, contrasena });
    setUsuario(data.usuario);
  }

  async function logout() {
    await api.post("/auth/logout");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
