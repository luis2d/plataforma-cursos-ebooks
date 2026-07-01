import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

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
          Te enviamos un enlace para verificar tu cuenta. En desarrollo, el enlace aparece en la
          consola del backend en vez de llegar a un correo real.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          name="contrasena"
          type="password"
          placeholder="Contraseña (mín. 8 caracteres)"
          value={form.contrasena}
          onChange={handleChange}
          required
          minLength={8}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="bg-gray-900 text-white rounded-md py-2 hover:bg-gray-700 disabled:opacity-50"
        >
          {cargando ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-gray-900 underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
