const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const productos = [
  // Cursos
  {
    nombre: "Curso de React desde cero",
    descripcion: "Componentes, hooks y manejo de estado, con proyectos prácticos paso a paso.",
    precioCentavos: 2499,
    contenidoUrl: "https://example.com/contenido/react-desde-cero.zip",
  },
  {
    nombre: "Curso de Python para Data Science",
    descripcion: "Pandas, NumPy y visualización de datos aplicados a casos reales.",
    precioCentavos: 2999,
    contenidoUrl: "https://example.com/contenido/python-data-science.zip",
  },
  {
    nombre: "Curso de Diseño UX/UI",
    descripcion: "Principios de usabilidad, wireframes y prototipado en Figma.",
    precioCentavos: 2299,
    contenidoUrl: "https://example.com/contenido/diseno-ux-ui.zip",
  },
  {
    nombre: "Curso de SQL para Analistas",
    descripcion: "Consultas, joins y optimización para trabajar con bases de datos reales.",
    precioCentavos: 1899,
    contenidoUrl: "https://example.com/contenido/sql-analistas.zip",
  },
  {
    nombre: "Curso de Marketing Digital",
    descripcion: "Estrategia de contenidos, redes sociales y publicidad paga desde cero.",
    precioCentavos: 1999,
    contenidoUrl: "https://example.com/contenido/marketing-digital.zip",
  },
  {
    nombre: "Curso de TypeScript Avanzado",
    descripcion: "Tipos genéricos, utility types y patrones para proyectos grandes.",
    precioCentavos: 2599,
    contenidoUrl: "https://example.com/contenido/typescript-avanzado.zip",
  },
  {
    nombre: "Curso de Docker y Contenedores",
    descripcion: "Imágenes, volúmenes y docker-compose para entornos de desarrollo reales.",
    precioCentavos: 2199,
    contenidoUrl: "https://example.com/contenido/docker-contenedores.zip",
  },
  {
    nombre: "Curso de Testing con Playwright",
    descripcion: "Automatización de pruebas end-to-end para aplicaciones web modernas.",
    precioCentavos: 2399,
    contenidoUrl: "https://example.com/contenido/testing-playwright.zip",
  },
  {
    nombre: "Curso de Arquitectura de Software",
    descripcion: "Patrones, capas y decisiones de diseño para sistemas mantenibles.",
    precioCentavos: 3499,
    contenidoUrl: "https://example.com/contenido/arquitectura-software.zip",
  },
  {
    nombre: "Curso de Copywriting para Ventas",
    descripcion: "Cómo escribir textos que convierten, con ejemplos de campañas reales.",
    precioCentavos: 1799,
    contenidoUrl: "https://example.com/contenido/copywriting-ventas.zip",
  },
  // Ebooks
  {
    nombre: "Ebook: Patrones de diseño en Python",
    descripcion: "Los patrones más usados en backend, explicados con ejemplos en Python.",
    precioCentavos: 1499,
    contenidoUrl: "https://example.com/contenido/patrones-python.pdf",
  },
  {
    nombre: "Ebook: Guía completa de CSS Grid",
    descripcion: "Layouts modernos explicados de forma visual, con ejercicios resueltos.",
    precioCentavos: 1299,
    contenidoUrl: "https://example.com/contenido/css-grid.pdf",
  },
  {
    nombre: "Ebook: Fundamentos de Bases de Datos",
    descripcion: "Modelado relacional, normalización e índices explicados sin vueltas.",
    precioCentavos: 1599,
    contenidoUrl: "https://example.com/contenido/fundamentos-bd.pdf",
  },
  {
    nombre: "Ebook: Seguridad Web para Desarrolladores",
    descripcion: "OWASP Top 10 explicado con ejemplos y cómo prevenir cada vulnerabilidad.",
    precioCentavos: 1799,
    contenidoUrl: "https://example.com/contenido/seguridad-web.pdf",
  },
  {
    nombre: "Ebook: Introducción a la Inteligencia Artificial",
    descripcion: "Conceptos clave de machine learning explicados sin fórmulas complicadas.",
    precioCentavos: 1699,
    contenidoUrl: "https://example.com/contenido/introduccion-ia.pdf",
  },
  {
    nombre: "Ebook: Clean Code en la práctica",
    descripcion: "Cómo escribir código legible y mantenible, con ejemplos de antes/después.",
    precioCentavos: 1399,
    contenidoUrl: "https://example.com/contenido/clean-code.pdf",
  },
  {
    nombre: "Ebook: APIs REST desde cero",
    descripcion: "Diseño de endpoints, versionado y buenas prácticas para APIs públicas.",
    precioCentavos: 1299,
    contenidoUrl: "https://example.com/contenido/apis-rest.pdf",
  },
  {
    nombre: "Ebook: Git y GitHub para equipos",
    descripcion: "Ramas, pull requests y resolución de conflictos en proyectos colaborativos.",
    precioCentavos: 999,
    contenidoUrl: "https://example.com/contenido/git-github-equipos.pdf",
  },
  {
    nombre: "Ebook: Estrategias de SEO 2026",
    descripcion: "Qué cambió en el posicionamiento web y cómo adaptar tu contenido.",
    precioCentavos: 1499,
    contenidoUrl: "https://example.com/contenido/seo-2026.pdf",
  },
  {
    nombre: "Ebook: Productividad para Freelancers",
    descripcion: "Organización, cobros y límites sanos para trabajar de forma independiente.",
    precioCentavos: 1199,
    contenidoUrl: "https://example.com/contenido/productividad-freelancers.pdf",
  },
  // Plantillas
  {
    nombre: "Plantilla: Dashboard Admin en React",
    descripcion: "Panel administrativo listo para conectar a tu propia API.",
    precioCentavos: 1999,
    contenidoUrl: "https://example.com/contenido/dashboard-admin-react.zip",
  },
  {
    nombre: "Plantilla: E-commerce con Next.js",
    descripcion: "Catálogo, carrito y checkout base para arrancar una tienda online.",
    precioCentavos: 2999,
    contenidoUrl: "https://example.com/contenido/ecommerce-nextjs.zip",
  },
  {
    nombre: "Plantilla: Portfolio para Diseñadores",
    descripcion: "Galería de proyectos con animaciones sutiles, lista para personalizar.",
    precioCentavos: 1499,
    contenidoUrl: "https://example.com/contenido/portfolio-disenadores.zip",
  },
  {
    nombre: "Plantilla: Landing page para Apps móviles",
    descripcion: "Sección de features, capturas y links a las tiendas de apps.",
    precioCentavos: 1299,
    contenidoUrl: "https://example.com/contenido/landing-apps-moviles.zip",
  },
  {
    nombre: "Plantilla: Blog personal en Astro",
    descripcion: "Blog rápido y liviano con soporte para Markdown.",
    precioCentavos: 1199,
    contenidoUrl: "https://example.com/contenido/blog-astro.zip",
  },
  {
    nombre: "Plantilla: CRM simple en Vue",
    descripcion: "Gestión básica de contactos y seguimiento de oportunidades de venta.",
    precioCentavos: 2499,
    contenidoUrl: "https://example.com/contenido/crm-vue.zip",
  },
  {
    nombre: "Plantilla: Página de aterrizaje SaaS B2B",
    descripcion: "Pensada para productos de suscripción orientados a empresas.",
    precioCentavos: 1699,
    contenidoUrl: "https://example.com/contenido/landing-saas-b2b.zip",
  },
  {
    nombre: "Plantilla: Sistema de reservas",
    descripcion: "Calendario y formulario de reservas para negocios de servicios.",
    precioCentavos: 2199,
    contenidoUrl: "https://example.com/contenido/sistema-reservas.zip",
  },
  {
    nombre: "Plantilla: Newsletter con Resend",
    descripcion: "Formulario de suscripción y plantillas de correo listas para usar.",
    precioCentavos: 999,
    contenidoUrl: "https://example.com/contenido/newsletter-resend.zip",
  },
  {
    nombre: "Plantilla: Checklist de lanzamiento de producto",
    descripcion: "Documento y tablero para organizar el lanzamiento de tu próximo producto.",
    precioCentavos: 799,
    contenidoUrl: "https://example.com/contenido/checklist-lanzamiento.zip",
  },
];

const noticias = [
  {
    titulo: "5 tendencias en ebooks técnicos para este año",
    resumen: "Formatos más cortos, ejemplos ejecutables y actualizaciones frecuentes marcan la agenda.",
    contenido:
      "Los ebooks técnicos se están alejando de los mamotretos de 400 páginas. Cada vez más autores optan por guías cortas y accionables, con ejemplos de código que se pueden copiar y probar de inmediato.\n\nOtra tendencia fuerte es la actualización continua: en vez de una edición fija, muchos ebooks ahora se revisan cada pocos meses para reflejar cambios en las herramientas que enseñan, algo especialmente importante en frameworks que evolucionan rápido.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Cómo elegir tu primer curso de programación",
    resumen: "Con tanta oferta disponible, elegir bien el primer curso puede ahorrarte meses de frustración.",
    contenido:
      "Antes de anotarte en un curso, preguntate qué querés construir, no qué lenguaje querés aprender. El lenguaje es solo una herramienta para llegar a un resultado concreto.\n\nBuscá cursos con proyectos prácticos desde las primeras clases, y desconfiá de los que prometen dominar un tema completo en un fin de semana. Aprender bien lleva su tiempo, y eso está bien.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Entrevista: autores que publican sus propios ebooks",
    resumen: "Hablamos con creadores independientes sobre por qué eligieron autopublicarse.",
    contenido:
      "Cada vez más desarrolladores y diseñadores deciden escribir y vender sus propios ebooks en vez de pasar por una editorial tradicional. Las razones se repiten: más control sobre el contenido, ciclos de publicación más cortos, y una relación más directa con quienes leen.\n\nEl desafío más citado es la distribución: sin el empuje de una editorial, hay que construir audiencia propia desde el día uno.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Las plantillas más usadas por freelancers en 2026",
    resumen: "Relevamos qué tipo de plantillas se venden más entre quienes arrancan proyectos rápido.",
    contenido:
      "Los dashboards administrativos y las landing pages siguen siendo las plantillas más buscadas, pero este año creció fuerte la demanda de plantillas de e-commerce chicas, pensadas para tiendas de un solo producto.\n\nTambién notamos más interés en plantillas con foco en accesibilidad, algo que hace unos años era casi un nicho y hoy es un pedido cada vez más frecuente.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Guía rápida: de cero a tu primer curso online",
    resumen: "Un recorrido corto para quienes nunca tomaron un curso a distancia.",
    contenido:
      "Si nunca hiciste un curso online, lo más importante es reservar un horario fijo en tu semana, aunque sean solo 30 minutos. La constancia gana siempre a las maratones esporádicas de fin de semana.\n\nOtro consejo simple: tomá notas propias en vez de solo mirar los videos. Escribir con tus palabras lo que vas entendiendo ayuda mucho más de lo que parece.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Por qué la Inteligencia Artificial no reemplaza a los buenos ebooks",
    resumen: "Las respuestas rápidas de un chat no sustituyen un recorrido de aprendizaje bien estructurado.",
    contenido:
      "Pedirle a una IA una explicación puntual está bien para resolver una duda concreta, pero no reemplaza el recorrido pedagógico de un buen ebook: el orden de los temas, los ejercicios pensados para afianzar cada concepto, y la coherencia de principio a fin.\n\nLo que sí cambió es cómo se usan en conjunto: cada vez más gente lee un ebook y usa una IA como complemento para profundizar en las partes que le cuestan más.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Novedades en la plataforma: nuevo carrito de compras",
    resumen: "Ahora podés juntar varios productos y pagarlos todos juntos en una sola compra.",
    contenido:
      "Sumamos un carrito de compras real: podés agregar varios cursos, ebooks o plantillas al carrito, revisarlos antes de pagar, y finalizar todo con un solo pago en vez de comprar de a uno.\n\nEl carrito se guarda en tu navegador, así que no lo perdés si recargás la página. Seguimos sumando mejoras a partir de lo que nos vayan contando.",
    autor: "Equipo de Producto",
  },
  {
    titulo: "Cursos cortos vs. cursos largos: qué conviene aprender primero",
    resumen: "No siempre el curso más extenso es el que más te acerca a tu objetivo.",
    contenido:
      "Un curso corto y bien enfocado puede darte una habilidad puntual en pocos días, ideal cuando necesitás resolver algo concreto pronto. Un curso largo tiene sentido cuando estás construyendo una base sólida para algo que vas a usar por años.\n\nLa recomendación general: si es tu primera vez en un tema, arrancá con algo corto para confirmar que te interesa antes de invertir en un recorrido más largo.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "El auge de las plantillas de código abierto",
    resumen: "Cada vez más plantillas se venden con el código completo, sin cajas negras.",
    contenido:
      "La tendencia es clara: quien compra una plantilla hoy espera poder modificar cualquier parte del código, no solo cambiar colores desde un panel de configuración. Eso empujó a que casi todas las plantillas nuevas se vendan con el código fuente completo.\n\nEsto también facilita que la plantilla siga funcionando a largo plazo, sin depender de que el autor original mantenga un servicio externo.",
    autor: "Redacción Cursos & Ebooks",
  },
  {
    titulo: "Cómo mantenerte actualizado sin perder tiempo: nuestra selección del mes",
    resumen: "Una curaduría breve de cursos y ebooks para no quedarte atrás sin dedicarle todo tu tiempo libre.",
    contenido:
      "No hace falta leer todo lo que sale para mantenerte al día: alcanza con elegir bien un par de fuentes de calidad y revisarlas con constancia. Este mes destacamos contenido sobre buenas prácticas de seguridad web y sobre patrones de diseño en backend.\n\nLa idea de esta sección es simple: menos scroll infinito, más contenido elegido con criterio.",
    autor: "Redacción Cursos & Ebooks",
  },
];

async function main() {
  const { count: productosCreados } = await prisma.product.createMany({ data: productos });
  const { count: noticiasCreadas } = await prisma.noticia.createMany({ data: noticias });
  return { productosCreados, noticiasCreadas };
}

main()
  .then(({ productosCreados, noticiasCreadas }) => {
    console.log(`${productosCreados} productos creados`);
    console.log(`${noticiasCreadas} noticias creadas`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
