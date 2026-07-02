import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await api.post("/auth/registro", form);
      setEnviado(true);
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo crear la cuenta");
    } finally {
      setCargando(false);
    }
  }

  if (enviado) {
    return (
      <div className="max-w-sm mx-auto p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Revisa tu correo</h1>
        <p className="text-gray-600 text-sm">
          Te enviamos un enlace para verificar tu cuenta. Revisá tu bandeja de entrada (y la carpeta de
          spam, por las dudas).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <Input
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          required
        />
        <Input
          name="contrasena"
          type="password"
          placeholder="Contraseña (mín. 8 caracteres)"
          value={form.contrasena}
          onChange={handleChange}
          required
          minLength={8}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={cargando}>
          {cargando ? "Creando..." : "Crear cuenta"}
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-ink underline hover:text-forest">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
