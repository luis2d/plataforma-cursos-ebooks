import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function RestablecerContrasena() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [form, setForm] = useState({ contrasena: "", confirmarContrasena: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [estado, setEstado] = useState(token ? "formulario" : "sin-token");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.contrasena !== form.confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    try {
      await api.post("/auth/resetear-password", { token, contrasena: form.contrasena });
      setEstado("ok");
    } catch (err) {
      setError(err.response?.data?.error || "El enlace de restablecimiento es inválido o expiró");
    } finally {
      setCargando(false);
    }
  }

  if (estado === "sin-token") {
    return (
      <div className="max-w-sm mx-auto p-6 text-center">
        <p className="text-red-600">El enlace de restablecimiento es inválido o expiró.</p>
      </div>
    );
  }

  if (estado === "ok") {
    return (
      <div className="max-w-sm mx-auto p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Contraseña actualizada</h1>
        <Link to="/login" className="text-ink underline hover:text-forest">
          Inicia sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Elegí una nueva contraseña</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="contrasena"
          type="password"
          placeholder="Nueva contraseña (mín. 8 caracteres)"
          value={form.contrasena}
          onChange={handleChange}
          required
          minLength={8}
        />
        <Input
          name="confirmarContrasena"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.confirmarContrasena}
          onChange={handleChange}
          required
          minLength={8}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar contraseña"}
        </Button>
      </form>
    </div>
  );
}
