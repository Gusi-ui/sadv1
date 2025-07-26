import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.administrador.updateMany({
    where: { superadmin: true },
    data: { email: 'info@alamia.es' }, // Cambia aquí el email correcto
  });
  if (updated.count > 0) {
    // Email del súper admin actualizado
  } else {
    // No se encontró ningún súper admin para actualizar
  }
  await prisma.$disconnect();
}

main().catch(() => {
  // console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
