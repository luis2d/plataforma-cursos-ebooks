import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Spinner from "../components/ui/Spinner";

const PORTADAS = [
  { gradiente: "from-[#C08A7E] to-[#9C6157]", texto: "text-[#F9EFE9]" },
  { gradiente: "from-[#2C3E57] to-[#1B2638]", texto: "text-[#E7E2D2]" },
  { gradiente: "from-[#C79B3B] to-[#A67C24]", texto: "text-[#241C08]" },
  { gradiente: "from-[#3E5A3C] to-[#28402A]", texto: "text-[#EAF0E2]" },
];

function portadaDe(indice) {
  return PORTADAS[indice % PORTADAS.length];
}

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [imagenesConError, setImagenesConError] = useState({});

  function marcarImagenConError(noticiaId) {
    setImagenesConError((prev) => ({ ...prev, [noticiaId]: true }));
  }

  useEffect(() => {
    api
      .get("/news")
      .then(({ data }) => setNoticias(data.noticias))
      .catch(() => setError("No se pudieron cargar las noticias"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <Spinner texto="Cargando noticias..." />;

  return (
    <div className="px-6 sm:px-14 py-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-2">Noticias</h1>
      <p className="text-ink/70 mb-8">Novedades, lanzamientos y tendencias del mundo de los cursos y ebooks.</p>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {noticias.length === 0 ? (
        <p className="text-ink/60">Todavía no hay noticias publicadas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia, indice) => {
            const portada = portadaDe(indice);
            const mostrarImagen = noticia.imagenUrl && !imagenesConError[noticia.id];
            return (
              <Link
                key={noticia.id}
                to={`/noticias/${noticia.id}`}
                className="flex flex-col gap-2 rounded-lg overflow-hidden border border-ink/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {mostrarImagen ? (
                  <img
                    src={noticia.imagenUrl}
                    alt={noticia.titulo}
                    className="w-full h-40 object-cover"
                    onError={() => marcarImagenConError(noticia.id)}
                  />
                ) : (
                  <div className={`w-full h-40 flex items-end p-4 bg-gradient-to-br ${portada.gradiente}`}>
                    <p className={`font-bold text-lg leading-tight ${portada.texto}`}>{noticia.titulo}</p>
                  </div>
                )}
                <div className="p-4 pt-2 flex flex-col gap-2 flex-1">
                  <h2 className="font-medium text-ink">{noticia.titulo}</h2>
                  <p className="text-sm text-ink/60 flex-1">{noticia.resumen}</p>
                  <p className="text-xs text-ink/50">
                    {formatearFecha(noticia.fechaCreacion)}
                    {noticia.autor ? ` · ${noticia.autor}` : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
