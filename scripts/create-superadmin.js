import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("T7g+N'+`o0&6", 10); // Cambia la contraseña aquí
  await prisma.administrador.create({
    data: {
      nombre: 'Super',
      apellidos: 'Admin',
      email: 'info@alamia.es', // Cambia el email aquí
      password,
      superadmin: true,
    },
  });
  await prisma.$disconnect();
}

main().catch(() => {
  // console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
