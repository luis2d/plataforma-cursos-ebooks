import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(form.correo, form.contrasena);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo iniciar sesión");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="bg-gray-900 text-white rounded-md py-2 hover:bg-gray-700 disabled:opacity-50"
        >
          {cargando ? "Entrando..." : "Iniciar sesión"}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-gray-900 underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
