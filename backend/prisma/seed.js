const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const productos = [
  {
    nombre: "Curso de JavaScript desde cero",
    descripcion: "Fundamentos de JavaScript moderno, con ejercicios prácticos.",
    precioCentavos: 1999,
    contenidoUrl: "https://example.com/contenido/js-desde-cero.zip",
    imagenUrl: "https://placehold.co/400x300?text=JavaScript",
  },
  {
    nombre: "Ebook: Patrones de diseño en Node.js",
    descripcion: "Guía práctica de patrones de diseño aplicados a backend con Node.js.",
    precioCentavos: 1499,
    contenidoUrl: "https://example.com/contenido/patrones-node.pdf",
    imagenUrl: "https://placehold.co/400x300?text=Node.js",
  },
  {
    nombre: "Plantilla: Landing page para SaaS",
    descripcion: "Plantilla lista para usar en React + Tailwind CSS.",
    precioCentavos: 999,
    contenidoUrl: "https://example.com/contenido/landing-saas.zip",
    imagenUrl: "https://placehold.co/400x300?text=Landing+SaaS",
  },
];

async function main() {
  for (const producto of productos) {
    await prisma.product.create({ data: producto });
  }
}

main()
  .then(() => console.log(`${productos.length} productos creados`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
