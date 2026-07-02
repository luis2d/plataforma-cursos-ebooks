const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const COLORES = ["C08A7E/F9EFE9", "2C3E57/E7E2D2", "C79B3B/241C08", "3E5A3C/EAF0E2"];

function imagenPara(nombre, indice) {
  const color = COLORES[indice % COLORES.length];
  const texto = encodeURIComponent(nombre.replace(/^[^:]+:\s*/, "").slice(0, 30));
  return `https://placehold.co/400x300/${color}?text=${texto}`;
}

const productosNuevos = [
  {
    nombre: "Curso de Excel Avanzado para Finanzas",
    descripcion: "Tablas dinámicas, macros y modelos financieros para el día a día.",
    precioCentavos: 1999,
    contenidoUrl: "https://example.com/contenido/excel-avanzado-finanzas.zip",
  },
  {
    nombre: "Ebook: Fundamentos de Contabilidad para Emprendedores",
    descripcion: "Lo esencial para llevar las cuentas de tu negocio sin ser contador.",
    precioCentavos: 1399,
    contenidoUrl: "https://example.com/contenido/contabilidad-emprendedores.pdf",
  },
  {
    nombre: "Curso de Inglés para Programadores",
    descripcion: "Vocabulario técnico y práctica de entrevistas de trabajo en inglés.",
    precioCentavos: 2199,
    contenidoUrl: "https://example.com/contenido/ingles-programadores.zip",
  },
  {
    nombre: "Ebook: Guía de Negociación para Freelancers",
    descripcion: "Cómo poner precio a tu trabajo y negociar con clientes difíciles.",
    precioCentavos: 1199,
    contenidoUrl: "https://example.com/contenido/negociacion-freelancers.pdf",
  },
  {
    nombre: "Curso de Fotografía con Smartphone",
    descripcion: "Composición, luz y edición usando solo la cámara de tu celular.",
    precioCentavos: 1699,
    contenidoUrl: "https://example.com/contenido/fotografia-smartphone.zip",
  },
  {
    nombre: "Plantilla: Presupuesto Personal Mensual",
    descripcion: "Planilla lista para ordenar tus ingresos y gastos cada mes.",
    precioCentavos: 699,
    contenidoUrl: "https://example.com/contenido/presupuesto-personal.zip",
  },
  {
    nombre: "Curso de Edición de Video para Redes Sociales",
    descripcion: "Cortes, ritmo y subtítulos para contenido corto que retiene atención.",
    precioCentavos: 2299,
    contenidoUrl: "https://example.com/contenido/edicion-video-redes.zip",
  },
  {
    nombre: "Ebook: Nutrición Básica para Programadores Sedentarios",
    descripcion: "Hábitos simples de alimentación para quienes pasan el día sentados.",
    precioCentavos: 999,
    contenidoUrl: "https://example.com/contenido/nutricion-sedentarios.pdf",
  },
  {
    nombre: "Curso de Oratoria y Presentaciones Efectivas",
    descripcion: "Perdé el miedo escénico y estructurá presentaciones que se entienden.",
    precioCentavos: 1899,
    contenidoUrl: "https://example.com/contenido/oratoria-presentaciones.zip",
  },
  {
    nombre: "Plantilla: Plan de Negocios para Startups",
    descripcion: "Estructura lista para presentar tu idea a inversores o socios.",
    precioCentavos: 1799,
    contenidoUrl: "https://example.com/contenido/plan-negocios-startups.zip",
  },
  {
    nombre: "Ebook: Introducción a las Finanzas Personales",
    descripcion: "Ahorro, deudas e inversión básica explicado en lenguaje simple.",
    precioCentavos: 1099,
    contenidoUrl: "https://example.com/contenido/finanzas-personales.pdf",
  },
  {
    nombre: "Curso de Ilustración Digital con Procreate",
    descripcion: "De cero a tu primer dibujo terminado usando tablet y Procreate.",
    precioCentavos: 2099,
    contenidoUrl: "https://example.com/contenido/ilustracion-procreate.zip",
  },
  {
    nombre: "Ebook: Guía de Meditación y Enfoque para Estudiar Mejor",
    descripcion: "Técnicas cortas para concentrarte antes de estudiar o trabajar.",
    precioCentavos: 899,
    contenidoUrl: "https://example.com/contenido/meditacion-enfoque.pdf",
  },
  {
    nombre: "Curso de Gestión de Proyectos con Metodologías Ágiles",
    descripcion: "Scrum y Kanban aplicados a equipos chicos, sin la burocracia de siempre.",
    precioCentavos: 2399,
    contenidoUrl: "https://example.com/contenido/gestion-proyectos-agile.zip",
  },
  {
    nombre: "Plantilla: Calendario de Contenidos para Redes Sociales",
    descripcion: "Organizá publicaciones de todo el mes en un solo lugar.",
    precioCentavos: 799,
    contenidoUrl: "https://example.com/contenido/calendario-contenidos.zip",
  },
  {
    nombre: "Ebook: Cocina Rápida para Gente Ocupada",
    descripcion: "Recetas de menos de 30 minutos para el día a día.",
    precioCentavos: 999,
    contenidoUrl: "https://example.com/contenido/cocina-rapida.pdf",
  },
  {
    nombre: "Curso de Italiano Básico para Viajeros",
    descripcion: "Lo justo y necesario para moverte en Italia sin perderte.",
    precioCentavos: 1499,
    contenidoUrl: "https://example.com/contenido/italiano-viajeros.zip",
  },
  {
    nombre: "Plantilla: Plan de Estudio Semanal",
    descripcion: "Organizá materias, horarios y repasos de forma visual.",
    precioCentavos: 599,
    contenidoUrl: "https://example.com/contenido/plan-estudio-semanal.zip",
  },
  {
    nombre: "Ebook: Introducción a la Música y Producción en Casa",
    descripcion: "Primeros pasos para grabar y mezclar tus propias canciones.",
    precioCentavos: 1599,
    contenidoUrl: "https://example.com/contenido/musica-produccion-casa.pdf",
  },
  {
    nombre: "Curso de Yoga y Estiramiento para Escritorio",
    descripcion: "Rutinas cortas para hacer entre pausas de trabajo, sin equipamiento.",
    precioCentavos: 1299,
    contenidoUrl: "https://example.com/contenido/yoga-escritorio.zip",
  },
];

async function main() {
  const sinImagen = await prisma.product.findMany({ where: { imagenUrl: null } });
  for (let i = 0; i < sinImagen.length; i++) {
    await prisma.product.update({
      where: { id: sinImagen[i].id },
      data: { imagenUrl: imagenPara(sinImagen[i].nombre, i) },
    });
  }

  const { count: nuevosCreados } = await prisma.product.createMany({
    data: productosNuevos.map((producto, indice) => ({
      ...producto,
      imagenUrl: imagenPara(producto.nombre, indice),
    })),
  });

  return { actualizados: sinImagen.length, nuevosCreados };
}

main()
  .then(({ actualizados, nuevosCreados }) => {
    console.log(`${actualizados} productos existentes actualizados con imagen`);
    console.log(`${nuevosCreados} productos nuevos creados`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
