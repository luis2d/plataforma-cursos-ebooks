import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link to="/" className="text-lg font-semibold text-gray-900">
        Cursos & Ebooks
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {usuario ? (
          <>
            <span className="text-gray-600">Hola, {usuario.nombre}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-700"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-700"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
