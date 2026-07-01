import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button, { botonClases } from "./ui/Button";

function Enlaces({ usuario, onNavegar, className }) {
  return (
    <div className={className}>
      {usuario ? (
        <>
          {usuario.esAdmin && (
            <>
              <Link to="/admin/productos" className="text-gray-700 hover:text-gray-900" onClick={onNavegar}>
                Admin: productos
              </Link>
              <Link to="/admin/ordenes" className="text-gray-700 hover:text-gray-900" onClick={onNavegar}>
                Admin: órdenes
              </Link>
            </>
          )}
          <Link to="/mis-compras" className="text-gray-700 hover:text-gray-900" onClick={onNavegar}>
            Mis compras
          </Link>
          <span className="text-gray-600">Hola, {usuario.nombre}</span>
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-700 hover:text-gray-900" onClick={onNavegar}>
            Iniciar sesión
          </Link>
          <Link to="/registro" className={botonClases("primario", "sm")} onClick={onNavegar}>
            Crear cuenta
          </Link>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  async function handleLogout() {
    setMenuAbierto(false);
    await logout();
    navigate("/");
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900" onClick={() => setMenuAbierto(false)}>
          Cursos & Ebooks
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-sm">
          <Enlaces usuario={usuario} className="flex items-center gap-4" />
          {usuario && (
            <Button size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          className="sm:hidden p-2 text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuAbierto ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuAbierto && (
        <div className="sm:hidden px-6 pb-4">
          <Enlaces
            usuario={usuario}
            onNavegar={() => setMenuAbierto(false)}
            className="flex flex-col items-start gap-3 text-sm"
          />
          {usuario && (
            <Button size="sm" onClick={handleLogout} className="mt-3">
              Cerrar sesión
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
