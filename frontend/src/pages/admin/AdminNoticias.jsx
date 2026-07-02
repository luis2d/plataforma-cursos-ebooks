import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";

const FORM_VACIO = { titulo: "", resumen: "", contenido: "", autor: "", imagenUrl: "" };

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  function cargarNoticias() {
    api.get("/news").then(({ data }) => setNoticias(data.noticias));
  }

  useEffect(() => {
    cargarNoticias();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEditar(noticia) {
    setEditandoId(noticia.id);
    setForm({
      titulo: noticia.titulo,
      resumen: noticia.resumen,
      contenido: noticia.contenido,
      autor: noticia.autor || "",
      imagenUrl: noticia.imagenUrl || "",
    });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setForm(FORM_VACIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (editandoId) {
        await api.put(`/admin/news/${editandoId}`, form);
      } else {
        await api.post("/admin/news", form);
      }
      cancelarEdicion();
      cargarNoticias();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo guardar la noticia");
    }
  }

  async function handleEliminar(id) {
    if (!confirm("¿Eliminar esta noticia?")) return;
    await api.delete(`/admin/news/${id}`);
    cargarNoticias();
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold text-ink mb-6">Administrar noticias</h1>

      <form onSubmit={handleSubmit} className="border border-ink/10 rounded-lg p-4 mb-8 flex flex-col gap-3">
        <h2 className="font-medium text-ink">{editandoId ? "Editar noticia" : "Nueva noticia"}</h2>
        <Input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <Textarea
          name="resumen"
          placeholder="Resumen corto"
          value={form.resumen}
          onChange={handleChange}
          required
        />
        <Textarea
          name="contenido"
          placeholder="Contenido completo"
          value={form.contenido}
          onChange={handleChange}
          required
          className="min-h-32"
        />
        <Input name="autor" placeholder="Autor (opcional)" value={form.autor} onChange={handleChange} />
        <Input
          name="imagenUrl"
          placeholder="URL de la imagen (opcional)"
          value={form.imagenUrl}
          onChange={handleChange}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <Button type="submit">{editandoId ? "Guardar cambios" : "Crear noticia"}</Button>
          {editandoId && (
            <Button type="button" variante="secundario" onClick={cancelarEdicion}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-2">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="border border-ink/10 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-ink">{noticia.titulo}</p>
              <p className="text-sm text-ink/60">{noticia.resumen}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variante="secundario" onClick={() => handleEditar(noticia)}>
                Editar
              </Button>
              <Button size="sm" variante="peligro" onClick={() => handleEliminar(noticia.id)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
