import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import Spinner from "../components/ui/Spinner";

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get(`/news/${id}`)
      .then(({ data }) => setNoticia(data.noticia))
      .catch(() => setError("No se pudo cargar la noticia"))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <Spinner texto="Cargando noticia..." />;

  if (error || !noticia) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-red-600">{error || "Noticia no encontrada"}</p>
        <Link to="/noticias" className="text-ink underline hover:text-forest">
          Volver a noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <Link to="/noticias" className="text-sm text-ink underline hover:text-forest">
        ← Volver a noticias
      </Link>
      {noticia.imagenUrl && (
        <img
          src={noticia.imagenUrl}
          alt={noticia.titulo}
          className="w-full h-56 object-cover rounded-lg mt-4"
        />
      )}
      <h1 className="text-3xl font-bold text-ink mt-6 mb-2">{noticia.titulo}</h1>
      <p className="text-sm text-ink/50 mb-6">
        {formatearFecha(noticia.fechaCreacion)}
        {noticia.autor ? ` · ${noticia.autor}` : ""}
      </p>
      <p className="text-ink/80 whitespace-pre-line leading-relaxed">{noticia.contenido}</p>
    </div>
  );
}
