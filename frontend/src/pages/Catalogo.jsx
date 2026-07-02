import { useEffect, useState } from "react";
import api from "../api/client";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
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

function categoriaDe(nombre) {
  if (nombre.startsWith("Ebook")) return "Ebook";
  if (nombre.startsWith("Plantilla")) return "Plantilla";
  return "Curso";
}

const CATEGORIAS = [
  { id: "cursos", singular: "Curso", plural: "Cursos", portada: PORTADAS[1] },
  { id: "ebooks", singular: "Ebook", plural: "Ebooks", portada: PORTADAS[0] },
  { id: "plantillas", singular: "Plantilla", plural: "Plantillas", portada: PORTADAS[3] },
];

const TEMAS = [
  { id: "idiomas", etiqueta: "Idiomas", palabras: ["inglés", "italiano", "idioma"] },
  { id: "finanzas", etiqueta: "Finanzas", palabras: ["finanzas", "excel", "contabilidad", "presupuesto", "negocios"] },
  { id: "diseno", etiqueta: "Diseño", palabras: ["diseño", "ux", "ui", "ilustración", "procreate", "fotografía", "edición de video", "portfolio"] },
  { id: "marketing", etiqueta: "Marketing", palabras: ["marketing", "seo", "copywriting", "newsletter", "contenidos", "redes sociales", "lanzamiento de producto"] },
  {
    id: "productividad",
    etiqueta: "Productividad",
    palabras: ["productividad", "gestión de proyectos", "ágiles", "plan de estudio", "oratoria", "negociación", "meditación", "enfoque", "freelancers"],
  },
  {
    id: "programacion",
    etiqueta: "Programación",
    palabras: [
      "javascript", "typescript", "react", "vue", "python", "sql", "node", "css", "api", "docker", "git",
      "software", "programador", "desarroll", "código", "inteligencia artificial", "base de datos",
      "seguridad web", "testing", "next.js", "e-commerce", "dashboard", "crm",
    ],
  },
];

function temaDe(producto) {
  const texto = `${producto.nombre} ${producto.descripcion}`.toLowerCase();
  return TEMAS.find((tema) => tema.palabras.some((palabra) => texto.includes(palabra)))?.id ?? null;
}

function PilaCategoria({ categoria, cantidad, onClick, className = "", posicion = "relative", ...resto }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group ${posicion} text-left focus:outline-none ${className}`}
      {...resto}
    >
      <span
        aria-hidden
        className={`absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-l-sm rounded-r-lg bg-gradient-to-br opacity-50 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 ${categoria.portada.gradiente}`}
      />
      <span
        className={`relative flex h-full flex-col justify-end rounded-l-sm rounded-r-lg bg-gradient-to-br p-4 shadow-lg transition-transform group-hover:-translate-y-1 ${categoria.portada.gradiente}`}
      >
        <span className={`text-[10px] font-semibold uppercase tracking-widest opacity-70 ${categoria.portada.texto}`}>
          {cantidad} {cantidad === 1 ? "producto" : "productos"}
        </span>
        <span className={`mt-1 text-lg font-bold leading-tight ${categoria.portada.texto}`}>
          {categoria.plural}
        </span>
      </span>
    </button>
  );
}

function PortadaLibro({
  producto,
  portada,
  className = "",
  mostrarPrecio = false,
  redondeado = true,
  posicion = "relative",
  padding = "p-3",
  ...resto
}) {
  return (
    <div
      className={`${posicion} flex flex-col justify-end overflow-hidden bg-gradient-to-br shadow-[inset_7px_0_12px_-7px_rgba(0,0,0,0.45),inset_-10px_0_14px_-10px_rgba(0,0,0,0.3)] ${padding} ${
        redondeado ? "rounded-l-sm rounded-r-lg" : ""
      } ${portada.gradiente} ${className}`}
      {...resto}
    >
      {/* lomo del libro: banda oscura + brillo para dar volumen */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-[5px] bg-black/35" />
      <span aria-hidden className="absolute inset-y-0 left-[5px] w-px bg-white/20" />
      {/* canto de paginas: pila de lineas finas simulando hojas */}
      <span
        aria-hidden
        className="absolute inset-y-1.5 right-0 w-2.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.85) 0px, rgba(255,255,255,0.85) 1.5px, rgba(120,100,80,0.35) 1.5px, rgba(120,100,80,0.35) 3px)",
          boxShadow: "inset 2px 0 3px rgba(0,0,0,0.25)",
        }}
      />
      <span
        className={`relative text-[10px] font-semibold uppercase tracking-widest opacity-70 ${portada.texto}`}
      >
        {categoriaDe(producto.nombre)}
      </span>
      <p className={`relative mt-1 font-bold leading-tight line-clamp-4 ${portada.texto}`}>
        {producto.nombre}
      </p>
      {mostrarPrecio && (
        <p className={`relative mt-2 text-xs uppercase tracking-widest opacity-75 ${portada.texto}`}>
          {formatearPrecio(producto.precioCentavos)}
        </p>
      )}
    </div>
  );
}

function TarjetaProducto({ producto, indice, enCarrito, onAgregar }) {
  const portada = portadaDe(indice);
  return (
    <div className="group flex flex-col gap-1 rounded-md overflow-hidden border border-ink/10 shadow-sm transition-all hover:-translate-y-1 hover:rotate-[0.5deg] hover:shadow-xl">
      <PortadaLibro producto={producto} portada={portada} redondeado={false} className="h-52" />
      <div className="p-2.5 pt-1.5 flex flex-col gap-1.5 flex-1">
        <p className="text-xs text-ink/60 flex-1 line-clamp-2">{producto.descripcion}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-forest">{formatearPrecio(producto.precioCentavos)}</span>
          <Button
            size="sm"
            variante={enCarrito ? "secundario" : "primario"}
            onClick={onAgregar}
            disabled={enCarrito}
            className="!px-2 !py-1 text-xs"
          >
            {enCarrito ? "En el carrito" : "Agregar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function GridProductos({ productos, itemsEnCarrito, onAgregar }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos.map((producto, indice) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          indice={indice}
          enCarrito={itemsEnCarrito.some((item) => item.id === producto.id)}
          onAgregar={() => onAgregar(producto)}
        />
      ))}
    </div>
  );
}

// Calificación de ejemplo (no hay sistema de reseñas todavía): determinística
// por id para que no cambie en cada render, solo para dar contexto visual.
function calificacionFalsa(id) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (4.5 + (hash % 5) / 10).toFixed(1);
}

function MasPopulares({ productos }) {
  if (productos.length === 0) return null;

  return (
    <div className="rounded-md border border-ink/10 bg-cream p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/60 mb-3">Más populares</h3>
      <ul className="flex flex-col gap-3">
        {productos.map((producto, indice) => (
          <li key={producto.id} className="flex items-center gap-3">
            <span className="text-sm font-bold text-forest w-4 shrink-0">{indice + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink font-medium truncate">{producto.nombre}</p>
              <p className="text-xs text-ink/50">
                {formatearPrecio(producto.precioCentavos)}
                {" · "}
                <span aria-hidden>★</span> {calificacionFalsa(producto.id)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Contenido de ejemplo: no hay sistema de rutas de aprendizaje ni de reseñas
// todavía. Se usa para ilustrar cómo se vería esa parte del diseño.
const NIVELES_RUTA = ["Principiante", "Intermedio", "A tu ritmo"];
const ICONOS_CATEGORIA = { Curso: "🎓", Ebook: "📘", Plantilla: "🗂️" };

function RutaAprendizaje({ productos }) {
  if (productos.length === 0) return null;

  return (
    <div className="rounded-md border border-ink/10 bg-cream p-5 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/60 mb-5">Empezá por acá</h3>
      <ol className="relative flex flex-col gap-7">
        {productos.length > 1 && (
          <span aria-hidden className="absolute left-4 top-4 bottom-4 w-px bg-forest/25" />
        )}
        {productos.map((producto, indice) => {
          const categoria = categoriaDe(producto.nombre);
          return (
            <li key={producto.id} className="relative flex items-start gap-3">
              <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-forest text-cream text-xs font-bold shrink-0">
                {indice + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span aria-hidden>{ICONOS_CATEGORIA[categoria]}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/40">
                    {categoria} · {NIVELES_RUTA[indice % NIVELES_RUTA.length]}
                  </span>
                </div>
                <p className="text-sm text-ink font-medium leading-snug mt-1">{producto.nombre}</p>
                <p className="text-xs text-ink/50 mt-0.5">{formatearPrecio(producto.precioCentavos)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const TESTIMONIO_EJEMPLO = {
  texto: "Los cursos son claros y prácticos, y las plantillas me ahorraron horas de trabajo.",
  autor: "Marina G.",
  rol: "Estudiante",
};

function TestimonioDestacado() {
  return (
    <div className="rounded-md border border-ink/10 bg-cream p-4 shadow-sm">
      <p className="text-amber-500 text-sm" aria-hidden>
        ★★★★★
      </p>
      <p className="text-sm text-ink/80 italic mt-1.5">"{TESTIMONIO_EJEMPLO.texto}"</p>
      <p className="text-xs text-ink/50 mt-2">
        — {TESTIMONIO_EJEMPLO.autor} · {TESTIMONIO_EJEMPLO.rol}
      </p>
    </div>
  );
}

// Descuento de ejemplo: no hay lógica de bundles en el backend todavía, el
// checkout cobra cada producto a su precio real. Es solo para mostrar la idea.
const DESCUENTO_BUNDLE = 0.2;

function BundleRecomendado({ productos, onAgregarTodos }) {
  if (productos.length < 2) return null;

  const precioOriginal = productos.reduce((suma, p) => suma + p.precioCentavos, 0);
  const precioConDescuento = Math.round(precioOriginal * (1 - DESCUENTO_BUNDLE));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-md border border-forest/30 bg-forest/5 px-5 py-4 mb-6">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl" aria-hidden>
          🎁
        </span>
        <div>
          <p className="font-semibold text-ink">Bundle recomendado</p>
          <p className="text-sm text-ink/60">
            Llevate {productos.length} productos esenciales con {Math.round(DESCUENTO_BUNDLE * 100)}% de descuento.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink/40 line-through">{formatearPrecio(precioOriginal)}</span>
        <span className="text-lg font-bold text-forest">{formatearPrecio(precioConDescuento)}</span>
        <Button onClick={onAgregarTodos}>Agregar bundle</Button>
      </div>
    </div>
  );
}

function PillTema({ activo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        activo
          ? "bg-forest text-cream border-forest"
          : "bg-cream text-ink/70 border-ink/15 hover:border-forest hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}

const CONFIANZA = [
  { icono: "🔒", titulo: "Pago seguro", detalle: "Procesado con Stripe" },
  { icono: "♾️", titulo: "Acceso de por vida", detalle: "Sin vencimiento" },
  { icono: "⚡", titulo: "Descarga inmediata", detalle: "Apenas se confirma el pago" },
  { icono: "🎟️", titulo: "Pago único", detalle: "Sin suscripciones" },
];

function TabCategoria({ activo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        activo ? "bg-forest text-cream" : "text-ink/60 hover:bg-ink/5"
      }`}
    >
      {children}
    </button>
  );
}

const HERO_POSICIONES = [
  "left-0 top-16 w-40 h-48 -rotate-3",
  "left-44 top-36 w-40 h-48 rotate-2",
  "left-80 top-8 w-40 h-48 -rotate-2",
];
const HERO_ANIMACIONES = [
  "animate-[flt_6.5s_ease-in-out_infinite]",
  "animate-[flt2_7s_ease-in-out_infinite]",
  "animate-[flt_7.5s_ease-in-out_infinite]",
];
const HERO_DELAYS = ["0s", "-1.2s", "-2.5s"];

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [populares, setPopulares] = useState([]);
  const [temaActivo, setTemaActivo] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const { items, agregarAlCarrito } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProductos(data.productos))
      .catch(() => setError("No se pudo cargar el catálogo"))
      .finally(() => setCargando(false));

    api
      .get("/products/populares?limite=3")
      .then(({ data }) => setPopulares(data.productos))
      .catch(() => {});
  }, []);

  if (cargando) return <Spinner texto="Cargando catálogo..." />;

  const terminoBusqueda = busqueda.trim().toLowerCase();
  const filtrando = terminoBusqueda.length > 0 || temaActivo !== null || categoriaActiva !== null;
  const productosFiltrados = productos
    .filter(
      (producto) =>
        !terminoBusqueda ||
        producto.nombre.toLowerCase().includes(terminoBusqueda) ||
        producto.descripcion.toLowerCase().includes(terminoBusqueda)
    )
    .filter((producto) => !temaActivo || temaDe(producto) === temaActivo)
    .filter((producto) => !categoriaActiva || categoriaDe(producto.nombre) === categoriaActiva);

  const categoriasConProductos = CATEGORIAS.map((categoria) => ({
    ...categoria,
    productos: productos.filter((producto) => categoriaDe(producto.nombre) === categoria.singular),
  }));

  const temasConProductos = TEMAS.map((tema) => ({
    ...tema,
    cantidad: productos.filter((producto) => temaDe(producto) === tema.id).length,
  })).filter((tema) => tema.cantidad > 0);

  const rutaAprendizaje = CATEGORIAS.map(
    (categoria) => productos.find((producto) => categoriaDe(producto.nombre) === categoria.singular)
  ).filter(Boolean);

  function irAlCatalogo() {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function irACategoria(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function alternarTema(id) {
    setTemaActivo((actual) => (actual === id ? null : id));
  }

  return (
    <div>
      {error && <p className="text-red-600 text-sm px-6 pt-4">{error}</p>}

      <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-start px-6 sm:px-14 py-14 sm:py-20">
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

        <div className="hidden sm:block relative h-80 sm:h-96 w-full">
          {categoriasConProductos.map((categoria, indice) => (
            <PilaCategoria
              key={categoria.id}
              categoria={categoria}
              cantidad={categoria.productos.length}
              onClick={() => irACategoria(categoria.id)}
              posicion="absolute"
              className={`shadow-xl ${HERO_POSICIONES[indice]} ${HERO_ANIMACIONES[indice]}`}
              style={{ animationDelay: HERO_DELAYS[indice] }}
            />
          ))}
        </div>
      </section>

      {temasConProductos.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 sm:px-14 pb-8">
          {temasConProductos.map((tema) => (
            <PillTema key={tema.id} activo={temaActivo === tema.id} onClick={() => alternarTema(tema.id)}>
              {tema.etiqueta}
            </PillTema>
          ))}
        </div>
      )}

      <section id="catalogo" className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 px-6 sm:px-14 pb-16 pt-10 border-t border-ink/10">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-ink mb-4">Catálogo</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <Input
              type="search"
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full sm:w-72"
              aria-label="Buscar productos"
            />
            <div className="flex flex-wrap gap-1 bg-ink/5 rounded-md p-1 w-fit">
              <TabCategoria activo={categoriaActiva === null} onClick={() => setCategoriaActiva(null)}>
                Todos
              </TabCategoria>
              {CATEGORIAS.map((categoria) => (
                <TabCategoria
                  key={categoria.id}
                  activo={categoriaActiva === categoria.singular}
                  onClick={() => setCategoriaActiva(categoria.singular)}
                >
                  {categoria.plural}
                </TabCategoria>
              ))}
            </div>
          </div>
          <BundleRecomendado
            productos={rutaAprendizaje}
            onAgregarTodos={() => rutaAprendizaje.forEach(agregarAlCarrito)}
          />
          {temaActivo && (
            <p className="text-sm text-ink/60 mb-4">
              Filtrando por{" "}
              <span className="font-semibold text-forest">{TEMAS.find((t) => t.id === temaActivo)?.etiqueta}</span>
              {" · "}
              <button onClick={() => setTemaActivo(null)} className="underline hover:text-forest">
                quitar filtro
              </button>
            </p>
          )}
          {productos.length === 0 ? (
            <p className="text-ink/60">Todavía no hay productos disponibles.</p>
          ) : filtrando ? (
            productosFiltrados.length === 0 ? (
              <p className="text-ink/60">No encontramos productos que coincidan con la búsqueda.</p>
            ) : (
              <GridProductos productos={productosFiltrados} itemsEnCarrito={items} onAgregar={agregarAlCarrito} />
            )
          ) : (
            <div className="flex flex-col gap-12">
              {categoriasConProductos.map(
                (categoria) =>
                  categoria.productos.length > 0 && (
                    <div key={categoria.id} id={categoria.id} className="scroll-mt-20">
                      <h3 className="text-lg font-semibold text-ink mb-4">
                        {categoria.plural}{" "}
                        <span className="text-sm font-normal text-ink/50">({categoria.productos.length})</span>
                      </h3>
                      <GridProductos
                        productos={categoria.productos}
                        itemsEnCarrito={items}
                        onAgregar={agregarAlCarrito}
                      />
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        <aside className="hidden lg:flex flex-col gap-6 sticky top-6 self-start">
          <RutaAprendizaje productos={rutaAprendizaje} />
          <MasPopulares productos={populares} />
          <TestimonioDestacado />
        </aside>
      </section>

      <div className="border-t border-ink/10 px-6 sm:px-14 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {CONFIANZA.map((item) => (
          <div key={item.titulo} className="flex items-start gap-2.5">
            <span className="text-xl leading-none" aria-hidden>
              {item.icono}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.titulo}</p>
              <p className="text-xs text-ink/50">{item.detalle}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-ink text-cream/80 text-center italic py-8 px-6">
        Cursos & Ebooks — aprendé algo nuevo cada semana.
      </footer>
    </div>
  );
}
