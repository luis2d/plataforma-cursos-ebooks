import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function OlvideContrasena() {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await api.post("/auth/olvide-password", { correo });
      setEnviado(true);
    } catch {
      setError("No se pudo procesar la solicitud, intenta de nuevo");
    } finally {
      setCargando(false);
    }
  }

  if (enviado) {
    return (
      <div className="max-w-sm mx-auto p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Revisa tu correo</h1>
        <p className="text-gray-600 text-sm">
          Si el correo existe, te enviamos un enlace para restablecer tu contraseña. Revisá tu bandeja
          de entrada (y la carpeta de spam, por las dudas).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Olvidé mi contraseña</h1>
      <p className="text-sm text-gray-600 mb-6">
        Ingresa tu correo y te enviamos un enlace para elegir una nueva contraseña.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="correo"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        <Link to="/login" className="text-ink underline hover:text-forest">
          Volver a iniciar sesión
        </Link>
      </p>
    </div>
  );
}
