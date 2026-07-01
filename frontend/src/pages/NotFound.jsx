import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-sm mx-auto p-6 text-center">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Página no encontrada</h1>
      <p className="text-gray-600 text-sm mb-4">La página que buscás no existe.</p>
      <Link to="/" className="text-gray-900 underline">
        Volver al catálogo
      </Link>
    </div>
  );
}
