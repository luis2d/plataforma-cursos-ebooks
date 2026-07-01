import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";

const FORM_VACIO = { nombre: "", descripcion: "", precioCentavos: "", contenidoUrl: "", imagenUrl: "" };

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  function cargarProductos() {
    api.get("/products").then(({ data }) => setProductos(data.productos));
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEditar(producto) {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precioCentavos: producto.precioCentavos,
      contenidoUrl: producto.contenidoUrl,
      imagenUrl: producto.imagenUrl || "",
    });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setForm(FORM_VACIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = { ...form, precioCentavos: Number(form.precioCentavos) };

    try {
      if (editandoId) {
        await api.put(`/admin/products/${editandoId}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }
      cancelarEdicion();
      cargarProductos();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo guardar el producto");
    }
  }

  async function handleEliminar(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    await api.delete(`/admin/products/${id}`);
    cargarProductos();
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Administrar productos</h1>

      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4 mb-8 flex flex-col gap-3">
        <h2 className="font-medium text-gray-900">{editandoId ? "Editar producto" : "Nuevo producto"}</h2>
        <Input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <Textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <Input
          name="precioCentavos"
          type="number"
          min="1"
          placeholder="Precio en centavos (ej. 1999 = $19.99)"
          value={form.precioCentavos}
          onChange={handleChange}
          required
        />
        <Input
          name="contenidoUrl"
          placeholder="URL del contenido descargable"
          value={form.contenidoUrl}
          onChange={handleChange}
          required
        />
        <Input
          name="imagenUrl"
          placeholder="URL de la imagen (opcional)"
          value={form.imagenUrl}
          onChange={handleChange}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <Button type="submit">{editandoId ? "Guardar cambios" : "Crear producto"}</Button>
          {editandoId && (
            <Button type="button" variante="secundario" onClick={cancelarEdicion}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-2">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border border-gray-200 rounded-lg p-3 flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-900">{producto.nombre}</p>
              <p className="text-sm text-gray-600">{formatearPrecio(producto.precioCentavos)}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variante="secundario" onClick={() => handleEditar(producto)}>
                Editar
              </Button>
              <Button size="sm" variante="peligro" onClick={() => handleEliminar(producto.id)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
