import { useEffect, useState } from "react";
import api from "../api/client";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

const ESTADO_LABEL = {
  PENDIENTE: "Pendiente",
  PAGADO: "Pagado",
  FALLIDO: "Fallido",
};

export default function MisCompras() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/orders/mine")
      .then(({ data }) => setOrdenes(data.ordenes))
      .catch(() => setError("No se pudieron cargar tus compras"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="p-6 text-gray-500">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Mis compras</h1>
      {ordenes.length === 0 ? (
        <p className="text-gray-600">Todavía no tienes compras.</p>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl">
          {ordenes.map((orden) => (
            <div
              key={orden.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-900">{orden.producto.nombre}</p>
                <p className="text-sm text-gray-600">
                  {formatearPrecio(orden.producto.precioCentavos)} · {ESTADO_LABEL[orden.estadoPago]}
                </p>
              </div>
              {orden.producto.contenidoUrl ? (
                <a
                  href={orden.producto.contenidoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-700"
                >
                  Descargar
                </a>
              ) : (
                <span className="text-sm text-gray-400">Sin acceso aún</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
