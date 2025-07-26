import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('/FVip1:Q6@7B', 10); // Cambia aquí la contraseña correcta
  const updated = await prisma.administrador.updateMany({
    where: { superadmin: true },
    data: { password },
  });
  if (updated.count > 0) {
    // Contraseña del súper admin actualizada
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
