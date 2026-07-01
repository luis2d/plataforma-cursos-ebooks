import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";

export default function VerificarCorreo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [estado, setEstado] = useState("verificando");
  const tokenProcesado = useRef(null);

  useEffect(() => {
    if (!token) {
      setEstado("sin-token");
      return;
    }
    // El token es de un solo uso en el backend; sin este guard, el doble
    // llamado de useEffect en StrictMode (dev) quema el token en la primera
    // llamada y la segunda lo ve inválido, pisando el estado "ok" con error.
    if (tokenProcesado.current === token) return;
    tokenProcesado.current = token;

    api
      .post("/auth/verificar-correo", { token })
      .then(() => setEstado("ok"))
      .catch(() => setEstado("error"));
  }, [token]);

  return (
    <div className="max-w-sm mx-auto p-6 text-center">
      {estado === "verificando" && <p className="text-gray-600">Verificando tu correo...</p>}
      {estado === "ok" && (
        <>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">¡Cuenta verificada!</h1>
          <Link to="/login" className="text-gray-900 underline">
            Inicia sesión
          </Link>
        </>
      )}
      {(estado === "error" || estado === "sin-token") && (
        <p className="text-red-600">El enlace de verificación es inválido o expiró.</p>
      )}
    </div>
  );
}
