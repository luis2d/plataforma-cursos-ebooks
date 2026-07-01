const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const correo = process.argv[2];

  if (!correo) {
    console.error("Uso: npm run make-admin -- correo@ejemplo.com");
    process.exit(1);
  }

  const user = await prisma.user.update({
    where: { correo },
    data: { esAdmin: true },
  });

  console.log(`${user.correo} ahora es administrador`);
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
