import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Button from "./ui/Button";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

export default function CarritoPanel({ onCerrar }) {
  const { items, total, quitarDelCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function handleFinalizarCompra() {
    if (!usuario) {
      onCerrar();
      navigate("/login");
      return;
    }

    setError("");
    setCargando(true);
    try {
      const { data } = await api.post("/checkout", { productoIds: items.map((item) => item.id) });
      window.location.href = data.url;
    } catch {
      setError("No se pudo iniciar el pago, intenta de nuevo");
      setCargando(false);
    }
  }

  return (
    <div className="w-80 bg-cream text-ink border border-ink/10 rounded-lg shadow-xl p-4">
      {items.length === 0 ? (
        <p className="text-ink/60 text-sm">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{item.nombre}</p>
                  <p className="text-xs text-ink/60">{formatearPrecio(item.precioCentavos)}</p>
                </div>
                <button
                  onClick={() => quitarDelCarrito(item.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 mt-3 pt-3">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-forest">{formatearPrecio(total)}</span>
          </div>
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
          <Button className="w-full mt-3" onClick={handleFinalizarCompra} disabled={cargando}>
            {cargando ? "Redirigiendo..." : "Finalizar compra"}
          </Button>
        </>
      )}
    </div>
  );
}
