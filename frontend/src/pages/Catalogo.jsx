import { useEffect, useState } from "react";
import api from "../api/client";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProductos(data.productos))
      .catch(() => setError("No se pudo cargar el catálogo"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="p-6 text-gray-500">Cargando catálogo...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Catálogo</h1>
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
                  disabled
                  title="Los pagos se integran en la Fase 4"
                  className="px-3 py-1.5 rounded-md bg-gray-300 text-gray-600 text-sm cursor-not-allowed"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
