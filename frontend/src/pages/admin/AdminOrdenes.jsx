import { useEffect, useState } from "react";
import api from "../../api/client";
import Spinner from "../../components/ui/Spinner";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/admin/orders")
      .then(({ data }) => setOrdenes(data.ordenes))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Órdenes</h1>
      {ordenes.length === 0 ? (
        <p className="text-gray-600">Todavía no hay órdenes registradas.</p>
      ) : (
      <div className="overflow-x-auto max-w-5xl">
        <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{new Date(orden.fechaCreacion).toLocaleString("es-MX")}</td>
                <td className="px-4 py-2">
                  {orden.usuario.nombre}
                  <br />
                  <span className="text-gray-500">{orden.usuario.correo}</span>
                </td>
                <td className="px-4 py-2">{orden.producto.nombre}</td>
                <td className="px-4 py-2">{formatearPrecio(orden.producto.precioCentavos)}</td>
                <td className="px-4 py-2">{orden.estadoPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
