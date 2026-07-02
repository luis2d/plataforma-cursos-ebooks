import { Link } from "react-router-dom";

export default function CompraCancelada() {
  return (
    <div className="max-w-sm mx-auto p-6 text-center">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Compra cancelada</h1>
      <p className="text-gray-600 text-sm mb-4">No se realizó ningún cargo.</p>
      <Link to="/" className="text-ink underline hover:text-forest">
        Volver al catálogo
      </Link>
    </div>
  );
}
