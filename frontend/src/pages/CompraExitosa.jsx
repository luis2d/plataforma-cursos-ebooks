import { Link } from "react-router-dom";

export default function CompraExitosa() {
  return (
    <div className="max-w-sm mx-auto p-6 text-center">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">¡Compra realizada!</h1>
      <p className="text-gray-600 text-sm mb-4">
        Tu pago se está confirmando. En unos segundos vas a ver la compra reflejada en tu cuenta.
      </p>
      <Link to="/" className="text-gray-900 underline">
        Volver al catálogo
      </Link>
    </div>
  );
}
