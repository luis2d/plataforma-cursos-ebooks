import { useEffect, useState } from "react";
import api from "../api/client";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

function formatearPrecio(centavos) {
  return (centavos / 100).toLocaleString("es-MX", { style: "currency", currency: "USD" });
}

const PORTADAS = [
  { gradiente: "from-[#C08A7E] to-[#9C6157]", texto: "text-[#F9EFE9]" },
  { gradiente: "from-[#2C3E57] to-[#1B2638]", texto: "text-[#E7E2D2]" },
  { gradiente: "from-[#C79B3B] to-[#A67C24]", texto: "text-[#241C08]" },
  { gradiente: "from-[#3E5A3C] to-[#28402A]", texto: "text-[#EAF0E2]" },
];

function portadaDe(indice) {
  return PORTADAS[indice % PORTADAS.length];
}

const HERO_POSICIONES = [
  "left-2 top-8 w-40 h-56 -rotate-6",
  "left-36 top-0 w-44 h-64 rotate-1 z-10",
  "left-[19rem] top-12 w-40 h-52 rotate-6",
];
const HERO_ANIMACIONES = [
  "animate-[flt_6.5s_ease-in-out_infinite]",
  "animate-[flt_7.5s_ease-in-out_infinite]",
  "animate-[flt2_7s_ease-in-out_infinite]",
];
const HERO_DELAYS = ["0s", "-2.5s", "-1.2s"];

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [imagenesConError, setImagenesConError] = useState({});
  const { items, agregarAlCarrito } = useCart();

  function marcarImagenConError(productoId) {
    setImagenesConError((prev) => ({ ...prev, [productoId]: true }));
  }

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProductos(data.productos))
      .catch(() => setError("No se pudo cargar el catálogo"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <Spinner texto="Cargando catálogo..." />;

  const destacados = productos.slice(0, 3);

  function irAlCatalogo() {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      {error && <p className="text-red-600 text-sm px-6 pt-4">{error}</p>}

      <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-center px-6 sm:px-14 py-14 sm:py-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-forest uppercase">
            Cursos y ebooks · aprendé a tu ritmo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-ink text-balance">
            Las habilidades que buscás, en un solo lugar.
          </h1>
          <p className="text-lg text-ink/70 max-w-md">
            Una selección de cursos, ebooks y plantillas para seguir aprendiendo a tu propio ritmo, sin
            vueltas.
          </p>
          <div className="pt-1">
            <Button onClick={irAlCatalogo}>Explorar el catálogo</Button>
          </div>
        </div>

        {destacados.length > 0 && (
          <div className="relative h-80 sm:h-96 hidden sm:block">
            {destacados.map((producto, indice) => {
              const portada = portadaDe(indice);
              return (
                <div
                  key={producto.id}
                  className={`absolute rounded-l-sm rounded-r-lg p-5 bg-gradient-to-br shadow-xl ${portada.gradiente} ${HERO_POSICIONES[indice]} ${HERO_ANIMACIONES[indice]}`}
                  style={{ animationDelay: HERO_DELAYS[indice] }}
                >
                  <p className={`font-bold leading-tight ${portada.texto}`}>{producto.nombre}</p>
                  <p className={`text-xs tracking-widest uppercase mt-3 opacity-75 ${portada.texto}`}>
                    {formatearPrecio(producto.precioCentavos)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section id="catalogo" className="px-6 sm:px-14 pb-16 pt-10 border-t border-ink/10">
        <h2 className="text-2xl font-bold text-ink mb-6">Catálogo</h2>
        {productos.length === 0 ? (
          <p className="text-ink/60">Todavía no hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
            {productos.map((producto, indice) => {
              const portada = portadaDe(indice);
              const mostrarImagen = producto.imagenUrl && !imagenesConError[producto.id];
              const enCarrito = items.some((item) => item.id === producto.id);
              return (
                <div
                  key={producto.id}
                  className="flex flex-col gap-1 rounded-md overflow-hidden border border-ink/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {mostrarImagen ? (
                    <img
                      src={producto.imagenUrl}
                      alt={producto.nombre}
                      className="w-full h-36 object-cover"
                      onError={() => marcarImagenConError(producto.id)}
                    />
                  ) : (
                    <div className={`w-full h-36 flex items-end p-3 bg-gradient-to-br ${portada.gradiente}`}>
                      <p className={`font-bold text-sm leading-tight ${portada.texto}`}>{producto.nombre}</p>
                    </div>
                  )}
                  <div className="p-2.5 pt-1.5 flex flex-col gap-1.5 flex-1">
                    <h3 className="text-sm font-medium text-ink line-clamp-1">{producto.nombre}</h3>
                    <p className="text-xs text-ink/60 flex-1 line-clamp-2">{producto.descripcion}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-semibold text-forest">
                        {formatearPrecio(producto.precioCentavos)}
                      </span>
                      <Button
                        size="sm"
                        variante={enCarrito ? "secundario" : "primario"}
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={enCarrito}
                        className="!px-2 !py-1 text-xs"
                      >
                        {enCarrito ? "En el carrito" : "Agregar"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="bg-ink text-cream/80 text-center italic py-8 px-6">
        Cursos & Ebooks — aprendé algo nuevo cada semana.
      </footer>
    </div>
  );
}
