import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

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
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={cargando} className="w-full">
          {cargando ? "Entrando..." : "Iniciar sesión"}
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        <Link to="/olvide-password" className="text-gray-900 underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-gray-900 underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
