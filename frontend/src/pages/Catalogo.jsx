import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [comprandoId, setComprandoId] = useState(null);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProductos(data.productos))
      .catch(() => setError("No se pudo cargar el catálogo"))
      .finally(() => setCargando(false));
  }, []);

  async function handleComprar(productoId) {
    if (!usuario) {
      navigate("/login");
      return;
    }

    setComprandoId(productoId);
    try {
      const { data } = await api.post(`/checkout/${productoId}`);
      window.location.href = data.url;
    } catch {
      setError("No se pudo iniciar el pago, intenta de nuevo");
      setComprandoId(null);
    }
  }

  if (cargando) return <p className="p-6 text-gray-500">Cargando catálogo...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Catálogo</h1>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border border-gray-200 rounded-lg overflow-hidden flex flex-col"
          >
            {producto.imagenUrl && (
              <img src={producto.imagenUrl} alt={producto.nombre} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h2 className="font-medium text-gray-900">{producto.nombre}</h2>
              <p className="text-sm text-gray-600 flex-1">{producto.descripcion}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-gray-900">
                  {formatearPrecio(producto.precioCentavos)}
                </span>
                <button
                  onClick={() => handleComprar(producto.id)}
                  disabled={comprandoId === producto.id}
                  className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-700 disabled:opacity-50"
                >
                  {comprandoId === producto.id ? "Redirigiendo..." : "Comprar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
