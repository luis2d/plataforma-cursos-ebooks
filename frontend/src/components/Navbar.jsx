import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Button, { botonClases } from "./ui/Button";
import CarritoPanel from "./CarritoPanel";

function Enlaces({ usuario, onNavegar, className }) {
  return (
    <div className={className}>
      <Link to="/noticias" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
        Noticias
      </Link>
      {usuario ? (
        <>
          {usuario.esAdmin && (
            <>
              <Link to="/admin/productos" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
                Productos
              </Link>
              <Link to="/admin/ordenes" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
                Órdenes
              </Link>
              <Link to="/admin/noticias" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
                Redactar noticias
              </Link>
            </>
          )}
          <Link to="/mis-compras" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
            Mis compras
          </Link>
          <span className="text-cream/60">Hola, {usuario.nombre}</span>
        </>
      ) : (
        <>
          <Link to="/login" className="text-cream/70 hover:text-forest" onClick={onNavegar}>
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
  const { cantidad } = useCart();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  async function handleLogout() {
    setMenuAbierto(false);
    await logout();
    navigate("/");
  }

  return (
    <nav className="bg-ink border-b border-cream/10">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-lg font-bold italic text-cream"
          onClick={() => setMenuAbierto(false)}
        >
          Cursos & Ebooks
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <Enlaces usuario={usuario} className="flex items-center gap-6" />
            {usuario && (
              <Button size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setCarritoAbierto(true)}
            onMouseLeave={() => setCarritoAbierto(false)}
          >
            <button
              type="button"
              aria-label="Ver carrito"
              onClick={() => setCarritoAbierto((abierto) => !abierto)}
              className="relative p-2 text-cream hover:text-forest transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 8h12l-1 12H7L6 8Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cantidad > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-forest text-cream text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cantidad}
                </span>
              )}
            </button>
            {carritoAbierto && (
              <div className="absolute right-0 top-full pt-2 z-20">
                <CarritoPanel onCerrar={() => setCarritoAbierto(false)} />
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            className="sm:hidden p-2 text-cream hover:text-forest transition-colors"
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
